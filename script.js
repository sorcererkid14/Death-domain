// horizontal
let mapRows = 16; 
// vertical
let mapColumns = 12;
// Size of the cell
let cellSize;
// Offset from corner of screen
let offSet = 50;
// Backgroud image
let bg;
// tilemaps
let img;
let img1;
// characters
let mapSize;

// graphics for different characters
let charGraphics;
let charGraphics1;
let charGraphics2;
let charGraphics3;
let charGraphics4;
let charGraphics5;
let charGraphics6;

// current character
let char = [];

// select characters
let characterGraphics = 0;

// Enemy variables
let enemyGraphics;
let enemy = [];

// bullet variable
let bullet = [];

// Settings variables
let t1;
let t2;
let t3;
let t4;
let arrow1;
let arrow2;
let arrow3;
let arrow4;

// controls for character
let con1 = true;
let con2 = false;

// spawn collision of enemy
let spawnCollision;

// score
let score = 0;

function setup() {
  // setting canvas properties
  let w = windowWidth;
  let h = windowHeight;
  let canvas = createCanvas(w, h);
  canvas.style('display', 'block');
  canvas.position(0, 0, 'fixed');

  // Properties of shapes
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  textFont('Algerian');

  // buttons at each screen
  callButtons();
  
  // Cellsize after drawing map
  cellSize = floor(min(width/mapRows * 4, height/mapColumns * 4));

  // adding the character
  charGraphics = charGraphics1;
  charPush();
}

// mousePressed on buttons
function mousePressed() {
  for(b of buttons) {
    b.clicked();
  }
}
  
function draw() {
  // background
  image(bg, width/2, height/2, width, height);

  // changing screens
  switch(gameMode) {
    case 'menu':
      drawMenu();
      break;
    case 'play':
      drawGame();
      break;
    case 'pause':
      drawPause();
      break;
    case 'character':
      drawCharacter();
      break;
    case 'leaderBoard':
      drawLeaderBoard();
      break;
    case 'settings':
      drawSettings();
      break;
  }

// rendering buttons
  for(b of buttons) {
    b.render();
  }
  
}

// Pause menu from 'P' buttton
function keyPressed() {
  if(keyCode == 80) {
    if(gameMode == 'play') {
      gameMode = 'pause';
      buttons = pauseButtons;
    } else if(gameMode == 'pause') {
      gameMode = 'play';
      buttons = gameButtons;
    }
  }
}

// Menu screen
function drawMenu() {
  title();
}

// My Character screen
function drawCharacter() {
  title();

  stroke(255);
  fill(255, 255, 255, 50);
  rect(width/3-width/100, height/2-height/100, cellSize, cellSize);
  
  // Changing characters
  switch(characterGraphics) {
    case 0:
      image(charGraphics1, width/3, height/2, cellSize*2, cellSize*2);
      break;
    case 1:
      image(charGraphics2, width/3, height/2, cellSize*2, cellSize*2);
      break;
    case 2:
      image(charGraphics3, width/3, height/2, cellSize*2, cellSize*2);
      break;
    case 3:
      image(charGraphics4, width/3, height/2, cellSize*2, cellSize*2);
      break;
    case 4:
      image(charGraphics5, width/3, height/2, cellSize*2, cellSize*2);
      break;
    case 5:
      image(charGraphics6, width/3, height/2, cellSize*2, cellSize*2);
      break;
  }

  if(characterGraphics == 6) {
    characterGraphics = 0;
  }
}

function selectChar() {
  // selecting characters
  switch(characterGraphics) {
    case 0:
      charGraphics = charGraphics1;
      break;
    case 1:
      charGraphics = charGraphics2;
      break;
    case 2:
      charGraphics = charGraphics3;
      break;
    case 3:
      charGraphics = charGraphics4;
      break;
    case 4:
      charGraphics = charGraphics5;
      break;
    case 5:
      charGraphics = charGraphics6;
      break;
  }
}

// leaderboard screen
function drawLeaderBoard() {
  title();
  push();
  fill(255);
  textSize(width/50);
  text('COMING SOON...', width/2, height/2);
  pop();
}

