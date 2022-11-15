// function to create buttons
function callButtons() {

  textFont('Algerian');
  textSize(width/50);

  // buttons in menu screen
  menuButtons = [
    new Button("PLAY", width/2, height/2 - height/6, width/3, height/12, () => {gameMode = 'play'; buttons = gameButtons; enemy.push(new Enemy(cellSize*(mapRows-3), cellSize*(mapColumns-1))) ; bulletPop()}),
    new Button("MY CHARACTER", width/2, height/2 - height/15, width/3, height/12, () => {gameMode = 'character'; buttons = charButtons}),
    new Button("LEADERBOARD", width/2, height/2 + height/35, width/3, height/12,() => {gameMode = 'leaderBoard'; buttons = leadButtons}),
    new Button('SETTINGS', width/2, height/2 + height/8, width/3, height/12, () => {gameMode = 'settings'; buttons = settingsButtons}),
    new Button('LOGIN', width/2 - width/8, height/2 + height/4, width/5, height/12, () => {}),
    new Button('SIGNUP', width/2 + width/8, height/2 + height/4, width/5, height/12, () => {})
  ]

  // buttons in my character screen
  charButtons = [
    new Button('MAIN MENU', width/1.3, height/2 + height/4, width/3, height/12, () => {gameMode = 'menu'; buttons = menuButtons}),
    new Button('CHANGE CHARACTER', width/1.3, height/2 - height/10, width/3, height/12, () => {characterGraphics++}),
    new Button('SELECT CHARACTER', width/1.3, height/2 + height/12, width/3, height/12, () => {selectChar()})
  ]

  // buttons in leaderboard screen
  leadButtons = [
    new Button('MAIN MENU', width/2, height/2 + height/10, width/3, height/12, () => {gameMode = 'menu'; buttons = menuButtons}),
  ]

  // buttons in game screen
  gameButtons = [
    new Button("", width - 60, 60, 50, 50, () => {gameMode = 'pause'; buttons = pauseButtons})
  ]

  // buttons in pause screen
  pauseButtons = [
    new Button('RESUME', width/2, height/2 - height/6, width/3, height/12, () => {gameMode = 'play'; buttons = gameButtons}),
    new Button('QUIT', width/2, height/2 + height/8, width/3, height/12, () => {gameMode = 'menu'; buttons = menuButtons ; char.pop() ; enemyPop() ; bulletPop()}),
    new Button('SETTINGS', width/2, height/2 - height/16, width/3, height/12, () => {gameMode = 'settings'; buttons = settingsButtons2}),
  ]

  // buttons in settings screen
  settingsButtons = [
    new Button('CHANGE CONTROLS', width/2, height/3 + height/7, width/3, height/12, () => {changeControls()}),
    new Button('MAIN MENU', width/2, height/2 + height/7, width/3, height/12, () => {gameMode = 'menu'; buttons = menuButtons}),
  ]

  settingsButtons2 = [
    new Button('CHANGE CONTROLS', width/2, height/3 + height/7, width/3, height/12, () => {changeControls()}),
    new Button('BACK', width/2, height/2 + height/10, width/3, height/12, () => {gameMode = 'pause'; buttons = pauseButtons})
  ]
  buttons = menuButtons;
}