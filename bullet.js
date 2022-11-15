// class for bullets
class Bullet {
  constructor(x, y, x2, y2) {
    // position
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    // speed of bullets
    this.speed = 7;
    // size of bullets
    this.r = 5;
    // position of character
    this.char = char;
    // this.enemy = eachEnemy;
  }

  show() {
    // graphics of bullets
    push();
    stroke(255);
    strokeWeight(5);
    ellipse(this.x2, this.y2, this.r, this.r);
    // console.log(this.enemy.x);
    pop();
  }

  update() {
    // movement vector of bullets
    let mvVel = createVector(0, 0);
    // moving movement vector of bullets
      if(this.x < this.x2) {
        mvVel.x = -this.speed;
      } 
      if(this.x > this.x2) {
        mvVel.x = this.speed;
      }
      if(this.y < this.y2) {
        mvVel.y = -this.speed;
      }
      if(this.y > this.y2) {
        mvVel.y = this.speed;
      }

    // position of bullets
    let position = createVector(this.x2, this.y2);
    position.add(mvVel);

    // collision detection of bullets with walls
    let collisionID = floorMap[floor((position.y/cellSize)+0.3)][floor((position.x/cellSize)+0.3)];

    // movement after collision detection
    switch(collisionID) {
      case 1: 
        this.x2 += mvVel.x;
        this.y2 += mvVel.y;
        break;
      case 0:
        bulletRem(this);
        break;
    }
  }
}

// function to remove bullets - used when bullets hits walls
function bulletRem(id) {
  let remove = bullet.indexOf(id);
  bullet.splice(remove, 1);
}