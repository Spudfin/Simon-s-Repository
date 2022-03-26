const { Nexus } = require("./NexusUI");
const { Tone } = require("./Tone");

let slider;

const synth = new Tone.PluckSynth();
const drum = new Tone.MembraneSynth({
    "pitchDecay" : 0.2 ,
    "octaves"  :  2.2 ,
    "oscillator"  : {
        "type"  : "sine"
} ,    
    "envelope"  : {
        "attack"  : 0.001 ,
        "decay"  : 0.8 ,
        "sustain"  : 0.01 ,
        "release"  : 0.4 ,
        "attackCurve"  :  "exponential"
    }
});
const metal = new Tone.MetalSynth({
    "frequency"  : 45 ,
    "envelope"  : {
        "attack"  : 0.001 ,
        "decay"  : 0.4 ,
        "release"  : 0.2
    }  ,
    "harminocity"  : 8.5 ,
    "modulationIndex"  : 40 ,
    "resonance" : 300 ,
    "octaves"  : 1.5
});

const reverb = new Tone.JCReverb(0.4).toDestination();

const osc = new Tone.OmniOscillator("C#4", "pwm").start();
const ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
})

osc.connect(ampEnv);
ampEnv.connect(reverb);

synth.connect(reverb);
drum.connect(reverb);
metal.connect(reverb);

let notes = {
    'q' : 'C4',
    'w' : 'D4',
    'e' : 'E4',
    'r' : 'F4',
    't' : 'G4',
    'y' : 'A4',
    'u' : 'B4',
    'i' : 'C5',
}

function setup() {
    createCanvas(400, 400);
    synth.release = 2;
    synth.resonance = 0.98;
    // synth.harmonicity.value = 1.25;
    //play a middle 'C' for the duration of an 8th note
    synth.trigerAttackRelease("C4","8n");

    slider = new Nexus.Slider('#slider');
    slider.on('change', (v)=>{
        reverb.roomSize.value = v;
    })
  }
  
  function draw() {
    background(220);
  }

function keyPressed() {
    let toPlay = notes[key];
    console.log(toPlay);

    osc.frequency.value = toPlay;
    ampEnv.Env.triggerAttackRelease('8n');

    //  synth.triggerAttackRelease(toPlay, 0.5);
    //  metal.triggerAttackRelease("C3", '8n', '+0.5');
    //  drum.triggerAttackRelease("C2", "8n", '+1');
}

