const canvas = require("canvas");
class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    framesCurrent = 0,
    framesElapsed = 0,
    framesHold = 12,
    offset = {
      x: 0,
      y: 0,
    },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new canvas.Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.framesCurrent = framesCurrent;
    this.framesElapsed = framesElapsed;
    this.framesHold = framesHold;
    this.offset = offset;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale
    );
  }
  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.maxFrames - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    this.animateFrames();
  }
}

module.exports = Sprite;
