

let currentColor, red, orange, yellow, green, cyan, blue, magenta, brown, white, black;
const synth = new Tone.Synth().toDestination();

const sounds = new Tone.Players({
    Drip1: "Drip_Sound_1.wav",
    Drip2: "Drip_Sound_2.wav"
  })

  let soundNames = ['Drip1','Drip2'];

  const delay = new Tone.FeedbackDelay("8n", 0.5);



function setup() {
  createCanvas(800, 500);
  sounds.connect(delay);
  delay.toDestination();

  background(255);
  currentColor = 0;
  black = new colorBox(0, "black");
  red = new colorBox(30, "red");
  green = new colorBox(60, "green");
  blue = new colorBox(90, "blue");
  white = new colorBox(120, "white");
  yellow = new colorBox(150, "yellow");
  orange = new colorBox(180, "orange");
  cyan = new colorBox(210, "cyan");
  magenta = new colorBox(240, "magenta")
  brown = new colorBox(270, "brown")
  
}

function draw(){
  
  if(mouseX > 51 && mouseIsPressed){
    drawing();
  }
  black.appear();
  black.onMousePressed();
  red.appear();
  green.appear();
  blue.appear();
  white.appear();
  yellow.appear();
  orange.appear();
  cyan.appear();
  magenta.appear();
  brown.appear();
}

function mousePressed(){
  if(mouseX > 51){
    sounds.player('Drip1').start() // This sound should play whenever you start painting, I have no clue why the code just ignores it.
    //synth.triggerAttackRelease("C4", "8n"); // No idea why this isn't playing either. I'mm following the example videos exactly.
  }
}

class colorBox{
  constructor(y,color){
    this.x = 0;
    this.y = y;
    this.w = 30;
    this.h = 30;
    this.color = color;
  }
appear(){
  push();
  
  if(this.color != "white"){
    noStroke();
  }
  
  fill(this.color);
  rect(this.x, this.y, this.w, this.h);
  pop();
  }
  
  onMousePressed(){
    if(mouseIsPressed){
    if(mouseX < 50){
      if(mouseY > 0 && mouseY < 30){
        currentColor = "black";
      } else if (mouseY > 30 && mouseY < 60){
        currentColor = "red";
      } else if (mouseY > 60 && mouseY < 90){
        currentColor = "green";
      } else if (mouseY > 90 && mouseY < 120){
        currentColor = "blue";
      } else if (mouseY > 120 && mouseY < 150){
        currentColor = "white";
      } else if (mouseY > 150 && mouseY < 180){
        currentColor = "yellow";
      } else if (mouseY > 180 && mouseY < 210){
        currentColor = "orange";
      } else if (mouseY > 210 && mouseY < 240){
        currentColor = "cyan";
      } else if (mouseY > 240 && mouseY < 270){
        currentColor = "magenta";
      } else if (mouseY > 270 && mouseY < 300){
        currentColor = "brown";
      }
        
     }
    }
  }
}


function drawing(){
  push();
  stroke(currentColor);
  strokeWeight(2);
  line(pmouseX,pmouseY,mouseX,mouseY);
  pop();
}

// I have no idea why my code won't play the sounds. I need help in this class and your only office hours overlap with my other classes. I need another time we could meet, please respond to my emails.
// I believe there is a very quiet sound playing while drawing. Please turn up your headphones, thouh it may be my imagination.