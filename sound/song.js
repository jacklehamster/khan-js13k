class Song {
    constructor(song) {
      this.player = new CPlayer();
      this.player.init(song);
      this.prepare();
    }
  
    prepare() {
        const i = setInterval(() => {
            const progress = this.player.generate();
            if (progress >= 1) {
              clearInterval(i);
              var wave = this.player.createWave();
              this.audio = document.createElement("audio");
              this.audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
              this.audio.loop = true;
            }
          }, 0);        
    }

    play() {
      this.audio?.play();
    }

    stop() {
      if (this.audio) {
        this.audio?.pause();
        this.audio.currentTime = 0;
      }
    }
}
  