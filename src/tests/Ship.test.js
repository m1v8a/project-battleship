import { Ship } from "../classes/Ship.js";

let ship;
beforeEach(() => {
  ship = new Ship(3);
});

describe("hit()", () => {
  it("takes damage", () => {
    const prevHealth = ship.health;
    ship.hit();
    expect(ship.health).toBeLessThan(prevHealth);
  });
});

describe("isSunk()", () => {
  it("sink when health reaches 0", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("setPos()", () => {
  it("sets the row and col positions of the ship's parts / horizontal (default)", () => {
    ship.setPos(4, 4);
    ship.parts.forEach((p, i) => {
      expect([p.row, p.col]).toEqual([4, 4 + i]);
    });
  });

  it("sets the row and col positions of the ship's parts / vertical", () => {
    ship.toggleOrientation(); // toggles from horizontal to vertical
    ship.setPos(4, 4);
    ship.parts.forEach((p, i) => {
      expect([p.row, p.col]).toEqual([4 + i, 4]);
    });
  });
});
