const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

function createPart(root) {
  return { root, row: 0, col: 0 };
}

export class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
    this.parts = this.#buildParts(length);
    this.orientation = HORIZONTAL;
  }

  hit() {
    this.health -= 1;
  }

  isSunk() {
    return this.health <= 0;
  }

  setPos(row, col) {
    this.parts = this.parts.map((p, i) => {
      if (this.orientation === HORIZONTAL) {
        p.row = row;
        p.col = col + i;
      } else if (this.orientation === VERTICAL) {
        p.row = row + i;
        p.col = col;
      }
      return p;
    });
  }

  toggleOrientation() {
    this.orientation = this.orientation === HORIZONTAL ? VERTICAL : HORIZONTAL;
  }

  #buildParts(len) {
    const parts = [];
    for (let i = 0; i < len; i++) {
      parts.push(createPart(this));
    }
    return parts;
  }
}
