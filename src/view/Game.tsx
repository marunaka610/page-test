import React from 'react';
import Board from '../components/board'
import { Side, Setting } from 'logic/rule';
import './game.css'
import Square from '../components/square';

interface Props {
}

interface State {
  turn?:number, 
  pieces?: number[][]
}

export default class Game extends React.Component<Props, State> {

  constructor(props : Props){
    super(props)
    this.state = {
      turn : Side.Black,
      pieces: this.initPieces()
    }
    console.log("constructor game");
  }
  /**
   * 駒の初期配置を作成
   */
  initPieces() : number[][] {
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

renderSquares() {
  return () => this.state.pieces!.map((row, i) => {
    return <tr>{
      row.map((e, j) => {
        return  <Square row={i} 
          column={j}
          piece={e}
          useGameState={this.useGameState()} 
          changeGameState={this.changeGameState()} 
          />
      })
    }</tr>
  })
}


  useGameState(){
    let this_component = this;
    return (func : (side: number, piecies: number[][]) => void) => {
      func(this_component.state.turn!, this_component.state.pieces!)
    }
  }

  changeGameState () {
    let this_component = this;
    return (pieces: number[][]) => {
      this_component.setState((state : State) => {
        
        if (state === undefined) { return null}
      
        const prevTurn : number = state.turn!;
        return {
          pieces: pieces,
          turn: prevTurn * -1,
        }
      })
    }
  }
  

  render() {
    console.log(this.state.pieces)
    console.log('render game')
    return <div className='game'>
      <Board 
        renderSquares={this.renderSquares()} 
      />
    </div>
  }
}
