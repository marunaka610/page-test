import React from 'react';
import Board from '../components/board'
import { Side } from 'logic/rule';
import './game.css'
interface State {
  turn?:number, 
  board: Board 
}
interface Props {
}

export default class Game extends React.Component<Props, State> {
  // state = {
  //   turn : Side.Black,
  //   board : new Board({
  //     turn: Side.Black,
  //     useTurn: this.useTurn(),
  //     changeTurn: this.changeTurn(),
  //   }),
  // }
  constructor(props : Props){
    super(props)
    this.state = {
      turn : Side.Black,
      board : new Board({
        turn: Side.Black,
        useTurn: this.useTurn(),
        changeTurn: this.changeTurn(),
      }),
    }
  }

  componentDidMount() {
    console.log("Game componentDidMount")
  }
  useTurn(){
    console.log(this)
    let instance = this;
    return (func : (side: number) => void) => {
      func(instance.state.turn!)
    }
  }

  changeTurn() {
    return () => {
      // this.state.turn = this.state.turn * -1
      this.setState((state : State) => {
        console.log("changeTurn")
        if (state === undefined) { return null}
      
        const prevTurn : number = state.turn!;
        return {
          turn: prevTurn * -1,
        }
      })
    }
  }

  render() {
    console.log('render game')
    return <div className='game'>{
      this.state.board.render()
    }
    </div>
  }
}
