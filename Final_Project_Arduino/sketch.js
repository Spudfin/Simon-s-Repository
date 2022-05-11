let sprites;
let ship;
let photons;
let game_state = "Title_Screen";
let sx = 0;
let score = 0;
let count = 30;

let meteors;
let meteorSpawnTimer;

let alienButton;
let rocketButton;
let eyeballButton;
let sweetheartButton;
let catButton;

const synth = new Tone.Synth().toDestination();
const sounds = new Tone.Players({
    breakNoise: "Break_Sound.wav",
    gameMusic: "Space_Adventure_Title_Theme.wav",
    alienShootNoise: "Alien_Shoot_Sound.wav",
    rocketShootNoise: "Rocket_Shooting_Noise.wav",
    eyeballShootNoise: "Eyeball_Shooting_Sound.mp3",
    sweetheartShootNoise: "Sweetheart_Shooting_Sound.wav",
    catShootNoise: "Cat_Shoot_Sound.wav",
    fakeCatShootNoise: "Fake_Cat_Noise.wav"
})

let soundNames = ['breakNoise','gameMusic','alienShootNoise', 'rocketShootNoise', 'eyeballShootNoise','sweetheartShootNoise','catShootNoise', 'fakeCatNoise'];

const delay = new Tone.FeedbackDelay("8n", 0);

function preload(){
    sounds.connect(delay);
    delay.toDestination();
    //fetch("https:DataTransfer.nasa.gov/resource/y77d-th95.json")
    //.then(res => resnjson())
    //.then(out => {
      //  console.log("Got Meteorites")
        //meteors = out;
    //})
        //SpaceShip = loadImage("Alien Ship Sprites.png");
        AlienSpaceShip = loadSpriteSheet('Alien Ship Sprites.png', 64, 64, 4);
        AlienSpaceShipBullet = loadSpriteSheet('Alien Bullet Sprites.png', 64, 64, 4);
        AlienSpaceShipShoot = loadSpriteSheet('Alien Shooting Sprites.png', 64, 64, 4);
        RocketSpaceShip = loadSpriteSheet('Rocket Ship Sprites.png', 64, 64, 4);
        RocketSpaceShipBullet = loadSpriteSheet('Rocket Bullet Sprites.png', 64, 64, 4);
        RocketSpaceShipShoot = loadSpriteSheet('Rocket Shooting Sprites.png', 64, 64, 4);
        EyeballSpaceShip = loadSpriteSheet('Eyeball Ship Sprites.png', 64, 64, 4);
        EyeballSpaceShipBullet = loadSpriteSheet('Eyeball Bullet Sprites.png', 64, 64, 4);
        EyeballSpaceShipShoot = loadSpriteSheet('Eyeball Shooting Sprites.png', 64, 64, 4);
        SweetheartSpaceShip = loadSpriteSheet('Sweetheart Ship Sprites.png', 64, 64, 4);
        SweetheartSpaceShipBullet = loadSpriteSheet('Sweetheart Bullet Sprites.png', 64, 64, 4);
        SweetheartSpaceShipShoot = loadSpriteSheet('Sweetheart Shooting Sprites.png', 64, 64, 4);
        CatSpaceShip = loadSpriteSheet('Cat Ship Sprites.png', 64, 64, 4);
        CatSpaceShipBullet = loadSpriteSheet('Cat Bullet Sprites.png', 64, 64, 4);
        CatSpaceShipShoot = loadSpriteSheet('Cat Shooting Sprite.png', 64, 64, 4);

        AsteroidOne = loadImage("Big Asteriod 1 Sprite.png");
        AsteroidTwo = loadImage("Big Asteroid 2 Sprite.png");
        AsteroidThree = loadImage("Big Asteroid 3 Sprite.png");
        AsteroidFour = loadImage("Big Asteroid 4 Sprite.png");
        flashingStar = loadImage("Title Star Sprites.png");
        sadFlashingStar = loadImage("Sad Star Sprite.png");

        alien_move_animation = loadAnimation(AlienSpaceShip);
        rocket_move_animation = loadAnimation(RocketSpaceShip);
        eyeball_move_animation = loadAnimation(EyeballSpaceShip);
        sweetheart_move_animation = loadAnimation(SweetheartSpaceShip);
        cat_move_animation = loadAnimation(CatSpaceShip);

        alien_shoot_animation = loadAnimation(AlienSpaceShipShoot);
        rocket_shoot_animation = loadAnimation(RocketSpaceShipShoot);
        eyeball_shoot_animation = loadAnimation(EyeballSpaceShipShoot);
        sweetheart_shoot_animation = loadAnimation(SweetheartSpaceShipShoot);
        cat_shoot_animation = loadAnimation(CatSpaceShipShoot);

        alien_bullet_animation = loadAnimation(AlienSpaceShipBullet);
        rocket_bullet_animation = loadAnimation(RocketSpaceShipBullet);
        eyeball_bullet_animation = loadAnimation(EyeballSpaceShipBullet);
        sweetheart_bullet_animation = loadAnimation(SweetheartSpaceShipBullet);
        cat_bullet_animation = loadAnimation(CatSpaceShipBullet);

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
        sweetheartButton.mousePressed(sweetheart_game)
        catButton.mousePressed(cat_game)

        //alienShootNoise.toDestination();

}

function timer() {
    return(int(millis() - startTime) / 1000);
  }



