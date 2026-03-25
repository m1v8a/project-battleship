import { Ship, HORIZONTAL, VERTICAL } from "../classes/Ship";

let ship;
beforeEach(() => {
  ship = new Ship(3);
});

describe("hit()", () => {
  it("increase the hitsReceived by 1", () => {
    const prevHitReceived = ship.hitsReceived;
    ship.hit();
    expect(ship.hitsReceived - prevHitReceived).toBe(1);
  });
});

describe("toggleOrientation()", () => {
  it("toggles the ship's orientation", () => {
    ship.toggleOrientation(); // the default is HORIZONTAL
    expect(ship.orientation).toBe(VERTICAL);
  });
});

describe("isSunk()", () => {
  it("doesn't sunk the ship as long as it doesn't receive enough hits", () => {
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  it("sunk the ship after receiving enough hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
