let flashingStar;
let sx = 0;

function preload() {
    flashingStar = loadImage("Sad Star Sprite2.png");
}

function setup() {
    createCanvas(400,400);
    }
    
    function draw() {
    background(0);
    textSize(36);
    text("GAME OVER", 90, 100);
    fill(255,255,255);

    textSize(15);
    text("Final Score:", 160, 200);
    fill(255,255,255);

    textSize(15);
    text("30", 190, 225);
    fill(225,0,0);

    image(flashingStar, -20, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    }
    
    image(flashingStar, 266, 20, 150, 150, 64 * sx, 0, 64, 64);
    if (frameCount % 15 == 0) {
    sx = (sx + 1) % 2;
    }
    }