

import {SquareState}  from 'logic/rule';

export class SquareObj {

  state :number;

  constructor(state: number) {
    this.state = state;
  }

  getState() : number {
    return this.state;
  }

  isBlack() : boolean {
    return this.state === SquareState.Black;
  }

  isWhite() : boolean {
    return this.state === SquareState.White;
  }


  isSamePiece(piece : number) : boolean {
    return this.state === piece;
  }

  isExistPiece() : boolean {
    return this.state === SquareState.Black || this.state === SquareState.White;
  }

  setPiece(piece : number){
    this.state = piece
  }

}