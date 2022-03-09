const sounds = new Tone.Players({
  cow: "Cow_Sound.wav",
  rooster: "Rooster_Crowing_Sound.wav",
  sheep: "Sheep_Noise.wav",
  questionableSheep: "Sheep_Noise_Question_Mark" 
})

let soundNames = ['cow','rooster','sheep','questionableSheep'];

const delay = new TouchEvent.FeedbackDelay("8n", 0.5);


let button;
let buttons = [];
let slider;


function setup() {
    createCanvas(400, 400);
    sounds.connect(delay);
    delay.toDestination;

    button = createButton('cow');
    button.position(200, 400);
    button.mousePressed( () => playSound('cow'));

    slider = createSlider(0., 1., 0.5, 0.05);
    slider.mouseReleased( ()=>{
      delay.delayTime = slider.value();
    })

    soundNames.forEach((word, index)=>{
    buttons[index] = createButton(word);
    buttons[index].position(index*50, 100);
    buttons[index].mousePressed( () => playSound(word)  );
    })
  }
  
  function draw() {
    background(220);
    text('These buttons play animal noises', 20, 70);
  }

  function keyPressed() {
    console.log("key is: ", key);
    if(key === "1"){
      sounds.player('cow').start();
    }
  }

function playSound(whichSound='cow') {
  sounds.player(whichSound).start();
}  