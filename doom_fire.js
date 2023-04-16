import * as PIXI from 'pixi.js';

const PIXEL_SIZE = 4
const FIRE_REPS = 2
const STEPS_BETWEEN_COLORS = 9
const COLORS = ["black", "red", "orange", "yellow", "white"];

class DoomFire {
  constructor(app, width, height) {
    this.app = app;
    this.width = width;
    this.height = height;
    this.fireWidth = Math.floor(this.width / (PIXEL_SIZE * FIRE_REPS));
    this.fireHeight = Math.floor(this.height / PIXEL_SIZE);
    this.palette = this.getPalette();
    this.fireArray = this.getFireArray();
    this.fireContainer = new PIXI.Container();
    this.fireContainer.scale.set(PIXEL_SIZE);
    this.app.addChild(this.fireContainer);
    this.fireGraphics = new PIXI.Graphics();

    this.logo = PIXI.Sprite.from('assets/doom_logo.png');
    this.logo.scale.set(1.5);
    // logo opacity is 0 by default
    this.logo.alpha = 0;
    this.logo.anchor.set(0.5, 0.5);
    this.logoX = Math.floor(this.width / 2 - this.logo.width / 2);
    this.logoY = Math.floor(this.height / 3 - this.logo.height / 2);
    this.logoStartY = this.height + 200;    
  }

  drawLogo() {
    if (this.logoStartY > this.logoY) {
      this.logoStartY -= 2;
    }

    if (this.logo.alpha < 1) {
      this.logo.alpha += 0.003;
    }

    this.logo.position.set(this.logoX, this.logoStartY);

    this.app.addChildAt(this.logo, 0);
  }

  doFire() {
    for (let x = 0; x < this.fireWidth; x++) {
      for (let y = 1; y < this.fireHeight; y++) {
        let colorIndex = this.fireArray[y][x];
        if (colorIndex) {
          let rnd = Math.floor(Math.random() * 4);
          this.fireArray[y - 1][(x - rnd + 1 + this.fireWidth) % this.fireWidth] = colorIndex - rnd % 2;
        } else {
          this.fireArray[y - 1][x] = 0;
        }
      }
    }
  }

  drawFire() {
    this.fireGraphics.clear();
    for (let y = 0; y < this.fireHeight; y++) {
      for (let x = 0; x < this.fireWidth; x++) {
        let colorIndex = this.fireArray[y][x];
        if (colorIndex) {
          let color = this.palette[colorIndex];
          this.fireGraphics.beginFill(color);
          this.fireGraphics.drawRect(x, y, 1, 1);
          this.fireGraphics.endFill();
        }
      }
    }
  
    this.fireContainer.removeChildren();

    // Add the processed fireGraphics and its clones to fireContainer
    for (let i = 0; i < FIRE_REPS; i++) {
      let fireClone = this.fireGraphics.clone();
      fireClone.position.set(i * this.fireWidth, 0);
      this.fireContainer.addChild(fireClone);
    }
  }
  
  
  
  getFireArray() {
    let fireArray = new Array(this.fireHeight).fill(null).map(() => new Array(this.fireWidth).fill(0));
    for (let i = 0; i < this.fireWidth; i++) {
      fireArray[this.fireHeight - 1][i] = this.palette.length - 1;
    }
    return fireArray;
  }

  getPalette() {
    const palette = [0];

    for (let i = 0; i < COLORS.length - 1; i++) {
      const c1 = new PIXI.Color(COLORS[i]).toNumber();
      const c2 = new PIXI.Color(COLORS[i + 1]).toNumber();

      for (let step = 0; step < STEPS_BETWEEN_COLORS; step++) {
        const t = (step + 0.5) / STEPS_BETWEEN_COLORS;
        const c = this.lerpColor(c1, c2, t);

        palette.push(c);
      }
    }
  
    return palette;
  }

  lerpColor(c1, c2, t) {
    const r = (1 - t) * ((c1 >> 16) & 0xff) + t * ((c2 >> 16) & 0xff);
    const g = (1 - t) * ((c1 >> 8) & 0xff) + t * ((c2 >> 8) & 0xff);
    const b = (1 - t) * (c1 & 0xff) + t * (c2 & 0xff);
    return (r << 16) | (g << 8) | b;
  }

  update() {
    this.doFire();
  }

  draw() {
    this.drawLogo();
    this.drawFire();
  }
}

export default DoomFire;