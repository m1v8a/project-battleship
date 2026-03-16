const BOARD_SIZE = 8;
const HIT_INDICATOR = "hit";
const MISS_INDICATOR = "miss";

export class Gameboard {
  #board;
  constructor() {
    this.#board = this.#buildBoard();
  }

  get board() {
    return this.#board;
  }

  getPos(row, col) {
    return this.#board[row][col];
  }

  placeShip(ship, row, col) {
    ship.setPos(row, col);
    if (this.#invalidPos(ship)) {
      throw new Error("A ship is already in place");
    }
    ship.body.forEach((part) => {
      this.#board[part.row][part.col] = part;
    });
  }

  receiveAttack(row, col) {
    const cell = this.#board[row][col];
    if (cell === HIT_INDICATOR || cell === MISS_INDICATOR) {
      throw new Error("the target is already destroyed, choose another target");
    } else if (cell) {
      cell.root.hit(); // deals a damage to the ship
      this.#board[row][col] = HIT_INDICATOR;
    } else {
      // replace whatever in the target position with a destroy indicator
      this.#board[row][col] = MISS_INDICATOR;
    }
  }

  #invalidPos(ship) {
    for (let i = 0; i < ship.body.length; i++) {
      const part = ship.body[i];
      if (this.#board[part.row][part.col]) {
        return true;
      }
    }
    return false;
  }

  #buildBoard() {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const r = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        r.push(null);
      }
      board.push(r);
    }
    return board;
  }
}
