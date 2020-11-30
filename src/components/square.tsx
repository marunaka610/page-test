import React from 'react';
import './square.css'

const Piece = {
  None : 0,
  Black : 1,
  White : -1
};

interface Props{

  row: number;
  column: number;
  piece: number
  useGameState: (func: (side: number, piecies: number[][]) => void) => void;
  changeGameState: (piecies: number[][]) => void;
}

interface State {
  piece?: number
}

export default class Square extends React.Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
      piece: this.props.piece
    }
  }

  onClick() {
    console.log("row: " + this.props.row + ", column: " + this.props.column)
    let newSide;
    this.props.useGameState((side: number, piecies: number[][]) => {
      newSide = side; 
      piecies[this.props.row][this.props.column] = side;
      this.props.changeGameState(piecies);
    });
    this.setState({
      piece: newSide
    });
  }

  showPiece() {
    if (this.state.piece === Piece.Black) {
      return (<p className='piece-black'></p>)
    } else if (this.state.piece === Piece.White){
        return (<p className='piece-white'></p>)
    }
  }

  render() {
    return (
      <td 
        key={ 'row' + this.props.row + '_col' + this.props.column}
        className='square' 
        data-row={this.props.row} 
        data-column={this.props.column}
        onClick={() => this.onClick()}
      >{
        this.showPiece()
      }</td>
    );
  }
}
