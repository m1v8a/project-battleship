import { BOARD_SIZE } from "./Gameboard.js";
import { Player } from "./Player.js";
import { HORIZONTAL } from "./Ship.js";

export class Game {
  static playerOne = null;
  static playerTwo = null;

  static init() {
    this.playerOne = new Player("Player One");
    this.playerTwo = new Player("Player Two");

    this.playerOne.containerEl = document.querySelector("#player-one");
    this.playerTwo.containerEl = document.querySelector("#player-two");

    const playerOneGrid = this.playerOne.containerEl.querySelector(".grid");
    const playerTwoGrid = this.playerTwo.containerEl.querySelector(".grid");

    playerOneGrid.style.gridTemplate = `repeat(${BOARD_SIZE}, 1fr) / repeat(${BOARD_SIZE}, 1fr)`;
    playerTwoGrid.style.gridTemplate = `repeat(${BOARD_SIZE}, 1fr) / repeat(${BOARD_SIZE}, 1fr)`;

    this.deployShipsRandomly(this.playerOne);
    this.deployShipsRandomly(this.playerTwo);
    this.update();

    // CONTROLS
    playerTwoGrid.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.classList.contains("cell")) return;
      // attack the cell
      const x = target.dataset.x;
      const y = target.dataset.y;

      this.playerOne.attack(this.playerTwo, x, y);

      this.update();
    });
  }

  static renderBoard(player) {
    const grid = player.board.grid;
    const gridEl = player.containerEl.querySelector(".grid");

    gridEl.innerHTML = "";
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const div = document.createElement("div");
        div.className = "cell";
        div.dataset.x = x;
        div.dataset.y = y;
        // div.textContent = `${x}-${y}`; // debug

        // update
        const cell = grid[x][y];
        if (cell.ship) {
          div.classList.add("ship");

          const [tail1, tail2] = cell.ship.tails;
          console.log(cell.ship.length, tail1, tail2);
          if (x === tail1[0] && y === tail1[1]) {
            if (cell.ship.orientation === HORIZONTAL) {
              div.classList.add("tail-front-h");
            } else {
              div.classList.add("tail-front-v");
            }
          } else if (x === tail2[0] && y === tail2[1]) {
            if (cell.ship.orientation === HORIZONTAL) {
              div.classList.add("tail-end-h");
            } else {
              div.classList.add("tail-end-v");
            }
          } else {
            if (cell.ship.orientation === HORIZONTAL) {
              div.classList.add("ship-body-h");
            } else {
              div.classList.add("ship-body-v");
            }
          }
        }

        if (cell.destroyed) {
          div.classList.add("destroyed");
        }

        gridEl.appendChild(div);
      }
    }
  }

  static update() {
    this.renderBoard(this.playerOne);
    this.renderBoard(this.playerTwo);
    this.renderScoreboard(this.playerOne);
    this.renderScoreboard(this.playerTwo);
  }

  static renderScoreboard(player) {
    const { hits, misses, sunkenShips } = player.board.getState();
    const shipsCount = player.board.getShips().length;
    const name = player.name;

    const nameEl = player.containerEl.querySelector(".name");
    const hitsEl = player.containerEl.querySelector(".hits");
    const missesEl = player.containerEl.querySelector(".misses");
    const shipsLeftEl = player.containerEl.querySelector(".ships .left");
    const shipsTotalEl = player.containerEl.querySelector(".ships .total");

    nameEl.textContent = name + "'s board";
    hitsEl.textContent = "Hit: " + hits;
    missesEl.textContent = "Miss: " + misses;
    shipsLeftEl.textContent = "Ships: " + (shipsCount - sunkenShips);
    shipsTotalEl.textContent = shipsCount;
  }

  static deployShipsRandomly(player) {
    player.board.getShips().forEach((ship) => {
      const unOccupiedCells = player.board.getUnoccupiedCells();
      const flip = Math.floor(Math.random() * 2);
      let deployError = true;
      while (deployError === true) {
        const [x, y] =
          unOccupiedCells[Math.floor(Math.random() * unOccupiedCells.length)];

        if (flip === 1) {
          ship.toggleOrientation();
        }
        try {
          player.board.deploy(ship, x, y);
          deployError = false;
        } catch (error) {
          deployError = true;
        }
      }
    });
  }
}
