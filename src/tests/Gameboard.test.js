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

describe("receiveAttack()", () => {
  it("mark the target cell 'hit' when there's ship in it", () => {
    board.placeShip(0, 4, 4);
    board.receiveAttack(4, 4);
    expect(board.board[4][4].state).toBe("hit");
  });

  it("marks the target cell 'miss' when there's no ship in it", () => {
    board.placeShip(0, 4, 4);
    board.receiveAttack(5, 4);
    expect(board.board[5][4].state).toBe("miss");
  });

  it("returns an object with the current state of the board", () => {
    expect(board.receiveAttack(4, 4)).toHaveProperty(["sunkenCount"]);
    expect(board.receiveAttack(5, 4)).toHaveProperty(["hits"]);
    expect(board.receiveAttack(6, 4)).toHaveProperty(["misses"]);
  });

  it("increase hits count when the attack is successfull", () => {
    board.placeShip(0, 4, 4);
    board.receiveAttack(4, 4);
    expect(board.states.hits).toBe(1);
    expect(board.states.misses).toBe(0);
  });

  it("increase misses count when the attack is not successfull", () => {
    board.placeShip(0, 4, 4);
    board.receiveAttack(5, 4);
    expect(board.states.hits).toBe(0);
    expect(board.states.misses).toBe(1);
  });
});

describe("allShipSunken()", () => {
  it("returns true when all of the ships has sunken", () => {
    for (let i = 0; i < board.ships.length; i++) {
      const ship = board.ships[i];
      ship.health = 0;
    }
    expect(board.allShipSunken()).toBe(true);
  });

  it("returns false when all of the ships hasn't sunken yet", () => {
    expect(board.allShipSunken()).toBe(false);
  });
});
