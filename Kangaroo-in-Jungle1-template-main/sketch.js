/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;
var gameState;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(400, 250, 20, 20);
  kangaroo.addAnimation("run", kangaroo_running);
  kangaroo.scale = 0.2;

  ground = createSprite(400,400,800);
  isStatic: true;
  ground.visible = false


  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);

  
  kangaroo.x = camera.position.x - 250;

  if (gameState === 1) {
    jungle.velocityX = -10
    if(jungle.x<50)
    {
       jungle.x=400
    }
    spawnShrubs();

    console.log(kangaroo.y)
    if(keyDown("space")&& kangaroo.y === 250) {
      kangaroo.velocityY = -16;

    }

    if(shrubsGroup.isTouching(kangaroo)){
      shrubsGroup.destroyEach();
    }
  }

  drawSprites();

}

function spawnShrubs() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {

    var shrub = createSprite(camera.position.x+500,330,40,10);

    shrub.debug=false;
    shrub.velocityX = -(9 + 3*score/100)
    shrub.scale = 0.06;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
    shrub.lifetime = 400;
  }
}