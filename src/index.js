import { Controller } from "./classes/Controller.js";
import { Player } from "./classes/Player.js";
import "./style.css";

const playerContainer = document.querySelector("#player-container");
const computerContainer = document.querySelector("#computer-container");
const playerBoardEl = playerContainer.querySelector(".board");
const computerBoardEl = computerContainer.querySelector(".board");

console.log(computerBoardEl);
Controller.init({
  player: new Player("Player"),
  computer: new Player("Computer"),
  playerBoardEl: playerBoardEl,
  computerBoardEl: computerBoardEl,
});

computerBoardEl.addEventListener("click", (e) => {});
