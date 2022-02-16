// coins,boxex,score,cloud(problem)
var ground, groundImage;
var iground;
var mario, marioStandingImage, marioAnimation, marioAttacked, marioJumping;
var gameState = 1;
var bowser;
var turtle;
var obstaclesGroup;
var cloud1;
var cloud2;
var cloud3;
var gameOver, gameOverImage;
var bfirebal_Image;
var backgroundMusic;
var jumpSound;
var gameOverSound;
var platformGroup;
var mysteryBoxGroup;
var platformImage, mysteryBoxImage
var coinImage;
var invisibleMysteryBlock;
var invisibleMysteryBlockGroup;

function preload(){
  groundImage = loadImage("Images/backg.jpg");
  marioStandingAnimation = loadAnimation("Images/Mario/km_0.png");
  marioJumping = loadAnimation("Images/Mario/km_4.png")
  marioAnimation = loadAnimation("Images/Mario/km_4.png","Images/Mario/km_3.png","Images/Mario/km_2.png","Images/Mario/km_1.png")
  bowser = loadAnimation("Images/Bowser/1.png","Images/Bowser/2.png");
  turtle = loadAnimation("Images/Turtle/L1.png","Images/Turtle/L2.png");
  marioAttacked = loadAnimation("Images/Mario/mh.png")
  cloud1 = loadImage("Images/clouds/cloud1.png");
  cloud2 = loadImage("Images/clouds/cloud2.png");
  cloud3 = loadImage("Images/clouds/cloud3.png");
  gameOverImage = loadImage("Images/game over.jpg");
  fireball_Image = loadImage("Images/Fireball.png");
  backgroundMusic = loadSound("Sounds/super-mario-bros-4293.mp3");
  jumpSound = loadSound("Sounds/smb_jump-small.wav");
  gameOverSound = loadSound("Sounds/smb_gameover.wav");
  platformImage = loadImage("Images/Platform/t.png");
  mysteryBoxImage = loadImage("Images/Mystery_Box/Mystery_Box_1.png");
  coinImage = loadImage("Images/coin.png");

}

function setup(){
 createCanvas(displayWidth,displayHeight);
 
 iground = createSprite(0,displayHeight-100,displayWidth,8);
 iground.shapecolor = "black";
 iground.scale = 3;
 iground.visible = false;

 ground = createSprite(0,displayHeight-380,displayWidth,1000);
 ground.addImage("GROUND",groundImage);
 ground.scale = 1.3;
 ground.velocityX = -8; 

 mario = createSprite(displayWidth/2-550,displayHeight-155);
 mario.scale = 1.2;
 mario.addAnimation("Running",marioAnimation);
 mario.addAnimation("Standing",marioStandingAnimation);

 gameOver = createSprite(displayWidth/2,displayHeight/2,100,100)
 gameOver.scale = 1;
 gameOver.addImage("GAMEOVER",gameOverImage);

 

 obstaclesGroup = new Group();
 cloudsGroup = new Group();
 mysteryBoxGroup = new Group();
 platformGroup = new Group();
 invisibleMysteryBlockGroup = new Group();
 
}

function draw(){
  background("lightblue");

  gameOver.visible = false;

if(mario.x<10){
  mario.x = displayWidth/2-550
}

  if(gameState==1){
   if(keyDown("space")&& mario.y>300){
     mario.velocityY=-13;
     mario.changeAnimation("MARIO_ANIMATION",marioAnimation);
     mario.addAnimation("JUMPING",marioJumping);
     jumpSound.play();
     //backgroundMusic.play();
   }
   
   if(mario.isTouching(invisibleMysteryBlockGroup)){
     
   }

   if(mario.isTouching(platformGroup)){
     mario.velocityY = 0;
     mario.changeAnimation("Standing",marioStandingAnimation);
     mario.x = platformGroup[0].x;
   }
   else{
     mario.changeAnimation("Running",marioAnimation)
   }

   spawnObstacles();
   spawnClouds();
   platform();

   mario.velocityX = 0;
   ground.velocityX = -8;
   mario.velocityY+=0.8

   if(ground.x<0){
    ground.x=ground.width/2
   }

   if(frameCount% 200 == 0){
    var fire_ball = createSprite(displayWidth+500,displayHeight-135,20,20);
    fire_ball.scale = 0.5;
    fire_ball.addImage("fire_balle",fireball_Image)
    fire_ball.velocityX = -20;
    fire_ball.lifetime = 1000;
   }

   mario.collide(iground);   

   if(mario.isTouching(obstaclesGroup)){
    gameState = 2;
    cloudsGroup.velocityX = -1000;
    
   }
  }

  if(gameState === 2){
   ground.velocityX = 0;
   gameOverSound.play();
   iground.x = displayWidth;
   cloudsGroup.velocityX = -50;
   gameOver.visible = true;
   cloudsGroup.depth = gameOver.depth+1;
  }

  drawSprites();
}

function spawnObstacles(){
  
  if(frameCount% 160 == 0){
   var obstacle = createSprite(displayWidth,displayHeight-135,20,20);
   obstacle.debug=false;
   var rand = Math.round(random(0,1));
   switch(rand){
    case 0 : 
            obstacle.addAnimation("BOWSER",bowser);
            break;
    case 1 :
            obstacle .addAnimation("TURTLE",turtle);
            break;
     }

    obstacle.velocityX = -10;
    obstacle .lifetime = 1000;
    obstaclesGroup.add(obstacle);
        
    }
}

function spawnClouds(){
  if(frameCount% 150 == 0){
   var cloud = createSprite(displayWidth+100,Math.round(random(displayHeight-700,displayHeight-250)),20,20);
   var ran = Math.round(random(0,1,2));
   switch(ran){
    case 0 : 
            cloud.addImage("small",cloud1);
            break;
    case 1 :
            cloud .addImage("medium",cloud2);
            break;
    case 2 :
            cloud .addImage("large",cloud3);
            break;         
    }

    cloud.velocityX = -5;
    cloud.lifetime = 1000;
    cloudsGroup.add(cloud);
  }
}

function platform(){
  if(frameCount% 150 == 0){
    var platform = createSprite(displayWidth+100,Math.round(random(displayHeight-500,displayHeight-250)),20,20);
    var ran = Math.round(random(0,1));
    switch(ran){
     case 0 : 
             platform.addImage("Platform",platformImage);

             platformGroup.add(platform);

             break;
     case 1 :
             platform.addImage("Mystery Box",mysteryBoxImage);

             invisibleMysteryBlock = createSprite(platform.x,platform.y+30,50,20);
             invisibleMysteryBlock.velocityX = -5;

             invisibleMysteryBlockGroup.add(invisibleMysteryBlock);

             mysteryBoxGroup.add(platform);

             break;
           
     }
 
     
 console.log(platform.x);

     platform.velocityX = -5;
     platform.lifetime = 1000;

     //drawSprites();
     
    }
}