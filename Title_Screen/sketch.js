function preload(){
    flashingStar = loadImage("Title Star Sprites2.png");
}

function setup() {
createCanvas(400,400);
imageMode(CENTER);
}

function draw() {
background(255);
textsize(32);
text("SPACE ADVENTURE", 50, 50);
fill(255,255,255);

image(flashingStar, 20, 20, 100, 100, 64 * sx, 0, 100, 100);
if (frameCount % 12 == 0) {
sx = (sx + 1) % 2;
}
}