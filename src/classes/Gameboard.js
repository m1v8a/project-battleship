import { HORIZONTAL, Ship, VERTICAL } from "./Ship.js";

export const BOARD_SIZE = 12;

function createCell(
  ship = null,
  state = null,
  occupied = false,
  hidden = false
) {
  return {
    ship,
    state,
    occupied,
    hidden,
  };
}

export class Gameboard {
  constructor() {
    this.board = this.#buildBoard();
    this.ships = this.#buildShips();
    this.states = { sunkenCount: 0, hits: 0, misses: 0 };
  }

  get() {
    return this.board;
  }

  placeShip(shipIndex, row, col, hidden) {
    // check if the positon is valid
    if (this.#isInvalidPos(shipIndex, row, col)) {
      throw new Error("invalid position, choose another");
    }
    const ship = this.ships[shipIndex];
    ship.setPos(row, col);
    ship.parts.forEach((p) => {
      this.board[p.row][p.col] = createCell(ship, null, true, hidden);
    });
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];

    // either "hit" or "miss" or "null"
    if (cell.state !== null) {
      throw new Error("Target is already destroyed");
    }
    if (cell.ship !== null) {
      cell.ship.hit(); // should decrease the health of the ship by 1
      this.states.hits += 1;
      cell.state = "hit";
    } else {
      cell.state = "miss";
      this.states.misses += 1;
    }

    this.states.sunkenCount = this.#getSunkenShipsCount();

    return this.states;
  }

  #getSunkenShipsCount() {
    let sunkenCount = 0;
    this.ships.forEach((ship) => {
      sunkenCount += ship.isSunk() ? 1 : 0;
    });

    return sunkenCount;
  }

  allShipSunken() {
    return this.#getSunkenShipsCount() === this.ships.length;
  }

  #isInvalidPos(shipIndex, row, col) {
    const ship = this.ships[shipIndex];
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === HORIZONTAL) {
        const c = col + i;
        // this would mean the given position is invalid
        if (c >= BOARD_SIZE) {
          return true;
        }

        const cell = this.board[row][c];
        // the cell on the position where this current ship's part supposed to be is already occupied
        if (cell.occupied) {
          return true;
        }
      } else if (ship.orientation === VERTICAL) {
        const r = row + i;

        if (r >= BOARD_SIZE) return true;

        const cell = this.board[r][col];
        if (cell.occupied) {
          return true;
        }
      }
    }
    return false;
  }

  #buildShips() {
    const sizes = [2, 2, 3, 3, 4, 5];
    const ships = [];
    for (let i = 0; i < sizes.length; i++) {
      const s = sizes[i];
      ships.push(new Ship(s));
    }
    return ships;
  }

  #buildBoard() {
    const board = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      const row = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        row.push(createCell());
      }
      board.push(row);
    }
    return board;
  }
}
