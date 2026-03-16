import { Ship } from "./Ship.js";

export class Player {
  #name;
  #score;
  #board;
  #ships;
  constructor(name) {
    this.#name = name;
    this.#score = 0;
    this.#ships = this.#createShips();
    this.#board = this.#createBoard();
  }

  get name() {
    return this.#name;
  }

  get score() {
    return this.#score;
  }

  get board() {
    return this.#board;
  }

  get ships() {
    return this.#ships;
  }

  #createShips() {
    const ships = [];
    const lens = [2, 2, 3, 3, 4, 5];
    for (let i = 0; i < lens.length; i++) {
      ships.push(new Ship(lens[i]));
    }
    return ships;
  }

  #createBoard() {}
}
