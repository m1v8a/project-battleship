import { BOARD_SIZE } from "./Gameboard.js";

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

        boardEl.appendChild(div);
      });
    });
  }
}
