import React from 'react';
import Square from './square';
import { Setting, Side } from '../logic/rule';
import './Board.css';
// import * as Render from '../render';

interface Props {
  turn : number;
  useTurn: (func: (side: number) => void) => void;
  changeTurn: () => void;
}
interface State {
  squares?: Square[][]
}

export default class Board extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      squares: this.initSquares()
    }
  }

  onClickSquare = (r: number, c: number) => {
    return () => {

      // 置けるかチェック
      this.setPiece(r, c, Side.Black)
      console.log("row:" + r + ", col:" + c)
    }
    // Render.renderAll();
  }

  initSquares() {
    let initSquares : Square[][] = [];
    for (let r = 0; r < Setting.BOARD_SIZE; r++) {
      let rowSquares: Square[] = [];
      for (let c = 0; c < Setting.BOARD_SIZE; c++) {
        let piece = Side.None;
        if ((r === 3 && c === 3) || (r === 4 && c === 4)){
          piece = Side.Black;
        } else if ((r === 4 && c === 3) || (r === 3 && c === 4)){
          piece = Side.White;
        }
        let props = { 
          row: r, 
          column: c,
          piece: piece,
          onClickFunc: this.onClickSquare(r,c) 
        };
        rowSquares.push(new Square(props));
      }
      initSquares.push(rowSquares);
    }
    return initSquares
  }

  setPieceInit(row: number, col: number, side: number) {
    if (this.state.squares === undefined) {return }
    let updateSquares = this.state.squares
      
      updateSquares[row][col].setPiece(side);
    this.setState({
      squares: updateSquares
    });
    // this.state.squares[row][col].setPiece(side);
  }
  setPiece(row: number, col: number, side1: number) {
    if (this.state.squares === undefined) {return }
    let updateSquares = this.state.squares
    this.props.useTurn((side: number) => {

      
      updateSquares[row][col].setPiece(side);
    })
    this.setState((state:State)=> {
      console.log(this)
      return {
        squares: updateSquares
      }
    })
    this.props.changeTurn();
  }

  componentDidMount() {
    console.log("Board componentDidMount")
  }
  squaresRender() {

    if (this.state.squares === undefined) {return }
    return this.state.squares.map(row => {
      return <tr>
        {row.map(element => element.render())}
      </tr>
    })
  }

  render() {
    console.log('render board')
    return (
      <div className='board'>
        <table className='board-table'>
          <tbody>{
            // this.squaresRender()
            this.state.squares!.map(row => {
              return <tr>
                {row.map(element => element.render())}
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}
