import { BOARD_SIZE } from "./Gameboard.js";
import { Player } from "./Player.js";
import { HORIZONTAL } from "./Ship.js";

export class Controller {
  static player;
  static computer;

  static init() {
    const playerContainer = document.querySelector("#player-container");
    const computerContainer = document.querySelector("#computer-container");
    this.player = new Player("Player");
    this.player.boardEl = playerContainer.querySelector(".board");
    this.player.hitEl = playerContainer.querySelector(".hits");
    this.player.missEl = playerContainer.querySelector(".misses");
    this.computer = new Player("Computer");
    this.computer.boardEl = computerContainer.querySelector(".board");
    this.computer.hitEl = computerContainer.querySelector(".hits");
    this.computer.missEl = computerContainer.querySelector(".misses");
    this.computer.attackedList = []; // use to store already attacked cells

    // place all ships at random positions
    this.placeShipsRandom(this.player);
    this.placeShipsRandom(this.computer, true); // hide computer ships from the display

    this.updateBoard(this.player);
    this.updateBoard(this.computer);

    // turn off interaction with computer board
    this.toggleInteraction(this.player.boardEl, "off");

    // attacking logic
    this.computer.boardEl.addEventListener("click", (e) => {
      if (e.target.className !== "cell") return;
      const row = +e.target.dataset.row;
      const col = +e.target.dataset.col;
      try {
        const playerState = Controller.playerAttack(row, col);
        this.updateBoard(this.computer, this.computerBoardEl);
        this.updateScoreboard(this.computer, playerState);

        this.toggleInteraction(this.player.boardEl, "on");
        this.toggleInteraction(this.computer.boardEl, "off");
        setTimeout(() => {
          const computerState = this.computerAttack();
          this.updateBoard(this.player, this.playerBoardEl);
          this.updateScoreboard(this.player, computerState);

          setTimeout(() => {
            this.toggleInteraction(this.player.boardEl, "off");
            this.toggleInteraction(this.computer.boardEl, "on");
          }, 1000);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    });
  }

  static updateBoard(player) {
    const board = player.board.get();

    const bw = player.boardEl.offsetWidth;
    const bh = player.boardEl.offsetHeight;
    player.boardEl.innerHTML = "";
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
          div.style.backgroundColor = "#333";
        }

        player.boardEl.appendChild(div);
      });
    });
  }

  static updateScoreboard(player, states) {
    player.hitEl.innerText = states.hits;
    player.missEl.innerText = states.misses;
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

  static playerAttack(row, col) {
    const state = this.player.attack(this.computer, row, col);
    return state;
  }

  static computerAttack() {
    do {
      var r = Math.floor(Math.random() * BOARD_SIZE);
      var c = Math.floor(Math.random() * BOARD_SIZE);
    } while (this.computer.attackedList.includes(`${r}${c}`));

    this.computer.attackedList.push(`${r}${c}`);
    const state = this.computer.attack(this.player, r, c);
    return state;
  }

  static toggleInteraction(element, mode) {
    if (mode === "off") {
      element.dataset.blocked = true;
    } else if (mode === "on") {
      element.dataset.blocked = false;
    }
  }
}
