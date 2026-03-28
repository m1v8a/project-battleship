import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.board = new Gameboard();
    this.isComputer = isComputer;
  }

  get hits() {
    return this.board.state.hits;
  }
  get misses() {
    return this.board.state.misses;
  }

  get sunkenShips() {
    return this.board.state.sunkenShips;
  }

  attack(targetPlayer, x, y) {
    if (this.isComputer) {
      this.#computerAttack(targetPlayer);
    } else {
      targetPlayer.board.receiveAttack(x, y);
    }
  }

  #computerAttack(targetPlayer) {
    const undestroyedCells = targetPlayer.board.getUndestroyedCells();
    const [randX, randY] =
      undestroyedCells[Math.floor(Math.random() * undestroyedCells.length)];
    targetPlayer.board.receiveAttack(randX, randY);
  }
}
