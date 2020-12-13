import React, { useState } from 'react';
import { Board } from '../components/board'
import { SquareState, Setting } from 'logic/rule';
import { Square } from '../components/square';
import { SquareObj } from '../components/square_obj';
import * as logic from 'logic/rule';
import './game.css'

export function Game() {

  /** ターン */
  const [turn, setTurn] = useState(SquareState.Black);

  /** ゲーム終了判定 */
  const [isEnd, setEnd] = useState(false);

  /** 駒の初期配置を作成 */
  function initPieces(): SquareObj[][] {
    let initPieces: SquareObj[][] = [];
    for (let r = 0; r < Setting.BOARD_SIZE; r++) {
      let row: SquareObj[] = [];
      for (let c = 0; c < Setting.BOARD_SIZE; c++) {
        if ((r === 3 && c === 4) || (r === 4 && c === 3)) {
          row.push(new SquareObj(SquareState.Black));
        } else if ((r === 3 && c === 3) || (r === 4 && c === 4)) {
          row.push(new SquareObj(SquareState.White));
        } else {
          row.push(new SquareObj(SquareState.None));
        }
      }
      initPieces.push(row);
    }
    return initPieces;
  }

  /** 駒の初期配置 */
  const [piecies, setPiecies] = useState(initPieces());

  /** ゲームの状態を利用 */
  function useGameState(func: (param_turn: number, param_piecies: SquareObj[][]) => void) {
    func(turn, piecies);
  }

  /** ゲームの状態を更新 */
  function changeGameState(paramPieces: SquareObj[][]) {

    console.log('enemy turn:' + logic.getEnemyTurn(turn))
    // 次のターンで置ける場所を判定
    const nextEnable = paramPieces.map((row, i) => {
      return row.map((sqr, j) => {
        if (sqr.isExistPiece()) {
          return sqr;
        } else if (logic.enableSetPiece(
          { row: i, column: j }
          , piecies
          , logic.getEnemyTurn(turn)
        )) {
          sqr.setPiece(SquareState.EnableSet);
          return sqr;
        } else {
          sqr.setPiece(SquareState.None);
          return sqr;
        }
      });
    });

    // 次ターンに置く場所がある場合
    if (countState(nextEnable, s => s.isEnableSet()) > 0) {
      setPiecies(nextEnable);
      setTurn(logic.getEnemyTurn(turn));
      return;
    }


    // 更に次のターンで置ける場所を判定
    const next2Enable = paramPieces.map((row, i) => {
      return row.map((sqr, j) => {
        if (sqr.isExistPiece()) {
          return sqr;
        } else if (logic.enableSetPiece(
          { row: i, column: j }
          , piecies
          , turn
        )) {
          sqr.setPiece(SquareState.EnableSet);
          return sqr;
        } else {
          sqr.setPiece(SquareState.None);
          return sqr;
        }
      });
    });

    // 更に次ターンに置く場所がある場合
    if (countState(next2Enable, s => s.isEnableSet()) > 0) {
      setPiecies(next2Enable);
      return;
    }

    setEnd(true);

  }


  function countState(squares: SquareObj[][]
    , isState: (square:SquareObj) => boolean
  ) : number {
      return squares.reduce((accAll, row) => {
        return accAll + row.reduce((accRow, sqr) => {
          return accRow + (isState(sqr) ? 1 : 0);
        }, 0)
      }, 0)
  }


  function renderSquares() {
    return piecies.map((row, i) => {
      return <tr>{
        row.map((e, j) => {
          return <Square 
            row={i}
            column={j}
            piece={e.getState()}
            useGameState={useGameState}
            changeGameState={changeGameState}
            isEnd={isEnd}
          />
        })
      }</tr>
    })
  }

  function showTurn() {

    if (isEnd){
      const countBlack = countState(piecies, s => s.isBlack());
      const countWhite = countState(piecies, s => s.isWhite());
      if (countBlack > countWhite) return 'Black Win';
      if (countBlack < countWhite) return 'White Win';
      return 'Draw'
    }

    if (turn === SquareState.Black) {
      return 'Turn is Black';
    } else if (turn === SquareState.White) {
      return 'Turn is White';
    }
  }

  return (<div className='game'>
    <Board
      renderSquares={renderSquares}
    />
    <div>{showTurn()}</div>
  </div>);
}
