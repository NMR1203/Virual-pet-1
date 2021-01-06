//personal added functions: adding back food(max of 20), setting dog back to normal dogIMG if food = 0, 
//and made it so that food cannot go below 0

var dog, happyDog, foodS, foodStock;
var dogIMG;
var database;


function preload(){
  dogIMG = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  
  createCanvas(500, 500);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogIMG);
  dog.scale = 0.25;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentDown(DOWN_ARROW)){
    foodS = foodS +5;
  }
  if(keyWentDown(UP_ARROW) && foodS <= 0){
    dog.addImage(dogIMG);
  }
  if(foodS >= 20){
    foodS = 20;
  }
  drawSprites();

  stroke("black");
  textSize(15);
  fill("black");
  text("Food Left:" +foodS, 10, 25);
  text("Press the up arrrow to feed the doggo", 10, 50);
  text("Press the down arrrow to add food", 10, 75);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food : x
  })
}