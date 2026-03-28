import { BOARD_SIZE, Gameboard } from "./Gameboard.js";

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.board = new Gameboard();
    this.isComputer = isComputer;
    if (isComputer) {
      this.attackPattern = [];
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

  attack(targetPlayer, x, y) {
    if (this.isComputer) {
      this.#computerAttack(targetPlayer);
    } else {
      targetPlayer.board.receiveAttack(x, y);
    }
  }

  #computerAttack(targetPlayer) {
    console.log(this.attackPattern);
    if (!this.attackPattern.length) {
      const undestroyedCells = targetPlayer.board.getUndestroyedCells();
      const [randX, randY] =
        undestroyedCells[Math.floor(Math.random() * undestroyedCells.length)];

      targetPlayer.board.receiveAttack(randX, randY);
      this.setAttackPattern(targetPlayer, randX, randY);
    } else {
      const randomIndex = Math.floor(Math.random() * this.attackPattern.length);
      const [x, y] = this.attackPattern[randomIndex];
      this.attackPattern.splice(randomIndex, 1);
      targetPlayer.board.receiveAttack(x, y);
    }
  }

  setAttackPattern(targetPlayer, x, y) {
    if (targetPlayer.board.isLastAttackReceivedHit()) {
      const up = [x - 1, y];
      const down = [x + 1, y];
      const left = [x, y - 1];
      const right = [x, y + 1];

      if (
        up[0] < BOARD_SIZE &&
        up[0] > -1 &&
        up[1] < BOARD_SIZE &&
        up[1] > -1
      ) {
        if (!targetPlayer.board.isCellDestroyed(up[0], up[1])) {
          this.attackPattern.push(up);
        }
      }
      if (
        down[0] < BOARD_SIZE &&
        down[0] > -1 &&
        down[1] < BOARD_SIZE &&
        down[1] > -1
      ) {
        if (!targetPlayer.board.isCellDestroyed(down[0], down[1])) {
          this.attackPattern.push(down);
        }
      }
      if (
        left[0] < BOARD_SIZE &&
        left[0] > -1 &&
        left[1] < BOARD_SIZE &&
        left[1] > -1
      ) {
        if (!targetPlayer.board.isCellDestroyed(left[0], left[1])) {
          this.attackPattern.push(left);
        }
      }
      if (
        right[0] < BOARD_SIZE &&
        right[0] > -1 &&
        right[1] < BOARD_SIZE &&
        right[1] > -1
      ) {
        if (!targetPlayer.board.isCellDestroyed(right[0], right[1])) {
          this.attackPattern.push(right);
        }
      }
    }
  }
}
