const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const GRAVITY = 0.2;

if (canvas && ctx) {
  canvas.width = 1024;
  canvas.height = 576;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  class Sprite {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update() {
      this.draw();

      this.position.y += this.velocity.y;
      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
      } else this.velocity.y += GRAVITY;
    }
  }

  const p1 = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 10 },
  });
  const p2 = new Sprite({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
  });
  p1.draw(ctx);
  p2.draw(ctx);

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    p1.update();
    p2.update();
  }

  animate();
}
