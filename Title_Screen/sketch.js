let flashingStar;
let sx = 0;

function preload(){
    flashingStar = loadImage("Title Star Sprites2.png");
}

function setup() {
createCanvas(400,400);
//imageMode(CENTER);
}

function draw() {
background(0);
textSize(30);
text("SPACE ADVENTURE", 50, 50);
fill(255,255,0);

textSize(15);
text("Choose your spaceship:", 120, 100);
fill(255,255,255);

image(flashingStar, -20, 20, 150, 150, 64 * sx, 0, 64, 64);
if (frameCount % 15 == 0) {
}

image(flashingStar, 266, 20, 150, 150, 64 * sx, 0, 64, 64);
if (frameCount % 15 == 0) {
sx = (sx + 1) % 2;
}

button = createButton('Alien');
    button.position(180, 100+75);
button = createButton('Rocket');
    button.position(175, 125+75);
button = createButton('Eyeball');
    button.position(174, 150+75);
button = createButton('S.S.SWEETHEART');
    button.position(145, 175+75);
button = createButton('Cat');
    button.position(185, 200+75);
}