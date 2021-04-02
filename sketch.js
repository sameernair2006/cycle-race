var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var select_opp_cyclist,select_obstacle

var pinkplayer,pinkplayerImg,pinkplayercollidedImg
var yellowplayer,yellowplayerImg,yellowplayercollidedImg
var redplayer,redplayerImg,redplayercollidedImg
var pinkplayerGroup,redplayerGroup,yellowplayerGroup

var gameover,gameoverImg

var obstacle1,obstacle1Img,obstacle2Img,obstacle3Img,obstaclesGroup

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  pinkplayerImg = loadAnimation ("opponent1.png","opponent2.png");
  
  pinkplayercollidedImg = loadAnimation ("opponent3.png");
  
  yellowplayerImg = loadAnimation ("opponent4.png","opponent5.png");
  
  yellowplayercollidedImg = loadAnimation ("opponent6.png")
  
  redplayerImg = loadAnimation("opponent7.png","opponent8.png");
  
  redplayercollidedImg = loadAnimation ("opponent9.png");
  
  gameoverImg = loadImage ("gameOver.png");
  
  obstacle1Img = loadImage("obstacle1.png");
  
  obstacle2Img = loadImage("obstacle2.png");
  
  obstacle3Img = loadImage("obstacle3.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage("pathimg",pathImg);
path.velocityX = -(2 + distance/200);

  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("Sahilcollided",mainRacerImg2);
mainCyclist.scale=0.05;
  
  pinkplayerGroup = createGroup();
  
  redplayerGroup = createGroup();
  
  yellowplayerGroup = createGroup();
  
  gameover = createSprite(250,150,10,10);
  gameover.addImage("gameover",gameoverImg);
  gameover.visible = false;
  
  obstaclesGroup = createGroup();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
   distance = distance + Math.round(getFrameRate()/50)
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
    select_opp_cyclist = Math.round(random(1,3))
    
    if(frameCount % 150 === 0){
      
      if(select_opp_cyclist === 1){
        pinkcyclist();
      }
      
      if(select_opp_cyclist === 2){
        redcyclist();
      }
      if(select_opp_cyclist === 3){
        yellowcyclist();
      }
      
    }
  
    select_obstacle = Math.round(random(1,3))
    
    if(frameCount % 200 === 0){
      
      if(select_obstacle === 1){
        obstacle_1();
      }
      
      if(select_obstacle === 2){
        obstacle_2();
      }
      if(select_obstacle === 3){
        obstacle_3();
      }
      
    }
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }//end of if
    
  if(mainCyclist.isTouching(pinkplayerGroup)){
    mainCyclist.changeAnimation("Sahilcollided",mainRacerImg2);
    pinkplayer.changeAnimation("pinkplayercollided",pinkplayercollidedImg);
    
    pinkplayerGroup.setVelocityXEach (0);
    yellowplayerGroup.setVelocityXEach (0);
    redplayerGroup.setVelocityXEach (0);
    obstaclesGroup.setVelocityXEach(0);
    
    gameState = END
  }
    
    if(mainCyclist.isTouching(yellowplayerGroup)){
    mainCyclist.changeAnimation("Sahilcollided",mainRacerImg2);
    yellowplayer.changeAnimation("yellowplayercollided",yellowplayercollidedImg);
    
    pinkplayerGroup.setVelocityXEach (0);
    yellowplayerGroup.setVelocityXEach (0);
    redplayerGroup.setVelocityXEach (0);
      obstaclesGroup.setVelocityXEach(0);
    
    gameState = END
  }
    
    if(mainCyclist.isTouching(redplayerGroup)){
    mainCyclist.changeAnimation("Sahilcollided",mainRacerImg2);
    redplayer.changeAnimation("redplayercollided",redplayercollidedImg);
    
    pinkplayerGroup.setVelocityXEach (0);
    yellowplayerGroup.setVelocityXEach (0);
    redplayerGroup.setVelocityXEach (0);
    obstaclesGroup.setVelocityXEach(0);
    
    gameState = END;
  }
    
    if(mainCyclist.isTouching(obstaclesGroup)){
      
      pinkplayerGroup.setVelocityXEach (0);
      yellowplayerGroup.setVelocityXEach (0);
      redplayerGroup.setVelocityXEach (0);
      obstaclesGroup.setVelocityXEach(0);
      gameState = END;
      
    }
    
 }//end of gamestate if
  
  if(gameState === END){
    
    pinkplayerGroup.setLifetimeEach (-1);
    redplayerGroup.setLifetimeEach (-1);
    yellowplayerGroup.setLifetimeEach (-1);
    obstaclesGroup.setLifetimeEach (-1);
    path.velocityX = 0;
    gameover.visible = true;
    
    if(keyDown("r")){
      
      reset();
      
    }
    
  }
  
}//end of draw

