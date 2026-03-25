import { Gameboard, Cell } from "../classes/Gameboard.js";
import { Ship } from "../classes/Ship.js";

let gb;
beforeEach(() => {
  gb = new Gameboard();
});

describe("instantiation", () => {
  it("generate a 2d array", () => {
    expect(gb.grid).toBeInstanceOf(Array);

    for (let x = 0; x < gb.grid.length; x++) {
      expect(gb.grid[x]).toBeInstanceOf(Array);
    }
  });

  it("fill each coordinates with an instance of Cell class", () => {
    for (let x = 0; x < gb.grid.length; x++) {
      for (let y = 0; y < gb.grid[x].length; y++) {
        expect(gb.grid[x][y]).toBeInstanceOf(Cell);
      }
    }
  });
});

describe("deploy()", () => {
  it("deploy a ship on a coorinates / horizontally", () => {
    const ship = new Ship(3);
    gb.deploy(ship, 4, 4);
    expect(gb.grid[4][4].ship).toBeInstanceOf(Ship);
    expect(gb.grid[4][5].ship).toBeInstanceOf(Ship);
    expect(gb.grid[4][6].ship).toBeInstanceOf(Ship);
  });

  it("throws an error when placing a ship on an already occupied cell", () => {
    const ship = new Ship(3);
    const ship1 = new Ship(3);
    gb.deploy(ship, 4, 4);
    expect(() => gb.deploy(ship1, 4, 4)).toThrow();
  });

  it("doesn't throw when placing multiple ships on separate unoccupied cells", () => {
    const ship = new Ship(3);
    const ship1 = new Ship(3);
    gb.deploy(ship, 4, 4);
    expect(() => gb.deploy(ship1, 5, 5)).not.toThrow();
  });
});

describe("receiveAttack()", () => {
  it("destroy the target coordinates", () => {
    gb.receiveAttack(4, 4);
    expect(gb.grid[4][4].destroyed).toBe(true);
  });

  it("increase hits by 1 when hitting a ship", () => {
    let prevHits = gb.state.hits;
    const ship = new Ship(3);
    gb.deploy(ship, 4, 4);

    // first attack
    gb.receiveAttack(4, 4);
    expect(gb.state.hits - prevHits).toBe(1);

    // second attack
    prevHits = gb.state.hits; // update prevHits
    gb.receiveAttack(4, 5);
    expect(gb.state.hits - prevHits).toBe(1);
  });

  it("increase hits by 1 when hitting a ship", () => {
    let prevMisses = gb.state.misses;

    // first attack
    gb.receiveAttack(4, 4); // no ships deployed, this should miss
    expect(gb.state.misses - prevMisses).toBe(1);

    // second attack
    prevMisses = gb.state.misses; // update prevMisses
    gb.receiveAttack(4, 5); // no ships deployed, this should miss
    expect(gb.state.misses - prevMisses).toBe(1);
  });

  it("throws when attacking already destroyed cell", () => {
    gb.receiveAttack(4, 4);
    expect(() => gb.receiveAttack(4, 4)).toThrow();
  });

  it("increase the sunkenShips count when a ship has been destroyed", () => {
    const ship = new Ship(3);
    const ship1 = new Ship(3);
    gb.deploy(ship, 4, 4);
    gb.deploy(ship1, 5, 4);

    let prevSunken = gb.state.sunkenShips;

    // first destroy
    gb.receiveAttack(4, 4);
    gb.receiveAttack(4, 5);
    gb.receiveAttack(4, 6);
    expect(gb.state.sunkenShips - prevSunken).toBe(1);

    // second destroy
    prevSunken = gb.state.sunkenShips; // update prevSunken
    gb.receiveAttack(5, 4);
    gb.receiveAttack(5, 5);
    gb.receiveAttack(5, 6);
    expect(gb.state.sunkenShips - prevSunken).toBe(1);
  });
});
