let sprites;
let ship;
let photons;
let game_state = "Title_Screen";
let sx = 0;


let meteors;
let meteorSpawnTimer;

let alienButton;
let rocketButton;
let eyeballButton;
let sweetheartButton;
let catButton;

function preload(){
    //fetch("https:DataTransfer.nasa.gov/resource/y77d-th95.json")
    //.then(res => resnjson())
    //.then(out => {
      //  console.log("Got Meteorites")
        //meteors = out;
    //})
        //SpaceShip = loadImage("Alien Ship Sprites.png");
        AlienSpaceShip = loadSpriteSheet('Alien Ship Sprites.png', 64, 64, 4);
        AlienSpaceShipBullet = loadSpriteSheet('Alien Bullet Sprites.png', 64, 64, 4);
        RocketSpaceShip = loadSpriteSheet('Rocket Ship Sprites.png', 64, 64, 4);
        RocketSpaceShipBullet = loadSpriteSheet('Rocket Bullet Sprites.png', 64, 64, 4);
        EyeballSpaceShip = loadSpriteSheet('Eyeball Ship Sprites.png', 64, 64, 4);
        EyeballSpaceShipBullet = loadSpriteSheet('Eyeball Bullet Sprites.png', 64, 64, 4);
        AsteroidOne = loadImage("Big Asteriod 1 Sprite.png");
        AsteroidTwo = loadImage("Big Asteroid 2 Sprite.png");
        flashingStar = loadImage("Title Star Sprites.png");

        alien_move_animation = loadAnimation(AlienSpaceShip);
        rocket_move_animation = loadAnimation(RocketSpaceShip);
        eyeball_move_animation = loadAnimation(EyeballSpaceShip);

        alienButton = createButton('Alien');
        alienButton.position(180, 175);
        rocketButton = createButton('Rocket');
        rocketButton.position(175, 200);
        eyeballButton = createButton('Eyeball');
        eyeballButton.position(174, 225);
        sweetheartButton = createButton('S.S.SWEETHEART');
        sweetheartButton.position(145, 250);
        catButton = createButton('Cat');
        catButton.position(185, 275);

        alienButton.mousePressed(alien_game)
        rocketButton.mousePressed(rocket_game)
        eyeballButton.mousePressed(eyeball_game)

}



function setup() {
    createCanvas(800,400);
    //createSprite(400,200,50,50);
    sprites = new Group();
    photons = new Group();
    ship = createSprite(width/10, height-25, 25, 25);
    ship.addAnimation('AlienMove', alien_move_animation);
    ship.addAnimation('RocketMove', rocket_move_animation);
    ship.addAnimation('EyeballMove', eyeball_move_animation);
    meteorSpawnTimer = setInterval( spawnMeteor, 2000);
}



function draw() {
    background(0,0,0);

if (game_state == "Title_Screen") {
    background(0);
    textSize(30);
    fill(255,255,0);
    text("SPACE ADVENTURE", 50, 50);
    
    textSize(15);
    fill(255,255,255);
    text("Choose your spaceship:", 120, 100);
    
    image(flashingStar, -20, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    }
    
    image(flashingStar, 266, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    sx = (sx + 1) % 2;
    }

}
else if (game_state == "Game_Play") {
    if(ship.position.x >= width || ship.position.x <= 0) {
        ship.setSpeed(0);
    }

    drawSprites();
}

else if (game_state == "Game_Over") {

}
}


function keyPressed() {
    if(keyCode == UP_ARROW) {
        ship.addSpeed(1, 270);
        if (player_character == "AlienSpaceShip")
        ship.changeAnimation('AlienMove');
        else if (player_character == "RocketSpaceShip")
        ship.changeAnimation('RocketMove');
        else if (player_character == "EyeballSpaceShip")
        ship.changeAnimation('EyeballMove');
    } 
    else if (keyCode == DOWN_ARROW) {
        ship.addSpeed(1, 90);
        if (player_character == "AlienSpaceShip") {
            ship.changeAnimation('AlienMove');
        }
        else if (player_character == "RocketSpaceShip")
        ship.changeAnimation('RocketMove');
        else if (player_character == "EyeballSpaceShip")
        ship.changeAnimation('EyeballMove');
    }
    if(key == " "){
        let photon = createSprite(ship.position.x, ship.position.y, 5,5);
        photon = loadSpriteSheet('AlienSpaceShipBullet.png', 64, 64, 4);
        photon.setSpeed(10, 270);
        photons.add();
    }
}

function moveDown(distance=2) {
    sprites.forEach( (spr)=>{
        spr.setVelocity(0,distance);
    })
}

//function timer() {
//    return(int(millis() - startTime) / 1000);
//}

//let time = timer();
//text("Time: " + (time), 30, 30);

function spawnMeteor() {
    //let met = meteors[sprites.length];
    let metX = random(200, width);
    let metY = random(0,height);
    let metMass = random(5,100);

    let newMeteor = createSprite(metX, metY, metMass, metMass)
    if (random(1,100) > 50) {
    newMeteor.addImage(AsteroidOne);
    }
    else {
    newMeteor.addImage(AsteroidTwo);
    }
    newMeteor.setSpeed = random(1, 15);
    sprites[sprites.length] = newMeteor;
}




function alien_game() {
    player_character = "AlienSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('AlienMove');
}

function rocket_game() {
    player_character = "RocketSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('RocketMove');
}

function eyeball_game() {
    player_character = "EyeballSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('EyeballMove');
}