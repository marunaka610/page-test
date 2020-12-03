import { Square } from '../components/square';

export const Setting = {
  BOARD_SIZE : 8
};

export const Side = {
  None : 0,
  Black : 1,
  White : -1
}

class Vector {
  state : any;
  constructor(prop : any){
    this.state = {
      row : prop.row,
      column : prop.column
    }
  }
}

export const Direction = {
  Up : new Vector({row:-1, column:0}),
  UpRight : [-1, 1],
  Right : [0, 1],
  DownRight : [1, 1],
  Down : [1, 0],
  DownLeft : [1, -1],
  Left : [0, -1],
  UpLeft : [-1, -1],
}

export class Position {
  state : any;
  constructor(prop : any){
    this.state = {
      row : prop.row,
      column : prop.column
    }
  }
}

export function enableSetPiece(p : Position, squares : number[][]){
  Object.keys(Direction).forEach(element => {
    return enabelSetPieceImpl(p, 1, false, squares);
  });
}
function enabelSetPieceImpl(prePoint : Position
  , offset : number
  , isReverse : boolean
  , squares : number[][]){

    const curPoint = new Position({
      row : prePoint.state.row,
      column : prePoint.state.column,
    })
    // if ()

}

