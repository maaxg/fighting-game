const Fighter = require("./fighter");
function createPlayer(id) {
  function createP1(ctx) {
    return new Fighter({
      context: ctx,
      id: id,
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
        takeHit: {
          imageSrc: "./assets/samuraiMack/Take Hit - white silhouette.png",
          maxFrames: 4,
        },
        death: {
          imageSrc: "./assets/samuraiMack/Death.png",
          maxFrames: 6,
        },
      },
      attackBox: {
        offset: {
          x: 100,
          y: 50,
        },
        width: 140,
        height: 50,
      },
    });
  }
  function createP2() {
    return new Fighter({
      id: id,
      position: { x: 400, y: 100 },
      velocity: { x: 0, y: 0 },
      color: "blue",
      offset: {
        x: 215,
        y: 198,
      },
      imageSrc: "./assets/kenji/Idle.png",
      maxFrames: 4,
      framesHold: 24,
      scale: 2.75,
      sprites: {
        idle: {
          imageSrc: "./assets/kenji/Idle.png",
          maxFrames: 4,
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
        takeHit: {
          imageSrc: "./assets/kenji/Take hit.png",
          maxFrames: 3,
        },
        death: {
          imageSrc: "./assets/kenji/Death.png",
          maxFrames: 7,
        },
      },
      attackBox: {
        offset: {
          x: -175,
          y: 50,
        },
        width: 175,
        height: 50,
      },
    });
  }
  return {
    createP1,
    createP2,
  };
}

module.exports = createPlayer;
