import { Controller } from "./classes/Controller.js";
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

computerBoardEl.addEventListener("click", (e) => {
  if (e.target.className !== "cell") return;
  const row = +e.target.dataset.row;
  const col = +e.target.dataset.col;

  try {
    const states = Controller.player.attack(Controller.computer, row, col);
    console.log(states);
    Controller.updateBoard(Controller.computer, Controller.computerBoardEl);
  } catch (error) {
    alert(error.message);
  }
});
