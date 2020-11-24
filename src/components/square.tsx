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
  onClickFunc: () => void;
}

interface State {
  piece?: number
}

export default class Square extends React.Component<Props, State> {

  // piece: number;
  // row: number;
  // column: number;
  // onClickFunc: () => void;

  constructor(props:any){
    super(props);
    this.state = {
      piece: this.props.piece
    }
    // this.row = props.row;
    // this.column = props.column;
    // this.piece = Piece.None;
    // this.onClickFunc = props.onClickFunc;
  }

  componentDidMount() {
    console.log("Square componentDidMount")
  }

  setPiece(side : number){
    // this.state.piece = side;
    this.setState({
      piece: side
    })
  }

  showPiece() {
    if (this.state.piece === Piece.Black) {
      return (<p className='piece-black'></p>)
    } else if (this.state.piece === Piece.White){
        return (<p className='piece-white'></p>)
    }
  }

  render() {
    // console.log('row' + this.props.row + '_col' + this.props.column)
    return (
      <td 
        key={ 'row' + this.props.row + '_col' + this.props.column}
        className='square' 
        data-row={this.props.row} 
        data-column={this.props.column}
        onClick={() => this.props.onClickFunc()}
        >
      {
        this.showPiece()
      }
      </td>
    );
  }
}
