// class for enemies
class Enemy {
  constructor(x, y) {
    // position
    this.pos = createVector(x, y);
    // character properties
    this.char = char;
    // radius
    this.r = cellSize;
    // speed of enemy
    this.speed = random(0.5, 3);
    // health of enemy
    this.health = 100;
  }

  draw() {
    // drawing enemy
    image(enemyGraphics, this.pos.x, this.pos.y, this.r, this.r);
  }

  update() {
    // movement vector
    let mvVel = createVector(0, 0);

    // searching character location
    if(this.pos.x < this.char.x - this.r/3.5) {
      mvVel.x  = this.speed;
    } else if(this.pos.x > this.char.x + this.r/3.5) {
      mvVel.x  = -this.speed;
    }

    if(this.pos.y < this.char.y - this.r/3.5) {
      mvVel.y  = this.speed;
    } else if(this.pos.y > this.char.y + this.r/3.5) {
      mvVel.y  = -this.speed;
    }

    // kill character
    let d = dist(this.pos.x, this.pos.y, this.char.x, this.char.y);
    if(d < this.r/2) {
      this.char[0].health-=0.1;
    }

    // position of enemy
    let position = createVector(this.pos.x + this.r/3, this.pos.y + this.r/3);
    position.add(mvVel);

    // collision detection
    let collisionID = floorMap[floor((position.y/cellSize))][floor((position.x/cellSize))];

    // movement after collision detection
    switch(collisionID) {
      case 1:
        this.pos.x += mvVel.x;
        this.pos.y += mvVel.y;
        break;
      case 0:
        break;
    }
  }
}