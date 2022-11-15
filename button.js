// current buttons
let buttons;
// storage for buttons in each screen
let pauseButtons = [];
let menuButtons = [];
let gameButtons = [];
let charButtons = [];
let leadButtons = [];
let settingsButtons = [];
let settingsButtons2 = [];
// game mode
let gameMode = 'menu';

// class for buttons
class Button {
  constructor(text, x, y, w, h, click) {
    // position
    this.x = x;
    this.y = y;
    // text on button
    this.text = text;
    // size of button
    this.width = w;
    this.height = h;
    // function of button
    this.click = click;
    // if button is working
    this.enabled = true;
  }

  render() {
    rectMode(CENTER);
    textAlign(CENTER);

    push();
    // graphics of buttons
    fill(0, 0, 0, 150);
    
    stroke(255);
    if(mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      // stroke(0);
      fill(255, 0, 0, 150);
      strokeWeight(2);
    }
    
    rect(this.x, this.y, this.width, this.height);
    noFill();
    textSize(width/40);
    text(this.text, this.x, this.y + 10);
    pop();
  }

  // checking if button is clicked on
  clicked() {
    if(this.enabled) {
      if(mouseX > this.x - this.width/2 && mouseX < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
        this.click();
      }
    }
  }
}
