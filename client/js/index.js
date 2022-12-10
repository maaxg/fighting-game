const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

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

  const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./assets/background.png",
  });

  const shop = new Sprite({
    position: { x: 600, y: 128 },
    scale: 2.75,
    maxFrames: 6,
    imageSrc: "./assets/shop.png",
  });

  const p1 = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    color: "red",
    offset: {
      x: 215,
      y: 183,
    },
    imageSrc: "./assets/samuraiMack/Idle.png",
    maxFrames: 8,
    scale: 2.75,
    sprites: {
      idle: {
        imageSrc: "./assets/samuraiMack/Idle.png",
        maxFrames: 8,
      },
      run: {
        imageSrc: "./assets/samuraiMack/Run.png",
        maxFrames: 8,
      },
      jump: {
        imageSrc: "./assets/samuraiMack/Jump.png",
        maxFrames: 2,
      },
      fall: {
        imageSrc: "./assets/samuraiMack/Fall.png",
        maxFrames: 2,
      },
      attack1: {
        imageSrc: "./assets/samuraiMack/Attack1.png",
        maxFrames: 6,
      },
    },
  });
  const p2 = new Fighter({
    position: { x: 400, y: 0 },
    velocity: { x: 0, y: 0 },
    color: "blue",
    offset: {
      x: 215,
      y: 200,
    },
    imageSrc: "./assets/kenji/Idle.png",
    maxFrames: 4,
    framesHold: 24,
    scale: 2.75,
    sprites: {
      idle: {
        imageSrc: "./assets/kenji/Idle.png",
        maxFrames: 8,
      },
      run: {
        imageSrc: "./assets/kenji/Run.png",
        maxFrames: 8,
      },
      jump: {
        imageSrc: "./assets/kenji/Jump.png",
        maxFrames: 2,
      },
      fall: {
        imageSrc: "./assets/kenji/Fall.png",
        maxFrames: 2,
      },
      attack1: {
        imageSrc: "./assets/kenji/Attack1.png",
        maxFrames: 4,
      },
    },
  });
  p1.draw(ctx);
  p2.draw(ctx);

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.draw();
    shop.update();
    p1.update();
    p2.update();

    p1.velocity.x = 0;
    p2.velocity.x = 0;

    // players movments

    p2.image = p2.sprites.idle.image;

    if (KEYS.a.pressed && p1.lastKey === "a") {
      p1.velocity.x = -5;
      p1.switchSprite("run");
    } else if (KEYS.d.pressed && p1.lastKey === "d") {
      p1.velocity.x = 5;
      p1.switchSprite("run");
    } else {
      p1.switchSprite("idle");
    }

    if (p1.velocity.y < 0) {
      p1.switchSprite("jump");
    } else if (p1.velocity.y > 0) {
      p1.switchSprite("fall");
    }

    if (KEYS.ArrowLeft.pressed && p2.lastKey === "ArrowLeft") {
      p2.velocity.x = -5;
      p2.image = p2.sprites.run.image;
    } else if (KEYS.ArrowRight.pressed && p2.lastKey === "ArrowRight") {
      p2.velocity.x = 5;
      p2.image = p2.sprites.run.image;
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
      case " ": {
        p1.isAttacking = false;
        break;
      }
      // P2
      case "j": {
        p2.isAttacking = false;
        break;
      }
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
