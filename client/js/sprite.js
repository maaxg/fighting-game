class Sprite {
  constructor({ position, imageSrc, scale = 1, maxFrames = 1 }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 12;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x,
      this.position.y,
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
