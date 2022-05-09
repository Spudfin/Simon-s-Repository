let flashingStar;
let sx = 0;

const sounds = new Tone.Players({
    Title_Theme: "Space_Adventure_Title_Theme.wav"
  })

function preload(){
    flashingStar = loadImage("Title Star Sprites2.png");
}

//const delay = new Tone.FeedbackDelay("8n", 0.5);

function setup() {
createCanvas(400,400);

//sounds.connect(delay);
//delay.toDestination();

//playSound('Title_Theme');
}

let button;
let buttons = [];

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
    button.position(180, 175);
button = createButton('Rocket');
    button.position(175, 200);
button = createButton('Eyeball');
    button.position(174, 225);
button = createButton('S.S.SWEETHEART');
    button.position(145, 250);
button = createButton('Cat');
    button.position(185, 275);
}