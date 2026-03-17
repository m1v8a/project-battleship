export class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
  }

  hit() {
    this.health -= 1;
  }

  isSunk() {
    return this.health <= 0;
  }
}
