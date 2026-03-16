const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

export class Ship {
  #length;
  #health;
  #body;
  #orientation;
  constructor(length) {
    this.#length = length;
    this.#health = length;
    this.#body = this.#buildBody();
    this.#orientation = HORIZONTAL;
  }

  get length() {
    return this.#length;
  }

  get body() {
    return this.#body;
  }

  get health() {
    return this.#health;
  }

  get orientation() {
    return this.#orientation;
  }

  toggleOrientation() {
    this.#orientation = HORIZONTAL ? VERTICAL : HORIZONTAL;
  }

  setPos(row, col) {
    this.#body[0].row = row;
    this.#body[0].col = col;
    this.#body[1].row = row + 1;
    this.#body[1].col = col;

    this.#body = this.#body.map((part, i) => {
      if (this.#orientation === HORIZONTAL) {
        part.row = row + i;
        part.col = col;
      } else {
        part.row = row;
        part.col = col + i;
      }
      return part;
    });
  }

  hit() {
    this.#health -= 1;
  }

  isSunk() {
    return this.#health <= 0;
  }

  #buildBody() {
    const parts = [];
    for (let i = 0; i < this.#length; i++) {
      parts.push(new Part(this));
    }

    return parts;
  }
}

class Part {
  #root;
  constructor(root) {
    this.#root = root;
    this.row = 0;
    this.col = 0;
  }

  get root() {
    return this.#root;
  }
}
