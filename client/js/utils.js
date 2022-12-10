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
