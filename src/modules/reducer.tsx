
import { Side } from 'logic/rule';

const initialState = {
  turn: Side.Black,
}

export default function reducer(state = initialState, action : any) {
  switch(action.type) {
    case 'SET_BLACK':
      state.turn = Side.White;
      break;
    case 'SET_WHITE':
      state.turn = Side.Black;
      break;
    default:
      return state
  }
}