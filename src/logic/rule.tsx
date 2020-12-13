
import { SquareObj } from '../components/square_obj';

/** 設定 */
export const Setting = {
  BOARD_SIZE : 8
};

/** マスの状態 */
export const SquareState = {
  None : 0,
  Black : 1,
  White : -1,
  EnableSet : 2
}

/** 位置 */
export interface Position {
  row : number,
  column : number
} 

/** 方向 */
export interface Direction {
  row : number,
  column : number
}

/** 方向一覧 */
export const Directions : Direction[]= [
  {row:-1, column:0},
  {row:-1, column:1},
  {row:0, column:1},
  {row:1, column:1},
  {row:1, column:0},
  {row:1, column:-1},
  {row:0, column:-1},
  {row:-1, column:-1},
]

/**
 * 相手のターンを取得
 * @param myTurn 自分のターン
 */
export function getEnemyTurn(myTurn : number){
  return myTurn === SquareState.Black ? SquareState.White : SquareState.Black;
}

export function enableSetPiece(
  p : Position
  , squares : SquareObj[][]
  , turn : number
) : boolean {
  const curPiece = squares[p.row][p.column];
  if (curPiece.isExistPiece()) {
    return false;
  }

  return Directions.map(direction => {
    return enabelSetPieceImpl(
      p
      , direction
      , false
      , squares
      , turn
    );
  }).reduce((acc: boolean, val: boolean) => {
    return acc || val;
  });
}

function enabelSetPieceImpl (
  prePoint : Position
  , direction : Direction
  , isReverse : boolean
  , squares : SquareObj[][]
  , turn : number) : boolean {

  const curPoint: Position = {
    row : prePoint.row + direction.row,
    column : prePoint.column + direction.column,
  }

  // 枠外
  if (curPoint.row < 0 || curPoint.row >= Setting.BOARD_SIZE){
    return false;
  }
  if (curPoint.column < 0 || curPoint.column >= Setting.BOARD_SIZE){
    return false;
  }

  // 駒がない
  const curPiece = squares[curPoint.row][curPoint.column];
  if (!curPiece.isExistPiece()){
    return false;
  }
  // 相手の色
  else if (!curPiece.isSamePiece(turn)){
    return enabelSetPieceImpl(
      curPoint
      , direction
      , true
      , squares
      , turn
    );
  }
  // 自分の色
  else {
    return isReverse;
  }
}

/** 駒を返す処理 */
export function turnOverPiece(
  p : Position
  , squares : SquareObj[][]
  , turn : number
) : SquareObj[][] {
  let cudrPiecies : SquareObj[][] = squares;
  Directions.forEach(direction => {
    const result = turnOverPieceImpl(
      p
      , direction
      , false
      , cudrPiecies
      , turn
    );
    cudrPiecies = result.piecies;
  });
  return cudrPiecies;
}

/** 駒を返す処理実装の型 */
interface TurnOverPieceResult {
  piecies: SquareObj[][]
  , enableTurnOber: boolean
}

/** 駒を返す処理の実装 */
function turnOverPieceImpl (
  prePoint : Position
  , direction : Direction
  , isReverse : boolean
  , piecies : SquareObj[][]
  , turn : number) : TurnOverPieceResult {

  const curPoint: Position = {
    row : prePoint.row + direction.row,
    column : prePoint.column + direction.column,
  }

  // 枠外
  if (curPoint.row < 0 || curPoint.row >= Setting.BOARD_SIZE){
    return { 
      piecies: piecies, 
      enableTurnOber: false
    };
  }
  if (curPoint.column < 0 || curPoint.column >= Setting.BOARD_SIZE){
    return { 
      piecies: piecies, 
      enableTurnOber: false
    };
  }

  // 駒がない
  const curPiece = piecies[curPoint.row][curPoint.column];
  if (!curPiece.isExistPiece()){
    return { 
      piecies: piecies, 
      enableTurnOber: false
    };
  }
  // 相手の色
  else if (!curPiece.isSamePiece(turn)){
    const next = turnOverPieceImpl(
      curPoint
      , direction
      , true
      , piecies
      , turn
    );
    if (next.enableTurnOber) {
      let updatedPiecies = piecies;
      updatedPiecies[curPoint.row][curPoint.column].setPiece(turn);
      return { 
        piecies: updatedPiecies, 
        enableTurnOber: next.enableTurnOber
      };
    } else {
      return { 
        piecies: piecies, 
        enableTurnOber: false
      };
    }
  }
  // 自分の色
  else {
    if (isReverse){
      return { 
        piecies: piecies, 
        enableTurnOber: true
      };
    } else {
      return { 
        piecies: piecies, 
        enableTurnOber: false
      };
    }
  }
}
