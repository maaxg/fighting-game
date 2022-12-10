const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const GRAVITY = 0.7;

const KEYS = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

if (canvas && ctx) {
  canvas.width = 1024;
  canvas.height = 576;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  class Sprite {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.height = 150;
      this.lastKey;
    }
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update() {
      this.draw();
      this.position.x += this.velocity.x;
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

    p1.velocity.x = 0;
    p2.velocity.x = 0;

    if (KEYS.a.pressed && p1.lastKey === "a") {
      p1.velocity.x = -5;
    } else if (KEYS.d.pressed && p1.lastKey === "d") {
      p1.velocity.x = 5;
    }
    if (KEYS.ArrowLeft.pressed && p2.lastKey === "ArrowLeft") {
      p2.velocity.x = -5;
    } else if (KEYS.ArrowRight.pressed && p2.lastKey === "ArrowRight") {
      p2.velocity.x = 5;
    }
  }

  animate();

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w": {
        p1.velocity.y = -20;
        break;
      }
      case "d": {
        KEYS.d.pressed = true;
        p1.lastKey = "d";
        break;
      }
      case "a": {
        KEYS.a.pressed = true;
        p1.lastKey = "a";
        break;
      }
      // P2
      case "ArrowUp": {
        p2.velocity.y = -20;
        break;
      }
      case "ArrowRight": {
        KEYS.ArrowRight.pressed = true;
        p2.lastKey = "ArrowRight";
        break;
      }
      case "ArrowLeft": {
        KEYS.ArrowLeft.pressed = true;
        p2.lastKey = "ArrowLeft";
        break;
      }
    }
  });
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "d": {
        KEYS.d.pressed = false;
        break;
      }
      case "a": {
        KEYS.a.pressed = false;
        break;
      }
      // P2
      case "ArrowRight": {
        KEYS.ArrowRight.pressed = false;
        break;
      }
      case "ArrowLeft": {
        KEYS.ArrowLeft.pressed = false;
        break;
      }
    }
  });
}
