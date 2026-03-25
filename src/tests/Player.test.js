import { Player } from "../classes/Player";

let p1;
let p2;
beforeEach(() => {
  p1 = new Player("playerOne");
  p2 = new Player("playerTwo", true); // p2 is a computer
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("attack()", () => {
  it("attacks target's board", () => {
    let receiveAttackSpy = jest.spyOn(p2.board, "receiveAttack");

    p1.attack(p2, 4, 4);
    expect(receiveAttackSpy).toHaveBeenCalled();
  });
});
