import { HORIZONTAL, Ship } from "./Ship.js";

const BOARD_SIZE = 8;
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

  #generateShips() {
    const ships = [];
    for (let i = 0; i < SHIPS_LENGTHS; i++) {
      ships.push(new Ship(i));
    }
  }

  deploy(ship, x, y) {
    const coordinates = this.#getCoordinates(ship, x, y);
    if (this.#isCellsOccupied(coordinates)) {
      throw new Error("A ship is alread in place");
    }
    coordinates.forEach((coor) => {
      this.grid[coor[0]][coor[1]].ship = ship;
    });
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
