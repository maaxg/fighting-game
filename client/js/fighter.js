const GRAVITY = 0.6;
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
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
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
      ...attackBox,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.sprites = sprites;
    this.dead = false;
    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    // draw attack box
    /*     ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    ); */

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += GRAVITY;
  }

  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  switchSprite(sprite) {
    // overriding all animations with death
    if (this.image === this.sprites.death.image) {
      if (this.framesCurrent === this.sprites.death.maxFrames - 1)
        this.dead = true;
      return;
    }
    // overriding all animations with attacking
    if (
      this.image === this.sprites.attack1.image &&
      this.framesCurrent < this.sprites.attack1.maxFrames - 1
    )
      return;
    // overriding all animations with take hit
    if (
      this.image === this.sprites.takeHit.image &&
      this.framesCurrent < this.sprites.takeHit.maxFrames - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrames = this.sprites.idle.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.maxFrames = this.sprites.run.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.maxFrames = this.sprites.jump.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.maxFrames = this.sprites.fall.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.maxFrames = this.sprites.attack1.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.maxFrames = this.sprites.takeHit.maxFrames;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.maxFrames = this.sprites.death.maxFrames;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
