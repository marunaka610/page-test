import React from 'react';
import { Setting, Side } from '../logic/rule';
import './board.css';

interface Props {
  renderSquares: () => JSX.Element[]
}
interface State {
}

export default class Board extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  onClickSquare = (r: number, c: number) => {
    return () => {

      // 置けるかチェック
      // this.setPiece(r, c, Side.Black)
      console.log("row:" + r + ", col:" + c)
    }
  }


  componentDidMount() {
    console.log("Board componentDidMount")
  }

  // squaresRender() {

  //   if (this.state.squares === undefined) {return }
  //   return this.state.squares.map(row => {
  //     return <tr>
  //       {row.map(element => element.render())}
  //     </tr>
  //   })
  // }

  render() {
    return (
      <div className='board'>
        <table className='board-table'>
          <tbody>{
            this.props.renderSquares()
          }</tbody>
        </table>
      </div>
    );
  }
}
