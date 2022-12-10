class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color,
    offset = { x: 0, y: 0 },
    imageSrc,
    scale = 1,
    maxFrames = 1,
    framesHold,
  }) {
    super({
      position,
      imageSrc,
      scale,
      maxFrames,
      offset,
      framesHold,
    });

    this.width = 50;
    this.height = 150;
    this.velocity = velocity;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
  }

  update() {
    this.draw();
    this.animateFrames();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else this.velocity.y += GRAVITY;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
