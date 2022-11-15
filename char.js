// class for character
class Char {
  constructor(x, y, r) {
    // position of character
    this.pos = createVector(x, y);
    // radius of character 
    this.r = r;
    // health of character
    this.health = 100;
  }

  show() {
    // drawing character
    image(charGraphics, this.pos.x, this.pos.y, this.r*2, this.r*2);
    
    // angle of rotation for gun
    let targetAngle = atan2(mouseY-height/2, mouseX-width/2);
    let l = cellSize/6;
    stroke(255);
    line(this.pos.x, this.pos.y, this.pos.x + cos(targetAngle) * l, this.pos.y + sin(targetAngle) * l);

    // health bar
    push();
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y + height/3, this.health * 4, 30);
    pop();

    // score of character
    push();
    textSize(30);
    textFont('calibri');
    fill(255);
    text(score, this.pos.x + width/4, this.pos.y - height/3);
    pop();
  }
  
  update() {

    // movement vector
    let mvVel = createVector(0, 0);

    // movement vector changing after key pressed
    if(con1) {
      // W
      if(keyIsDown(87)) {
        mvVel.y = -6;
      }
      // S
      if(keyIsDown(83)) {
        mvVel.y = 6;
      }
      // A
      if(keyIsDown(65)) {
        mvVel.x = -6;
      }
      // D
      if(keyIsDown(68)) {
        mvVel.x = 6;
      }
    } else if(con2) {
      // W
      if(keyIsDown(UP_ARROW)) {
       mvVel.y = -6;
      }
      // S
      if(keyIsDown(DOWN_ARROW)) {
        mvVel.y = 6;
      }
      // A
      if(keyIsDown(LEFT_ARROW)) {
        mvVel.x = -6;
      }
      // D
      if(keyIsDown(RIGHT_ARROW)) {
        mvVel.x = 6;
      }
    }

    // position of character with radius
    let position = createVector(this.pos.x + this.r/2, this.pos.y + this.r/2);
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