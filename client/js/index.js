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
let TIMER = 60;
let TIMER_ID;

if (canvas && ctx) {
  canvas.width = 1024;
  canvas.height = 576;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  class Sprite {
    constructor({ position, velocity, color, offset }) {
      this.position = position;
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
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      // attack box
      if (this.isAttacking) {
        ctx.fillStyle = "green";
        ctx.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
    update() {
      this.draw();
      this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

  const p1 = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 10 },
    color: "red",
    offset: {
      x: 0,
      y: 0,
    },
  });
  const p2 = new Sprite({
    position: { x: 400, y: 100 },
    velocity: { x: 0, y: 0 },
    color: "blue",
    offset: {
      x: 50,
      y: 0,
    },
  });
  p1.draw(ctx);
  p2.draw(ctx);

  function retangularCollision(p1, p2) {
    return (
      p1.attackBox.position.x + p1.attackBox.width >= p2.position.x &&
      p1.attackBox.position.x <= p2.position.x + p2.width &&
      p1.attackBox.position.y + p1.attackBox.height >= p2.position.y &&
      p1.attackBox.position.y <= p2.position.y + p2.height
    );
  }

  function getMatchResult(result) {
    document.getElementById("matchIndicator").innerHTML = result;
    document.getElementById("matchIndicator").style.display = "flex";
    clearTimeout(TIMER_ID);
  }

  function decreaseTimer() {
    if (TIMER > 0) {
      TIMER_ID = setTimeout(decreaseTimer, 1000);
      TIMER -= 1;
      document.getElementById("timer").innerHTML = TIMER;
    } else {
      if (p1.health === p2.health) {
        getMatchResult("Tie");
      } else if (p1.health > p2.health) {
        getMatchResult("P1 WINS");
      } else getMatchResult("P2 WINS");
    }
  }

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    p1.update();
    p2.update();

    p1.velocity.x = 0;
    p2.velocity.x = 0;

    // players movments

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

    // detect colision
    if (retangularCollision(p1, p2) && p1.isAttacking) {
      document.getElementById("p2Health").style.width = p2.health + "%";
      p2.health -= 10;
    }

    if (retangularCollision(p2, p1) && p2.isAttacking) {
      document.getElementById("p1Health").style.width = p1.health + "%";
      p1.health -= 10;
    }
    // end game based on health
    if (p2.health === 0) getMatchResult("P1 WINS");
    if (p1.health === 0) getMatchResult("P2 WINS");
  }

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
      case " ": {
        p1.attack();
        break;
      }
      // P2
      case "j": {
        p2.attack();
        break;
      }
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
  animate();
  decreaseTimer();
}
