var backgroundImg, splashScreenImg;
var playerImg, player;
var aboutButton , playButton;
var cactus, cactusImg
var bullet, bulletImg, bulletGroup
var zombie1, zombie1Img, zombie2, zombie2Img, zombie3, zombie3Img
var enemy, enemyGroup
var health = 200
var maxHealth = 200
var score = 0
var gameState = "wait";

function preload(){
    splashScreenImg = loadImage("Assets/SplashScreen.gif");
    backgroundImg = loadImage("Assets/Background.jpg");
    playerImg = loadImage("Assets/PlayerGIF.gif") 
    cactusImg = loadImage("Assets/cactus_img.png")
    bulletImg = loadImage("Assets/Bullet.png")
    zombie1Img = loadImage("Assets/Zombie1.png")
    zombie2Img = loadImage("Assets/Zombie2.png")
    zombie3Img = loadImage("Assets/Zombie3.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    playButton = createImg("Assets/PlayButton.png");
    playButton.position(width/2+ 200,windowHeight/2);
    playButton.size(150,80);
    playButton.hide();

    aboutButton = createImg("Assets/AboutButton.png");
    aboutButton.position(width/2+ 200, windowHeight/2 - 100);
    aboutButton.size(150,80)
    aboutButton.hide();

    player = createSprite(windowWidth/12, windowHeight - 200)
    player.addImage(playerImg)
    player.scale = 1.5
    player.visible = false

    enemyGroup = new Group()
    bulletGroup = new Group()

}

function draw(){
    if(gameState == "wait"){
        background(splashScreenImg);
        playButton.show();
        aboutButton.show();

    }

    playButton.mousePressed(() =>{
        playButton.hide();
        aboutButton.hide();
        gameState = "level1";
        
    })

    aboutButton.mousePressed(() =>{
        playButton.hide();
        aboutButton.hide();
        gameState = "about";      
    })

    if(gameState == "level1"){
       background(backgroundImg);
       player.visible = true
       healthLevel()
       spawnEnmies()
       spawnObstacles()
       if(keyDown("SPACE")){
        spawnBullets()
       }
    }

    if(gameState == "about"){
        aboutGame();
    }

    drawSprites();
    if(gameState == "level1"){
        fill("beige")
        textSize(30)
        text("Score: "+score, windowWidth - 200, windowHeight/10)
    }
    
}

function aboutGame(){
    swal({
        title: "Zombie Shooter",
        text: "This is a game where you shoot zombies, avoid the cactus's in level 2 and use the health potion to boost your health. Use arrow keys to move and mouse to shoot",
        textAlign: "CENTER",
        imageURL: "Assets/SplashScreen.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Kill and Win!",
        confirmButtonColor: "black",
    },
    function(){
        gameState = "wait";
    })
}

function healthLevel() {
    stroke("green")
    strokeWeight(7)
    noFill()
    rect(windowWidth/12, windowHeight/10, maxHealth, 20)

    noStroke()
    fill("darkgreen")
    rect(windowWidth/12, windowHeight/10, health, 20)
}

function spawnEnmies(){
    if(frameCount % 100 == 0){
        var random = Math.round((Math.random()*2)+1);
        enemy = createSprite(windowWidth, windowHeight - 200)

        switch(random){
            case 1:
                enemy.addImage(zombie1Img)
                enemy.scale = 0.5
                enemy.velocityX = -2
                break
            case 2:
                enemy.addImage(zombie2Img)
                enemy.scale = 0.5
                enemy.velocityX = -2
                break
            case 3:
                enemy.addImage(zombie3Img)
                enemy.scale = 0.5
                enemy.velocityX = -2
                break
            default:
                break
        }
        enemyGroup.add(enemy)
        
    }
}

function spawnObstacles(){

}

function spawnBullets(){
    bullet = createSprite(player.x + 10, player.y - 20)
    bullet.addImage(bulletImg)
    bullet.scale = .2
    bullet.velocityX = 5
    bullet.depth = player.depth
    player.depth += 1
    bulletGroup.add(bullet)
    
}

