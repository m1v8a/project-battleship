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