function setup() {
    createCanvas(800,400);
    //createSprite(400,200,50,50);
    //sprites = new Group();
    meteors = new Group(); //....................................................................................
    photons = new Group();
    ship = createSprite(width/10, height-25, 25, 25);
    ship.addAnimation('AlienMove', alien_move_animation);
    ship.addAnimation('AlienShoot', alien_shoot_animation);
    ship.addAnimation('RocketMove', rocket_move_animation);
    ship.addAnimation('RocketShoot', rocket_shoot_animation);
    ship.addAnimation('EyeballMove', eyeball_move_animation);
    ship.addAnimation('EyeballShoot', eyeball_shoot_animation);
    ship.addAnimation('SweetheartMove', sweetheart_move_animation);
    ship.addAnimation('SweetheartShoot', sweetheart_shoot_animation);
    ship.addAnimation('CatMove', cat_move_animation);
    ship.addAnimation('CatShoot', cat_shoot_animation);
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
    meteors.overlap(photons, meteorHit);
    drawSprites();

let time = timer();
fill(255,255,255);
text("Time: " + (30 - time), 30, 30);
    if (time >= 30){
      game_state = 'Game_Over';
    }
}

else if (game_state == "Game_Over") {
    textSize(36);
    fill(255,0,0);
    text("GAME OVER", 90, 100);

    textSize(15);
    fill(255,255,255);
    text("Final Score:", 160, 200);

    textSize(15);
    fill(255,255,255);
    text(score, 190, 225);

    image(sadFlashingStar, -20, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    }
    
    image(sadFlashingStar, 266, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    sx = (sx + 1) % 2;
    }
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
        else if (player_character == "SweetheartSpaceShip")
        ship.changeAnimation('SweetheartMove');
        else if (player_character == "CatSpaceShip")
        ship.changeAnimation('CatMove');
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
        else if (player_character == "SweetheartSpaceShip")
        ship.changeAnimation('SweetheartMove');
        else if (player_character == "CatSpaceShip");
        //ship.changeAnimation('CatMove');
    }
    if(key == " "){
        let photon = createSprite(ship.position.x, ship.position.y, 5,5);
        photon.addAnimation('AlienBulletMove', alien_bullet_animation);
        photon.addAnimation('RocketBulletMove', rocket_bullet_animation);
        photon.addAnimation('EyeballBulletMove', eyeball_bullet_animation);
        photon.addAnimation('SweetheartBulletMove', sweetheart_bullet_animation);
        photon.addAnimation('CatBulletMove', cat_bullet_animation);
        photon.setSpeed(8, 0);
        photon.life = 200;
        if (player_character == "AlienSpaceShip") {
        photon.changeAnimation('AlienBulletMove');
        ship.changeAnimation('AlienShoot');
        sounds.player('alienShootNoise').start()
        }
        else if (player_character == "RocketSpaceShip") {
        photon.changeAnimation('RocketBulletMove');
        ship.changeAnimation('RocketShoot');
        sounds.player('rocketShootNoise').start()
        }
        else if (player_character == "EyeballSpaceShip") {
        photon.changeAnimation('EyeballBulletMove');
        ship.changeAnimation('EyeballShoot');
        sounds.player('eyeballShootNoise').start()
        }
        else if (player_character == "SweetheartSpaceShip") {
        photon.changeAnimation('SweetheartBulletMove');
        ship.changeAnimation('SweetheartShoot');
        sounds.player('sweetheartShootNoise').start()
        }
        else if (player_character == "CatSpaceShip") {
        photon.changeAnimation('CatBulletMove');
        ship.changeAnimation('CatShoot');
        if (random(1,101) > 100) {
            sounds.player('fakeCatShootNoise').start();
        }
        else {
        }
        sounds.player('catShootNoise').start();
    }
    photons.add(photon);
    console.log(photons);
        }
        if (key == "m"){
        sounds.player('gameMusic').start()
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
    let metY = random(0, height);
    let metMass = random(5,100);

    let newMeteor = createSprite(metX, metY, metMass, metMass)
    if (random(1,100) > 75) {
    newMeteor.addImage(AsteroidOne);
    }
    else if (random(1,100) > 75) {
    newMeteor.addImage(AsteroidTwo);
    }
    else if (random(1,100) > 75) {
    newMeteor.addImage(AsteroidThree);
    }
    else {
    newMeteor.addImage(AsteroidFour);
    }
    newMeteor.setSpeed = random(1, 15);
    console.log("add meteor")
    meteors.add(newMeteor);
    console.log(meteors);
    //sprites[sprites.length] = newMeteor;
}

function meteorHit (meteor, photon) { //...........................................................................
    photon.remove();
    meteor.remove();
    console.log("meteorHit")
    sounds.player('breakNoise').start()
    score = score + 1;
}

function alien_game() {
    player_character = "AlienSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('AlienMove');
    //sounds.player('gameMusic').start()
    //photon.changeAnimation('AlienBulletMove');
    startTime = millis();
}

function rocket_game() {
    player_character = "RocketSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('RocketMove');
    //sounds.player('gameMusic').start()
    //photon.changeAnimation('RocketBulletMove');
    startTime = millis();
}

function eyeball_game() {
    player_character = "EyeballSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('EyeballMove');
    //sounds.player('gameMusic').start()
    //photon.changeAnimation('EyeballBulletMove');
    startTime = millis();
}

function sweetheart_game() {
    player_character = "SweetheartSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('SweetheartMove');
    //sounds.player('gameMusic').start()
    //photon.changeAnimation('SweetheartBulletMove');
    startTime = millis();
}

function cat_game() {
    player_character = "CatSpaceShip"
    game_state = "Game_Play"
    removeElements();
    ship.changeAnimation('CatMove');
    //sounds.player('gameMusic').start()
    startTime = millis();
}