function pinkcyclist(){
  
  pinkplayer = createSprite(600,Math.round(random(50,250),10,10));
  
  pinkplayer.addAnimation("pinkplayer",pinkplayerImg);
 pinkplayer.addAnimation("pinkplayercollided",pinkplayercollidedImg);
  
  pinkplayer.scale = 0.05;
  
  pinkplayer.velocityX = -(2 + distance/200);
  
  pinkplayer.addlifetime = 250
  
  pinkplayerGroup.add(pinkplayer);
  
}

function yellowcyclist(){
  
  yellowplayer = createSprite(600,Math.round(random(50,250),10,10));
  
  yellowplayer.addAnimation("yellwplayer",yellowplayerImg);
  
  yellowplayer.addAnimation("yellowplayercollided",yellowplayercollidedImg);
  
  yellowplayer.scale = 0.05;
  
  yellowplayer.velocityX = -(2 + distance/200);
  
  yellowplayer.addlifetime = 250;
  
  yellowplayerGroup.add(yellowplayer);
  
  
  
}

function redcyclist(){
  
  redplayer = createSprite(600,Math.round(random(50,250),10,10));
  
  redplayer.addAnimation("redplayer",redplayerImg);
  
  redplayer.addAnimation("redplayercollided",redplayercollidedImg);
  
  redplayer.scale = 0.05;
  
  redplayer.velocityX = -(2 + distance/200);
  
  redplayer.addlifetime = 250;
  
  redplayerGroup.add(redplayer);
  
 
}

function reset(){
  
  gameState = PLAY;
  gameover.visible = false;
  distance = 0;
  redplayerGroup.destroyEach();
  pinkplayerGroup.destroyEach();
  yellowplayerGroup.destroyEach();
  obstaclesGroup.destroyEach();
  path.velocityX = -(2 + distance/200);
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  
}

function obstacle_1(){
  
  obstacle1 = createSprite(600,Math.round(random(50,250),10,10));
  
  obstacle1.addImage("obstacle1",obstacle1Img);
  obstacle1.velocityX = -(2 + distance/200)
  
  obstacle1.addlifetime = 250;
  
  obstacle1.scale = 0.05;
  
  obstaclesGroup.add(obstacle1);
  
  //obstacle1.debug = true;
}

function obstacle_2(){
  
  obstacle2 = createSprite(600,Math.round(random(50,250),10,10));
  
  obstacle2.addImage("obstacle2",obstacle2Img);
  obstacle2.velocityX = -(2 + distance/200)
  
  obstacle2.addlifetime = 250;
  
  obstacle2.scale = 0.15;
  //obstacle2.debug = true;
  obstacle2.setCollider("circle",0,0,200)
  
  obstaclesGroup.add(obstacle2)
}

function obstacle_3(){
  
  obstacle3 = createSprite(600,Math.round(random(50,250),10,10));
  
  obstacle3.addImage("obstacle3",obstacle3Img);
  obstacle3.velocityX = -(2 + distance/200);
  
  obstacle3.addlifetime = 250;
  
  obstacle3.scale = 0.15;
  
  //obstacle3.debug = true;
  
  obstaclesGroup.add(obstacle3);
  
  obstacle3.setCollider("rectangle",0,0,500,300)
}
