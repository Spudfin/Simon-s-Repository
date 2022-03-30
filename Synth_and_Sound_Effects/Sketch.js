let pitch = 800;

function preload() {
    spring = loadImage("Spring.jpg")
}

let osc = new Tone.AMOscilator(600,'sine','sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
}).connect(pan);
osc.connect(ampEnv);

let delay = new Tone.LFO(1,-1,1).start();
panLFO.type = 'sine';
panLFO.connect(pan.pan);
let freqLFO = new Tone.LFO(0.1, 400, 4000).start();
freqLFO.type = 'triangle';
freqLFO.connect(osc.frequency);

let noisd = new Tone.Noise('pink').start();
let noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.05,
    decay: 0.05,
    sustain: 0.8,
    release: 0.1
});
let noiseFilter = new Tone.Filter({
    type: "lowpass",
    frequency: 200
});
noise.connect(noiseEnv);
noiseEnv.connect(noiseFilter);
noiseFilter.connect(gain);


let button1;
let button2;
let button3;

let slider1;

let nxSlider;
let nxDial;
let nxButtons = [];

function preload() {
    nxSlider = new Nexus.Slider('#slider');

    nxDial = Nexus.Add.Dial('#dial',{
        'size': [100,100]
    });
    nxButtons[0] = Nexus.Add.Button('#dial');
}

function setup() {
    createCanvas(400, 400);

    button1 = createButton("Boing", 'boing');
    button1.position(200, 300);
    button1.mousePressed(ping);

    button2 = createButton("multiBoing");
    button2.position(200,340);
    button2.mousePressed( () => multiBoing(5) );

    button3 = document.getElementById('heartDiv');
    button3.onclick = () => buttonSound('theHeart');

    slider1 = createSlider(0,1,0,0.1);
    slider1.mouseReleased(()=>{
        let delayTime = slider1.value();
        delay.delayTime.value = delayTime();
    });

    nxSlider.on('change', function (v){
        delay.delayTime.value = v;
    })
    
    nxDial.on('change', (v)=>{
        console.log(v)
        gain.gain.value = v;
    })
    nxButtons[0].on('change', (v)=>{
        if(v.state === true){
            console.log(v)
            noiseEnv.trigerAttackRelease(0.5);
            noiseFilter.frequency.setValueAtTime(200);
            noiseFilter.frequency.exponentialRampToValueAtTime(1000,'+0.5');
        }
    })
}

function draw() {
    background("spring")
}

function keyPressed(){
    console.log(key, keyCode);
    if(key==="1"){

    } else if (key === "2"){

    } else if (key === "3"){

    }
}

function boing(number=1) {
    ampEnv.triggerAttackRelease('8n')
}

function multiBoing(number=1) {
    for(let i=0; i<number; i++) {
        empEnv.triggerAttackRelease('8n', "+"+i/2);
    }
}