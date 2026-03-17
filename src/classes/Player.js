import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  attack(target, row, col) {
    return target.board.receiveAttack(row, col);
  }
}
