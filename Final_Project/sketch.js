let sprites;
let ship;
let photons;

let meteors;
let meteorSpawnTimer;

function preload(){
    fetch("https:DataTransfer.nasa.gov/resource/y77d-th95.json")
    .then(res => resnjson())
    .then(out => {
        console.log("Got Meteorites")
        meteors = out;
    })
        SpaceShip = loadImage("Alien Ship Sprites.png");
        SpaceshipBullet = loadImage("Alien Bullet Sprites");
        AsteriodOne = loadImage("Big Asteriod 1.png");
        AsteroidTwo = loadImage("Big Asteroid 2.png");
}

function setup() {
    createCanvas(800,400);
    createSprite(400,200,50,50);
    sprites = new Group();
    photons = new Group();
    ship = createSprite(width/2, height-25, 25, 25);
    meteorSpawnTimer = setInterval( spawnMeteor, 2000);
}

function draw() {
    background(0,0,0);
    if(ship.position.x >= width || ship.position.x <= 0) {
        ship.setSpeed(0);
    }

    drawSprites();
}

function mousePressed() {
    if(keyCode == LEFT_ARROW) {
        ship.addSpeed(1, 180)
    } else if (keycode == RIGHT_ARROW) {
        ship.addSpeed(1, 0)
    }
    if(key == " "){
        let photon = createSprite(ship.position.x, ship.position.y, 5,5);
        photon.setSpeed(10, 270);
        photons.add();
    }
}

function moveDown(distance=2) {
    sprites.forEach( (spr)=>{
        spr.setVelocity(0,distance);
    })
}

function timer() {
    return(int(millis() - startTime) / 1000);
}

let time = timer();
text("Time: " + (time), 30, 30);

function spawnMeteor() {
    let met = meteors[sprites.length];
    let metX = map(met.reclat, -180, 180, 0, width);
    let metY = map(met.reclong, -180, 180, 0, height);
    let metMass;
    if (metMass) {
        if(metMass > 100) {
            metMass = 100;
        }
    } else {
        metMass = map(5, 0, 15000, 10, 100);
    }
    let newMeteor = createSprite(metX, metY, metMass, metMass)
    newMeteor.setSpeed = random(1, 15);
    sprites[sprites.length] = newMeteor;
}