// Game screen
function drawGame() {

  background(0);
  push();

  // Adding character
  if(char.length == 0) {
    charPush();
  }

  char.x = char[0].pos.x;
  char.y = char[0].pos.y;

  // Adding enemies
  if(enemy.length < 5) {
    for(let i = 0; i<1; i++) {
      enemyPush();
    }
  }
  
  // moving screen with character 
  translate(width/2, height/2);
  translate(-char[0].pos.x, -char[0].pos.y);
  
  // Drawing each cell
  for(let y = 0; y<mapRows; y++) {
    for(let x = 0; x<mapColumns; x++) {
      stroke(0);
      fill('black');
      rect(x*cellSize + offSet, y*cellSize + offSet, cellSize, cellSize);
      switch(floorMap[y][x]){
        case 0:
          fill('black');
          image(img1, x * cellSize + offSet, y * cellSize + offSet, cellSize, cellSize);
          break;
        case 1:
          image(img2, x * cellSize + offSet, y * cellSize + offSet, cellSize, cellSize);
          break;
        case 2:
          break;
      }
    }
  }

  // Firing bullets
  if(mouseIsPressed === true) {
    if(mouseButton === LEFT) {
      push();
      let targetAngle = atan2(mouseY-height/2, mouseX-width/2);
      let l1 = cellSize * (mapRows);
      let l2 = cellSize * (mapColumns);
      
      bullet.push(new Bullet(char.x + cos(targetAngle) * l1, char.y + sin(targetAngle) * l2, char.x, char.y));
      pop();
    }
  }

  // methods for classes
  for(c of char) {
    c.show();
    c.update();
  }

  for(e of enemy) {
    e.draw();
    e.update();
  }

  for(b of bullet) {
    b.show();
    b.update();
  }


  // function to kill enemy
  killEnemy();
  // function to kill character
  killChar();
  
  pop();
}

// function to kill enemy and add score
function killEnemy() {
  for(let i = 0; i < enemy.length; i++) {
    for(let j = 0; j < bullet.length; j++) {
      if(enemy.indexOf(enemy[i]) != -1) {
        let d = dist(bullet[j].x2, bullet[j].y2, enemy[i].pos.x, enemy[i].pos.y);
        if(d < enemy[i].r/6) {
          let remove = bullet.indexOf(j);
          bullet.splice(remove, 1);
          enemy[i].health-=2;
          if(enemy[i].health == 0) {
            enemy.splice(i, 1);
            score = score + 1;
          }
        }
      }
    }
  }
}

function killChar() {
  let charHealth = char[0].health;
  if(floor(charHealth) == 0) {
    char.pop();
    enemyPop();
  }
}

// pause screen
function drawPause() {
  title();
}

// settings screen
function drawSettings() {
  title();
  // controls for character
  t1 = 'w';
  t2 = 'a';
  t3 = 's';
  t4 = 'd';
  
  push();
  
  fill(0, 0, 0, 150);
  rect(width/2 + width/4, height/3+height/16, width/25, height/12);
  rect(width/2 + width/4.75, height/3+height/7, width/25, height/12);
  rect(width/2 + width/4, height/3+height/7, width/25, height/12);
  rect(width/2 + width/3.45, height/3+height/7, width/25, height/12);
  
  textFont('Algerian');
  textSize(width/30);
  stroke(255);
  
  if(con1) {
    t1 = 'W';
    t2 = 'A';
    t3 = 'S';
    t4 = 'D';
    text(t1, width/2 + width/4, height/2-height/13);
    text(t2, width/2 + width/4.75, height/3+height/6);
    text(t3, width/2 + width/4, height/3+height/6);
    text(t4, width/2 + width/3.45, height/3+height/6);
  } else if(con2) {
    t1 = '';
    t2 = '';
    t3 = '';
    t4 = '';
    image(arrow1, width/2 + width/4, height/2-height/10, width/40, height/20);
    image(arrow2, width/2 + width/4.75, height/2-height/60, width/40, height/20);
    image(arrow3, width/2 + width/4, height/2-height/70, width/40, height/20);
    image(arrow4, width/2 + width/3.45, height/2-height/60, width/40, height/20);
  }
  
  pop();
}

function changeControls() {
  if(con1) {
    con1 = false;
    con2 = true;
  } else if(con2) {
    con1 = true;
    con2 = false;
  }
}

// function to add character
function charPush() {
  char.push(new Char(cellSize * 1.25, cellSize * 1.25, cellSize/1.5));
}

// function to add enemy
function enemyPush() {
  let a = random(0, (mapRows-3)*cellSize);
  let b = random(0, (mapColumns-1)*cellSize);

  let positionEnemy = createVector(a + cellSize*2, b + cellSize*2);

  spawnCollision = floorMap[floor((positionEnemy.y/cellSize)-0.1)][floor((positionEnemy.x/cellSize)-0.15)];

  switch(spawnCollision) {
    case 1:
      enemy.push(new Enemy(positionEnemy.x, positionEnemy.y));
      break;
    case 0:
      return;
      break;
    case undefined:
      return;
      break;
  }  
}

// function to remove enemies
function enemyPop() {
  for(let i = 0; i<= enemy.length +10; i++) {
    enemy.pop();
  }
}

// funciton to remove bullets
function bulletPop() {
  for(let i = 0; i<= bullet.length; i++) {
    bullet.pop();
  }
}

// function for title on each screen
function title() {
  fill(255, 0, 0);
  stroke(0);
  textSize(width/12);
  text('DEATH DOMAIN', width/2, height/6);
}