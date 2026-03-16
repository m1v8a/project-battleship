import { Gameboard } from "../classes/Gameboard.js";
import { Ship } from "../classes/Ship.js";

let b;
let ship;
beforeEach(() => {
  b = new Gameboard();
  ship = new Ship(3);
});
describe("build board", () => {
  it("gives back an array when board is read", () => {
    expect(b.board).toBeInstanceOf(Array);
  });
});

describe("placeShip()", () => {
  it("place the ship's body parts on the correct position in horizontal (default)", () => {
    b.placeShip(ship, 4, 4);
    expect(b.getPos(4, 4)).toEqual(ship.body[0]);
    expect(b.getPos(5, 4)).toEqual(ship.body[1]);
    expect(b.getPos(6, 4)).toEqual(ship.body[2]);
  });

  it("place the ship's body parts on the correct position in vertical (default)", () => {
    ship.toggleOrientation(); // toggles from horizontal to vertical
    b.placeShip(ship, 4, 4);
    expect(b.getPos(4, 4)).toEqual(ship.body[0]);
    expect(b.getPos(4, 5)).toEqual(ship.body[1]);
    expect(b.getPos(4, 6)).toEqual(ship.body[2]);
  });
});

describe("receiveAttack()", () => {
  it("destroy a part of the ship if there's a ship in the target position", () => {
    const initialHealth = ship.health; // save the inital health of the ship
    b.placeShip(ship, 4, 4); // place a ship horizotally

    b.receiveAttack(4, 4);
    expect(b.board[4][4]).toBe("hit"); // ship got hit once
    expect(ship.health).toBe(initialHealth - 1);
    b.receiveAttack(5, 4);
    expect(b.board[5][4]).toBe("hit"); // ship got hit again the second time
    expect(ship.health).toBe(initialHealth - 2);
  });

  it("throws when already destroyed target position is being targeted again", () => {
    b.placeShip(ship, 4, 4); // place a ship horizotally
    b.receiveAttack(4, 4);
    expect(() => b.receiveAttack(4, 4)).toThrow();
  });
});
