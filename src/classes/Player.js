import { BOARD_SIZE, Gameboard } from "./Gameboard.js";
import { HORIZONTAL } from "./Ship.js";

const DIR = {
  right: 0,
  left: 1,
  up: 2,
  down: 3,
};

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.board = new Gameboard();
    this.isComputer = isComputer;
    if (isComputer) {
      this.nextTarget = { coor: [], dir: null };
      this.rootTarget = null;
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
    if (this.nextTarget.coor.length) {
      const [x, y] = this.nextTarget.coor;
      targetPlayer.board.receiveAttack(x, y);

      if (targetPlayer.board.isLastAttackReceivedHit()) {
        const { ship } = targetPlayer.board.getCell(x, y);
        this.#setNextTarget(targetPlayer, ship, x, y, this.nextTarget.dir);
      } else {
        this.nextTarget = { coor: [], dir: null };
      }
    } else {
      const undestroyedCells = targetPlayer.board.getUndestroyedCells();
      const [randX, randY] =
        undestroyedCells[Math.floor(Math.random() * undestroyedCells.length)];

      targetPlayer.board.receiveAttack(randX, randY);

      if (targetPlayer.board.isLastAttackReceivedHit()) {
        const { ship } = targetPlayer.board.getCell(randX, randY);
        this.rootTarget = [randX, randY];
        this.#setNextTarget(
          targetPlayer,
          ship,
          randX,
          randY,
          this.nextTarget.dir
        );
      } else {
        this.nextTarget = { coor: [], dir: null };
      }
    }
  }

  #setNextTarget(targetPlayer, ship, x, y, dir) {
    const [fx, fy] = ship.tails[0]; // front tail
    const [ex, ey] = ship.tails[1]; // end tail
    const [rx, ry] = this.rootTarget;
    if (ship.orientation === HORIZONTAL) {
      // if it reaches the end tail, switch the direction of attack to right
      if (ex === x && ey === y) {
        if (ship.isSunk()) {
          this.nextTarget = { coor: [], dir: null }; // reset
        } else if (ry - 1 > -1) {
          if (!targetPlayer.board.isCellDestroyed(rx, ry - 1)) {
            // get the nextTarget from the rootTarget
            this.nextTarget = { coor: [rx, ry - 1], dir: DIR.left };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        }
      } else {
        if (dir === DIR.left) {
          if (y - 1 > -1) {
            this.nextTarget = { coor: [x, y - 1], dir: DIR.left };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        } else {
          if (y + 1 < BOARD_SIZE) {
            this.nextTarget = { coor: [x, y + 1], dir: DIR.right };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        }
      }
    } else {
      // if it reaches the end tail, switch the direction of attack to up
      if (ex === x && ey === y) {
        if (rx - 1 > -1) {
          if (ship.isSunk()) {
            this.nextTarget = { coor: [], dir: null }; // reset
          } else if (!targetPlayer.board.isCellDestroyed(rx - 1, ry)) {
            // get the nextTarget from the rootTarget
            this.nextTarget = { coor: [rx - 1, ry], dir: DIR.up };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        }
      } else {
        if (dir === DIR.up) {
          if (x - 1 > -1) {
            this.nextTarget = { coor: [x - 1, y], dir: DIR.up };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        } else {
          if (x + 1 < BOARD_SIZE) {
            this.nextTarget = { coor: [x + 1, y], dir: DIR.down };
          } else {
            this.nextTarget = { coor: [], dir: null }; // reset
          }
        }
      }
    }

    if (fx === x && fy === y) {
      if (ship.isSunk()) {
        this.nextTarget = { coor: [], dir: null };
      }
    }

    console.log(this.nextTarget.coor);
  }
}
