// import React from 'react';
import React, { useState } from 'react';
import { Side } from 'logic/rule';
import './square.css'

interface Props {
  /** 行番号 */
  row: number;

  /** 列番号 */
  column: number;

  /** 駒の初期値 */
  piece: number

  /** ゲームの状態を利用 */
  useGameState: (func: (side: number, piecies: number[][]) => void) => void;

  /** ゲームの状態を変更 */
  changeGameState: (piecies: number[][]) => void;
}

export function Square(props: Props) {

  /** 駒 */
  const [piece, setPiece] = useState(props.piece);

  /** クリック時の駒配置制御 */
  function onClick() {
    props.useGameState((side: number, piecies: number[][]) => {
      let newSide = side; 
      piecies[props.row][props.column] = side;
      props.changeGameState(piecies);
      setPiece ( newSide );
    });
  }

  /** ピースの見え方を定義 */
  function showPiece() {
    if (piece === Side.Black) {
      return (<p className='piece-black'></p>)
    } else if (piece === Side.White){
        return (<p className='piece-white'></p>)
    }
  }

  return (
    <td 
      key={ 'row' + props.row + '_col' + props.column}
      className='square' 
      data-row={props.row} 
      data-column={props.column}
      onClick={() => onClick()}
    >{
      showPiece()
    }</td>
  );
}
