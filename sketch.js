var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var score = 0
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  createCanvas(665, 400)

  ground = createSprite(332.5, 370, 665, 15)
  ground.velocityX = -7

  monkey = createSprite(70, 365, 15, 15)
  monkey.addAnimation("monkey_running", monkey_running)
  monkey.scale = 0.19

  FoodGroup = new Group()
  obstacleGroup = new Group()
}


function draw() {

  monkey.setCollider("circle",20,0,230)
  
  
  monkey.debug = true
  
  background("lightblue")

  monkey.collide(ground)

  if (ground.x > 300) {

    ground.x = ground.width / 2

  }

  if (keyDown("space") && monkey.y >= 303.35) {

    monkey.velocityY = -16

  }

  if (FoodGroup.isTouching(monkey)) {

    score = score + 1
    FoodGroup.destroyEach()

  }

  if (obstacleGroup.isTouching(monkey)) {

    FoodGroup.setVelocityXEach (0)
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.lifetime = -1
    obstacleGroup.lifetime = -1
    ground.velocityX = 0
    monkey.velocity =0

  }


  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time : " + survivalTime, 70, 30)

  stroke("white")
  textSize(20)
  fill("white")
  text("score : " + score, 400, 30)

  monkey.velocityY = monkey.velocityY + 0.8

  spawnFood()
  spawnObstacles()
  drawSprites()

}

function spawnFood() {

  if (frameCount % 80 === 0) {

    banana = createSprite(665, 30, 10, 10)
    banana.addImage(bananaImage)
    banana.scale = 0.099
    banana.y = (random(120, 200))
    banana.velocityX = -5
    banana.lifetime = 150
    FoodGroup.add(banana)
  }
}

function spawnObstacles() {

  if (frameCount % 300 === 0) {

    obstacle = createSprite(665, 325, 10, 10)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.2
    obstacle.velocityX = -6
    obstacle.lifetime = 150
    obstacleGroup.add(obstacle)
  }
}