import * as PIXI from 'pixi.js';
import DoomFire from './doom_fire.js';

import './style.css';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class App {
  constructor() {
    this.app = new PIXI.Application({
      width: WIDTH,
      height: HEIGHT,
      transparent: true,
      resolution: window.devicePixelRatio || 1,
    });

    document.body.appendChild(this.app.view);

    this.app.stage = new PIXI.Container();
    this.doomFire = new DoomFire(this.app.stage, WIDTH, HEIGHT);

    // set up update and render loop
    this.app.ticker.add(() => {
      this.update();
      this.draw();
    });
  }

  update() {
    this.doomFire.update();
  }

  draw() {
    this.doomFire.draw();
  }
}

new App();

