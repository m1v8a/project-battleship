export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";

export class Ship {
  constructor(length) {
    this.length = length;
    this.hitsReceived = 0;
    this.orientation = HORIZONTAL;
    this.tails = [];
  }

  hit() {
    this.hitsReceived += 1;
  }

  toggleOrientation() {
    this.orientation = this.orientation === HORIZONTAL ? VERTICAL : HORIZONTAL;
  }

  isSunk() {
    return this.hitsReceived >= this.length;
  }
}
