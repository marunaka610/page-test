// import React from 'react';
import { Board } from '../components/board'
import { Side, Setting } from 'logic/rule';
import './game.css'
import { Square } from '../components/square';
import React, { useState } from 'react';

interface Props {
}

interface State {
  turn?:number, 
  pieces?: number[][]
}

export function Game(props : Props) {

  /** ターン */
  const [turn, setTurn] = useState(Side.Black);

  /** 駒の初期配置を作成 */
  function initPieces() : number[][] {
    let initPieces : number[][] = [];
    for (let r = 0; r < Setting.BOARD_SIZE; r++) {
      let row : number[] = [];
      for (let c = 0; c < Setting.BOARD_SIZE; c++) {
        if ((r === 3 && c === 3) || (r === 4 && c === 4)){
          row.push(Side.Black);
        } else if ((r === 4 && c === 3) || (r === 3 && c === 4)){
          row.push(Side.White);
        } else {
          row.push(Side.None);
        }
      }
      initPieces.push(row);
    }
    return initPieces;
  }

  /** 駒の初期配置 */
  const [piecies, setPiecies] = useState(initPieces());
  
  function useGameState(func : (param_turn : number, param_piecies: number[][]) => void) {
      func(turn, piecies)
    
  }

  function changeGameState  (param_pieces: number[][]) {
      setPiecies(param_pieces);
      setTurn(turn * -1);
    }
  

  function renderSquares() {
    return () => piecies.map((row, i) => {
      return <tr>{
        row.map((e, j) => {
          return  <Square row={i} 
            column={j}
            piece={e}
            useGameState={useGameState} 
            changeGameState={changeGameState} 
            />
        })
      }</tr>
    })
  }

  
    return (<div className='game'>
      <Board 
        renderSquares={renderSquares()} 
      />
    </div>);
}
