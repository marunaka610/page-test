// import React from 'react';
import React from 'react';
import * as logic from 'logic/rule';
import { SquareObj } from '../components/square_obj';
import './square.css'

interface Props {
  /** 行番号 */
  row: number;

  /** 列番号 */
  column: number;

  /** 駒 */
  piece: number

  /** ゲームの状態を利用 */
  useGameState: (func: (side: number, piecies: SquareObj[][]) => void) => void;

  /** ゲームの状態を変更 */
  changeGameState: (piecies: SquareObj[][]) => void;

  /** ゲーム終了判定 */
  isEnd: boolean;
}

export function Square(props: Props) {

  /** クリック時の駒配置制御 */
  function onClick() {

    if (props.isEnd) return;
    

    props.useGameState((side: number, piecies: SquareObj[][]) => {
      // 置けるか判定
      if (logic.enableSetPiece(
        {row : props.row, column : props.column}
        , piecies
        , side
        )){
        // 駒を置く
        piecies[props.row][props.column].setPiece(side);
        // 駒を返す
        const updated = logic.turnOverPiece(
          {row : props.row, column : props.column}
          , piecies
          , side
        )

        props.changeGameState(updated);
      }
    });
  }

  /** ピースの見え方を定義 */
  function showPiece() {
    if (props.piece === logic.SquareState.Black) {
      return (<p className='piece-black'></p>)
    } else if (props.piece === logic.SquareState.White){
        return (<p className='piece-white'></p>)
    }
  }

  const classVal = 'square ' + (props.piece === logic.SquareState.EnableSet ? 'enable-set' : '');
  return (
    <td 
      key={ 'row' + props.row + '_col' + props.column}
      className={classVal} 
      data-row={props.row} 
      data-column={props.column}
      onClick={() => onClick()}
    >{
      showPiece()
    }</td>
  );
}

