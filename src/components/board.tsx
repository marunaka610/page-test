import React from 'react';
import './board.css';

interface Props {
  renderSquares: () => JSX.Element[]
}

export function Board(props : Props) {

  return (
    <div className='board'>
      <table className='board-table'>
        <tbody>{
          props.renderSquares()
        }</tbody>
      </table>
    </div>
  );
 
}
