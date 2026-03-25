import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.board = new Gameboard();
    if (isComputer) {
      this.computerAttack = (targetPlayer) => {
        this.#computerAttack(targetPlayer);
      };
    } else {
      this.attack = (targetPlayer, x, y) => {
        this.#attack(targetPlayer, x, y);
      };
    }
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

  #attack(targetPlayer, x, y) {
    try {
      targetPlayer.board.receiveAttack(x, y);
    } catch (error) {
      console.error(error.message);
    }
  }

  #computerAttack(targetPlayer) {
    const undestroyedCells = targetPlayer.board.getUndestroyedCells();
    const [randX, randY] =
      undestroyedCells[Math.floor(Math.random() * undestroyedCells.length)];

    this.#attack(targetPlayer, randX, randY);
  }
}
