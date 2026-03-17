import { Gameboard } from "../classes/Gameboard.js";

let board;
beforeEach(() => {
  board = new Gameboard();
});

describe("placeShip()", () => {
  it("places the ship's body on the correct positions", () => {
    board.placeShip(0, 4, 4);
    board.ships[0].parts.forEach((p) => {
      expect(board.board[p.row][p.col].occupied).toBe(true);
      expect(board.board[p.row][p.col].ship).toEqual(board.ships[0]);
    });
  });

  it("throws and error message when placing  a ship on occupied cells", () => {
    // ship at 0 index have length 2
    board.placeShip(0, 4, 4); // occupied cells are [4, 4] to [4, 5]
    // ship at 1 index have length 2
    expect(() => board.placeShip(1, 4, 5)).toThrow();
    // ship at 2 index have length 3
    expect(() => board.placeShip(2, 5, 4)).not.toThrow();
  });
});
