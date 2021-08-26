var gameState = "play";
var climberImg,climber,climberGroup;
var doorImg,door,doorGroup;
var towerImg,tower;
var ghostImg,ghost;
var invisibleBlockGroup,invisbleBlock;
var spookySound;

function preload(){
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
doorGroup = new Group();
climberImg = loadImage("climber.png");
climberGroup = new Group();
ghostImg = loadImage("ghost-standing.png");
invisibleBlockGroup = new Group();
spookySound = loadSound("spooky.wav");
}



function setup(){
createCanvas(600,600);

tower = createSprite(300,300);
tower.addImage("tower",towerImg);
tower.velocityY = 1;

ghost = createSprite(250,250,50,50);
ghost.addImage("ghost",ghostImg);
ghost.scale = 0.3;

spookySound.loop();


}



function draw(){

background(0);
if(gameState==="play"){


if(tower.y > 400){ 
tower.y = 300;
}

if(keyDown("space")){
ghost.velocityY = -5;
}

ghost.velocityY = ghost.velocityY + 0.8;
  
if(keyDown("left_arrow")){
ghost.x = ghost.x-3; 
}

if(keyDown("right_arrow")){
ghost.x = ghost.x+3; 
}  
  
if(climberGroup.isTouching(ghost)){
ghost.velocityY =0;
}
  
if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
ghost.destroy();
gameState = "end";
}
  
spawnDoors();


drawSprites();
}


if(gameState==="end"){
stroke("yellow");
fill("yellow");
textSize(30);
text("Game Over",300,300);
}
}

function spawnDoors(){
if(frameCount % 240===0){
var door = createSprite(200,-50);
door.addImage(doorImg);
door.velocityY = 1;
door.x = Math.round(random(120,400));
door.lifetime = 800;
doorGroup.add(door);

ghost.depth = door.depth;
ghost.depth += 1;
  
var climber = createSprite(200,10);
climber.addImage(climberImg);
climber.velocityY = 1;
climber.x = door.x;
climber.lifetime = 800;
climberGroup.add(climber);

var invisibleBlock = createSprite(200,15);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.velocityY = 1;
invisibleBlock.x = door.x;
invisibleBlock.lifetime = 800;
invisibleBlockGroup.add(invisibleBlock);
invisibleBlock.debug = true;
}



}












