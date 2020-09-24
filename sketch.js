var PLAY = 1;
var END = 0;
var gameState = PLAY;
var mario_runningImage, mario;
var game_Over, gameOverImage;
var obstacle, obstacleImage, obstacleGroups;
var coin, coinImage, coinGroups;
var jumpImage, jump;
var theme, backgroundImage;
var invisibleGround;
var score = 0;
var gameOver,gameOverImage;
var retsart,restartImage;
var jumpingSound,gameOverSound;
var deathImage;
var reset;

function preload() {
  mario_runningImage = loadAnimation("mario1.png", "mario2.png", "mario3.png", "mario4.png", "mario5.png", "mario6.png", "mario7.png", "mario8.png", "mario9.png", "mario10.png", "mario11.png", "mario12.png");

backgroundImage=loadImage("mario_background.png");
obstacleImage = loadImage("plant.png");
coinImage = loadImage("coin.png");
jumpImage = loadImage("mario jump.png");
gameOverImage = loadImage("game over.png");
restartImage = loadImage("play again.png");
deathImage = loadImage("death2.png");
  
jumpingSound = loadSound("jumpSound.mp3");
gameOverSound = loadSound("gameover.mp3");
}

function setup() {

  createCanvas(600, 400);

theme = createSprite(310, 130, 500, 400);
theme.addImage("theme", backgroundImage);
theme.scale = 0.7;

mario = createSprite(40, 375, 20, 40);
mario.addAnimation("running", mario_runningImage);
mario.addAnimation("die", deathImage);
mario.scale = 0.2;

invisibleGround = createSprite(270, 380, 600, 10);
invisibleGround.visible = false;

gameOver = createSprite(300,100);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.2;
  
restart = createSprite(300,250);
restart.addImage(restartImage);
restart.scale = 0.2;
  
  obstacleGroups = new Group();
  coinGroups = new Group();
  
}

function draw() {
  background(0);
  text("Score: " + score,550,10);

 if(gameState === PLAY){
  
   gameOver.visible = false;
   restart.visible = false;
   
   theme.velocityX = -12
  score = score + Math.round(getFrameRate()/60);

  if (theme.x < 0) {
    theme.x = theme.width /6
  }
   mario.velocityY = mario.velocityY + 0.6 
   
  spawnCoins();
  spawnObstacles();

  if (keyDown("space") && mario.y >= 300) {
    mario.velocityY = -12 
    jumpingSound.play();
  }
   
   if(mario.isTouching(coinGroups)){
    coinGroups.destroyEach();
    score = score + 30;
   }
   
   if (mario.isTouching(obstacleGroups)){
     gameOverSound.play();
     gameState = END;
   }
 }

  else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    mario.changeImage("die",deathImage);
    mario.scale = 0.4;
    theme.velocityX = 0;
    mario.velocityY = 0;
    obstacleGroups.setLifetimeEach(-1);
    obstacleGroups.setVelocityXEach(0);
    coinGroups.setLifetimeEach(-1);
    coinGroups.setVelocityXEach(0);
  }


  mario.collide(invisibleGround);
    if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroups.destroyEach();
  coinGroups.destroyEach();
mario.changeAnimation("running", mario_runningImage);
  mario.scale = 0.2
  score = 0;
  

}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(550, 355, 30, 27);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 90
    obstacleGroups.add(obstacle);
  }
}

function spawnCoins() {
  if (frameCount % 80 === 0) {
    coin = createSprite(550, 200, 30, 65);
    coin.velocityX = -6;
    coin.addImage(coinImage);
    coin.scale = 0.1 / 2;
    coin.lifetime = 90;
    coinGroups.add(coin);
  }
}