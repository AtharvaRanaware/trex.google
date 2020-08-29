//for paddle bounce off
//function explosion() { ball.velocityY=random(-8,8); }


var trex,trex_running;
var ground,groundImage;
var invisibleGround;
var cloudImg,CloudsGroup;
var count=0;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,ObstaclesGroup;   
var PLAY=1
var END=0
var gameState=PLAY


function preload() {
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
groundImage=loadImage("ground2.png");

cloudImg=loadImage("cloud.png")
  
  obstacle1=loadImage("obstacle1.png");
  
  obstacle2=loadImage("obstacle2.png");
  
  obstacle3=loadImage("obstacle3.png");
  
  obstacle4=loadImage("obstacle4.png");
  
  obstacle5=loadImage("obstacle5.png");
  
  obstacle6=loadImage("obstacle6.png");
  
  
}









function setup() {
  createCanvas(600, 200);
  
  trex=createSprite(50,170,20,10);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5
  
  
  ground=createSprite(200,180,400,20);
  ground.addImage(groundImage);
  
  invisibleGround=createSprite(200,190,400,10);
  invisibleGround.visible=false;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
  
  
}

function draw() {
  background(180);
  // console.log(trex.y);
  
  text("Score: "+ count, 450, 50);
  //console.log(World.frameCount);
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+Math.round(getFrameRate()/60);
    
    
    if (count>0 && count%100 === 0){
      //playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 161){
      trex.velocityY = -13 ;
     // playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    //gameOver.visible = true;
    //restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   // trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  
   trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 70 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (4 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    
    switch(rand){
     
      case 1:obstacle.addImage(obstacle1)
            break ;
        
      case 2:obstacle.addImage(obstacle2)
      break ;
            
      case 3:obstacle.addImage(obstacle3)
      break ;
      
      case 4:obstacle.addImage(obstacle4)
      break ;
      
      case 5:obstacle.addImage(obstacle5)
      break ;
       
      case 6:obstacle.addImage(obstacle6)
       break ;
      
         default :break;   
            
        
    }
    
    //obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}








function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
