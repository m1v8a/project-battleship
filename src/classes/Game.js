import { BOARD_SIZE } from "./Gameboard.js";
import { Player } from "./Player.js";

export class Game {
  static playerOne = null;
  static playerTwo = null;

  static init() {
    this.playerOne = new Player("Player One");
    this.playerTwo = new Player("Player Two");

    this.playerOne.containerEl = document.querySelector("#player-one");
    this.playerTwo.containerEl = document.querySelector("#player-two");

    this.renderBoard(this.playerOne);
    this.renderBoard(this.playerTwo);
    this.renderScoreboard(this.playerOne);
    this.renderScoreboard(this.playerTwo);
  }

  static renderBoard(player) {
    const grid = player.board.grid;
    const gridEl = player.containerEl.querySelector(".grid");
    const gridElWidth = gridEl.offsetWidth;
    const gridElHeight = gridEl.offsetHeight;

    gridEl.innerHTML = "";
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const div = document.createElement("div");
        div.className = "cell";
        div.style.width = gridElWidth / BOARD_SIZE + "px";
        div.style.height = gridElHeight / BOARD_SIZE + "px";
        div.wi;
        gridEl.appendChild(div);
      }
    }
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

    nameEl.textContent = name;
    hitsEl.textContent = hits;
    missesEl.textContent = misses;
    shipsLeftEl.textContent = shipsCount - sunkenShips;
    shipsTotalEl.textContent = shipsCount;
  }
}
