import { Ship } from "../classes/Ship.js";

let ship;
beforeEach(() => {
  ship = new Ship(3);
});

describe("build ship", () => {
  it("build the ships body parts", () => {
    expect(ship.length).toBe(3);
    expect(ship.body.length).toBe(3);

    const s2 = new Ship(4);
    expect(s2.length).toBe(4);
    expect(s2.body.length).toBe(4);
  });
});

describe("ship.hit()", () => {
  it("should decrease health by 1", () => {
    const prevHealth = ship.health;
    ship.hit();
    expect(ship.health).toBeLessThan(prevHealth);
  });
});

describe("ship.isSunk()", () => {
  it("returns true if the ship's health reaches 0", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  it("returns fals if the ship's health is greater than 0", () => {
    expect(ship.isSunk()).toBeFalsy();
  });
});

describe("setPos()", () => {
  it("set a row and col on each body parts of the ship / horizontal (default)", () => {
    ship.setPos(4, 4);

    expect([ship.body[0].row, ship.body[0].col]).toEqual([4, 4]);
    expect([ship.body[1].row, ship.body[1].col]).toEqual([5, 4]);
    expect([ship.body[2].row, ship.body[2].col]).toEqual([6, 4]);
  });

  it("set a row and col on each body parts of the ship / vertical", () => {
    ship.toggleOrientation(); // toggles from horizontal to vertical
    ship.setPos(4, 4);

    expect([ship.body[0].row, ship.body[0].col]).toEqual([4, 4]);
    expect([ship.body[1].row, ship.body[1].col]).toEqual([4, 5]);
    expect([ship.body[2].row, ship.body[2].col]).toEqual([4, 6]);
  });
});
