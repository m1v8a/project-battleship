import { BOARD_SIZE } from "./Gameboard.js";
import { HORIZONTAL } from "./Ship.js";

export class Controller {
  static player;
  static computer;
  static playerBoardEl;
  static computerBoardEl;

  static init({ player, computer, playerBoardEl, computerBoardEl }) {
    this.player = player;
    this.computer = computer;
    this.playerBoardEl = playerBoardEl;
    this.computerBoardEl = computerBoardEl;
    this.placeShipsRandom(player);
    this.placeShipsRandom(computer, true);

    this.updateBoard(this.player, this.playerBoardEl);
    this.updateBoard(this.computer, this.computerBoardEl);
  }

  static updateBoard(player, boardEl) {
    const board = player.board.get();

    const bw = boardEl.offsetWidth;
    const bh = boardEl.offsetHeight;
    boardEl.innerHTML = "";
    board.forEach((row, ri) => {
      row.forEach((cell, ci) => {
        const div = document.createElement("div");
        div.className = "cell";
        div.style.width = bw / BOARD_SIZE + "px";
        div.style.height = bh / BOARD_SIZE + "px";
        div.dataset.row = ri;
        div.dataset.col = ci;

        if (cell.ship) {
          if (!cell.hidden) {
            div.style.backgroundColor = "#925524";
          }

          if (cell.state) {
            if (cell.state === "hit") {
              div.style.backgroundColor = "#24f255";
            }
          }
        }
        if (cell.state === "miss") {
          console.log("ran");
          div.style.backgroundColor = "#333";
        }

        boardEl.appendChild(div);
      });
    });
  }

  static placeShipsRandom(player, hidden) {
    let shipIndex = 0;
    while (shipIndex < player.board.ships.length) {
      let placed = false;
      while (placed === false) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        try {
          if (Math.floor(Math.random() * 2) === 1) {
            player.board.ships[shipIndex].toggleOrientation();
          }
          player.board.placeShip(shipIndex, row, col, hidden);
          placed = true;
        } catch (err) {
          console.log(err.message);
          placed = false;
        }
      }
      shipIndex++;
    }
  }
}
