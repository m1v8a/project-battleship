import { HORIZONTAL, Ship } from "./Ship.js";

export const BOARD_SIZE = 12;
const SHIPS_LENGTHS = [2, 2, 3, 3, 4, 5];

export class Gameboard {
  constructor() {
    this.grid = this.#generateGrid(BOARD_SIZE);
    this.state = { hits: 0, misses: 0, sunkenShips: 0 };
    this.ships = this.#generateShips();
  }

  #generateGrid(size) {
    const grid = [];
    for (let x = 0; x < size; x++) {
      const r = [];
      for (let y = 0; y < size; y++) {
        r.push(new Cell(null, x, y));
      }
      grid.push(r);
    }
    return grid;
  }

  getState() {
    return this.state;
  }

  getShips() {
    return this.ships;
  }

  #generateShips() {
    const ships = [];
    for (let i = 0; i < SHIPS_LENGTHS.length; i++) {
      ships.push(new Ship(SHIPS_LENGTHS[i]));
    }
    return ships;
  }

  deploy(ship, x, y) {
    const coordinates = this.#getCoordinates(ship, x, y);
    if (this.#isOutOfBounds(coordinates)) {
      throw new Error("Out of bounds");
    }

    if (this.#isCellsOccupied(coordinates)) {
      throw new Error("A ship is alread in place");
    }

    for (let i = 0; i < coordinates.length; i++) {
      const coor = coordinates[i];
      if (i === 0) {
        ship.tails.push(coor);
      } else if (i === coordinates.length - 1) {
        ship.tails.push(coor);
      }
      this.grid[coor[0]][coor[1]].ship = ship;
    }
  }

  #getCoordinates(ship, x, y) {
    const coords = [];
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation === HORIZONTAL) {
        coords.push([x, y + i]);
      } else {
        coords.push([x + i, y]);
      }
    }

    return coords;
  }

  #isOutOfBounds(coordinates) {
    for (let i = 0; i < coordinates.length; i++) {
      const coor = coordinates[i];
      if (
        coor[0] > BOARD_SIZE - 1 ||
        coor[0] < 0 ||
        coor[1] > BOARD_SIZE - 1 ||
        coor[1] < 0
      ) {
        return true;
      }
    }
    return false;
  }

  #isCellsOccupied(coordinates) {
    let isOccupied = false;
    for (let i = 0; i < coordinates.length; i++) {
      const [x, y] = coordinates[i];
      if (this.grid[x][y].ship !== null) {
        return true;
      }
    }
    return isOccupied;
  }

  receiveAttack(x, y) {
    const cell = this.grid[x][y];
    if (cell.destroyed) {
      throw new Error("Target is already destroyed");
    }
    cell.destroyed = true;
    if (cell.ship !== null) {
      cell.ship.hit(); // hit the ship
      this.#attackHits();

      if (cell.ship.isSunk()) {
        this.state.sunkenShips += 1;
      }
    } else {
      this.#attackMisses();
    }
  }

  getUndestroyedCells() {
    const availableCells = [];
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (!this.grid[x][y].destroyed) {
          availableCells.push([x, y]);
        }
      }
    }
    return availableCells;
  }

  getUnoccupiedCells() {
    const availableCells = [];
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (!this.grid[x][y].ship) {
          availableCells.push([x, y]);
        }
      }
    }
    return availableCells;
  }

  #attackHits() {
    this.state.hits += 1;
  }

  #attackMisses() {
    this.state.misses += 1;
  }
}

export class Cell {
  constructor(ship, x, y) {
    this.ship = ship;
    this.x = x;
    this.y = y;
    this.destroyed = false;
  }
}
