let channelNumber: number = 4;
let boom: HTMLAudioElement;
let clap: HTMLAudioElement;
let hihat: HTMLAudioElement;
let kick: HTMLAudioElement;
let openhat: HTMLAudioElement;
let ride: HTMLAudioElement;
let snare: HTMLAudioElement;
let tink: HTMLAudioElement;
let tom: HTMLAudioElement;

class Sound {
  constructor(public key: string, public time: number) {}
}

class Channel {
  isRecordingOn: boolean = false;
  sounds: Sound[] = [];
  startRecording: number = 0;
}

class Channels {
  channels: Channel[] = [];

  constructor(channelNumber: number) {
    //console.log(channelNumber);
    for (let number = 0; number < channelNumber; number++) {
      this.channels.push(new Channel());
    }
  }
  setRecording(channelNumber: number, ev: Event) {
    //console.log(ev.timeStamp);

    this.channels.forEach((element) => {
      element.isRecordingOn = false;
    });

    const recording = this.channels[channelNumber];
    recording.isRecordingOn = !recording.isRecordingOn;
    recording.startRecording = ev.timeStamp;
  }

  record(toRecord: Sound) {
    // toRecord.time -= this.startRecording;
    this.channels
      .filter((recording) => recording.isRecordingOn)
      .forEach((recording) =>
        recording.sounds.push({
          ...toRecord,
          time: toRecord.time - recording.startRecording,
        })
      );
  }

  play(channelNumber: number) {
    this.playSounds(this.channels[channelNumber].sounds);
  }

  playAll() {
    this.playSounds(this.channels.flatMap((recording) => recording.sounds));
  }

  playSounds(channel: Sound[]) {
    channel.forEach((sound) => {
      setTimeout(() => playSound(sound.key), sound.time);
    });
  }
}

let recordings: Channels = new Channels(channelNumber);

class Drumkit {
  constructor() {
    this.appStart();
  }

  appStart() {
    document.addEventListener("keypress", this.onKeyPress);
    

    for (let channel = 1; channel <= channelNumber; channel++) {
      const btnPlayChannel = document.querySelector("#playChannel" + channel);
      const btnRecordChannel = document.querySelector("#recordChannel" + channel);

      btnPlayChannel.addEventListener("click", () => recordings.play(channel));
      btnRecordChannel.addEventListener("click", (ev) =>
        recordings.setRecording(channel, ev)
      );
    }

    const btnPlayAllChannel = document.querySelector("#playAllChannels");

    btnPlayAllChannel.addEventListener("click", () => recordings.playAll());

    this.getAudioElements();
  }

  getAudioElements(): void {
    boom = document.querySelector('[data-sound="boom"]');
    clap = document.querySelector('[data-sound="clap"]');
    hihat = document.querySelector('[data-sound="hihat"]');
    kick = document.querySelector('[data-sound="kick"]');
    openhat = document.querySelector('[data-sound="openhat"]');
    ride = document.querySelector('[data-sound="ride"]');
    snare = document.querySelector('[data-sound="snare"]');
    tink = document.querySelector('[data-sound="tink"]');
    tom = document.querySelector('[data-sound="tom"]');
    
  }

  onKeyPress(ev: KeyboardEvent): void {
    //console.log(ev);
    const key = ev.key;
    const time = ev.timeStamp;
    let pad = document.querySelector(`.pad-${ev.key}`);
    
    if (pad === null){
       return // exception
    }
    
    pad.classList.add('playing');
    recordings.record(new Sound(key, time));
    const pads = document.querySelectorAll('.pad');
    console.log(pad)
    pads.forEach(function(pad){
        pad.addEventListener('transitionend', removeTrans);
        
    })
    playSound(key);
    //console.log(pad)
  }
  
}

function removeTrans(ev: any): void {
  console.log(this.classList)
    if (ev.propertyName !== 'transform') //skip if not a transform
      return
    this.classList.remove('playing')
}


function playSound(key: string) {
  switch (key) {
    case "q":
      boom.currentTime = 0;
      boom.play();
      break;
    case "w":
      clap.currentTime = 0;
      clap.play();
      break;
    case "e":
      hihat.currentTime = 0;
      hihat.play();
      break;
    case "r":
      kick.currentTime = 0;
      kick.play();
      break;
    case "t":
      openhat.currentTime = 0;
      openhat.play();
      break;
    case "a":
      ride.currentTime = 0;
      ride.play();
      break;
    case "s":
      snare.currentTime = 0;
      snare.play();
      break;
    case "d":
      tink.currentTime = 0;
      tink.play();
      break;
    case "f":
      tom.currentTime = 0;
      tom.play();
      break;
  }
}

const drumkit = new Drumkit();