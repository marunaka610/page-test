import React, { useState } from 'react';
import { Board } from '../components/board'
import { SquareState, Setting } from 'logic/rule';
import { Square } from '../components/square';
import { SquareObj } from '../components/square_obj';
import './game.css'

export function Game() {

  /** ターン */
  const [turn, setTurn] = useState(SquareState.Black);

  /** 駒の初期配置を作成 */
  function initPieces() : SquareObj[][] {
    let initPieces : SquareObj[][] = [];
    for (let r = 0; r < Setting.BOARD_SIZE; r++) {
      let row : SquareObj[] = [];
      for (let c = 0; c < Setting.BOARD_SIZE; c++) {
        if ((r === 3 && c === 4) || (r === 4 && c === 3)){
          row.push(new SquareObj(SquareState.Black));
        } else if ((r === 3 && c === 3) || (r === 4 && c === 4)){
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
  function useGameState(func : (param_turn : number, param_piecies: SquareObj[][]) => void) {
    func(turn, piecies);
  }

  /** ゲームの状態を更新 */
  function changeGameState  (param_pieces: SquareObj[][]) {
    setPiecies(param_pieces);
    setTurn(turn * -1);
  }

  function renderSquares() { 
    return piecies.map((row, i) => {
      return <tr>{
        row.map((e, j) => {
          return  <Square row={i} 
            column={j}
            piece={e.getState()}
            useGameState={useGameState} 
            changeGameState={changeGameState} 
            />
        })
      }</tr>
    })
  }

  return (<div className='game'>
    <Board 
      renderSquares={renderSquares} 
    />
  </div>);
}
