var bg
var baloonimage
var baloon
var PLAY=1
var END=0
var gameState=PLAY
var score=0



function preload() {
  bg=loadImage("assests/bg.png")
  baloonimage=loadAnimation("assests/balloon1.png","assests/balloon2.png","assests/balloon3.png")
  obstacles1image= loadImage("assests/obsTop1.png")
  obstacles2image= loadImage("assests/obsTop2.png")
  obstacles3image= loadImage("assests/obsBottom1.png")
  obstacles4image= loadImage("assests/obsBottom2.png")
  obstacles5image= loadImage("assests/obsBottom3.png")
  restartimage= loadImage("assests/restart.png")
  gameOverimage= loadImage("assests/gameOver.png")


}
function setup() {

  createCanvas(windowWidth,windowHeight);

  baloon=createSprite(100,400)
  baloon.addAnimation("Baloon",baloonimage)
  baloon.scale=0.4

  obsTopgroup=createGroup();
  obsBottomgroup=createGroup();

  restart= createSprite(730,400)
  restart.addImage(restartimage)
  restart.visible=false
  gameOver= createSprite(730,500)
  gameOver.addImage(gameOverimage)
  gameOver.visible=false


  

}
function draw() {

  background(bg);
  textSize(30)
  fill("green")
  text("Score : "+score,30,30)
  
  
  if(gameState===PLAY){
  if(keyDown("space")){
    baloon.velocityY=-4
  }
  baloon.velocityY+=2

  obstaclesTop();
  obstaclesBottom();

  if(obsTopgroup.isTouching(baloon)||obsBottomgroup.isTouching(baloon)){
    gameState=END
  }

  score=Math.round(score+frameCount/300)
  

}

if(gameState===END){
baloon.velocityX=0
baloon.velocityY=0

obsTopgroup.setVelocityXEach(0)
obsBottomgroup.setVelocityXEach(0)

obsTopgroup.setLifetimeEach(-1)
obsBottomgroup.setLifetimeEach(-1)

restart.visible=true
gameOver.visible=true

if(mousePressedOver(restart)){
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false

  obsTopgroup.destroyEach();
  obsBottomgroup.destroyEach();

  score=0

  
}


}

  drawSprites();

}
function obstaclesTop() {

  if(frameCount%100===0){
  obsTop=createSprite(windowWidth,windowHeight-600)
  obsTop.scale=0.2
  obsTop.velocityX=-4
  var r=Math.round(random(1,2))
  switch(r){
    case 1:obsTop.addImage(obstacles1image);
    break ;
    case 2: obsTop.addImage(obstacles2image);
    break ;
    default:
    break;

  }

  obsTop.lifetime=350
  baloon.depth=baloon.depth+1

  obsTopgroup.add(obsTop)

  }
}

function obstaclesBottom(){

if(frameCount%150===0){
obsDown=createSprite(windowWidth,windowHeight-60)
obsDown.scale=0.2
obsDown.velocityX=-3
var r=Math.round(random(3,5))
switch(r){
  case 3:obsDown.addImage(obstacles3image);
  break ;
  case 4:obsDown.addImage(obstacles4image);
  break ;
  case 5: obsDown.addImage(obstacles5image);
  break;
  default:
    break;
}

obsDown.lifetime=450
baloon.depth=baloon.depth+1

obsBottomgroup.add(obsDown)

}
}


