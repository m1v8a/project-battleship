import { Controller } from "./classes/Controller.js";
import { BOARD_SIZE } from "./classes/Gameboard.js";
import { Player } from "./classes/Player.js";
import "./style.css";

const playerContainer = document.querySelector("#player-container");
const computerContainer = document.querySelector("#computer-container");
const playerBoardEl = playerContainer.querySelector(".board");
const computerBoardEl = computerContainer.querySelector(".board");

Controller.init({
  player: new Player("Player"),
  computer: new Player("Computer"),
  playerBoardEl: playerBoardEl,
  computerBoardEl: computerBoardEl,
});

let computerAttacks = [];
computerBoardEl.addEventListener("click", (e) => {
  if (e.target.className !== "cell") return;
  const row = +e.target.dataset.row;
  const col = +e.target.dataset.col;

  try {
    const playerState = Controller.player.attack(Controller.computer, row, col);
    Controller.updateBoard(Controller.computer, Controller.computerBoardEl);
    let r = Math.floor(Math.random() * BOARD_SIZE);
    let c = Math.floor(Math.random() * BOARD_SIZE);
    while (computerAttacks.includes(`${r}${c}`)) {
      r = Math.floor(Math.random() * BOARD_SIZE);
      c = Math.floor(Math.random() * BOARD_SIZE);
    }
    computerAttacks.push(`${r}${c}`);
    const computerState = Controller.computer.attack(Controller.player, r, c);
    Controller.updateBoard(Controller.player, Controller.playerBoardEl);
  } catch (error) {
    alert(error.message);
  }
});
