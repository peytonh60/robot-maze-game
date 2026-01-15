const robot = document.getElementById("robot");
const coordsBox = document.getElementById("coords");
const treasure = document.getElementById("treasure");
const winScreen = document.getElementById("winScreen");

let robotX = 80;
let robotY = 80;
robot.style.left = robotX + "px";
robot.style.top = robotY + "px";

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  coordsBox.textContent =
    "X: " + x.toFixed(1) + " | Y: " + y.toFixed(1);

  moveRobotToward(x, y);
});

function moveRobotToward(tx, ty) {
  const dx = tx - robotX;
  const dy = ty - robotY;
  const dist = Math.hypot(dx, dy);
  if (dist < 1) return;

  const speed = 3;
  const stepX = (dx / dist) * speed;
  const stepY = (dy / dist) * speed;

  const nextX = robotX + stepX;
  const nextY = robotY + stepY;

  if (!collides(nextX, nextY)) {
    robotX = nextX;
    robotY = nextY;
    robot.style.left = robotX + "px";
    robot.style.top = robotY + "px";

  }
  checkWin();
}

function collides(x, y) {
  const future = {
    left: x,
    top: y,
    right: x + robot.offsetWidth,
    bottom: y + robot.offsetHeight
  };

  const walls = document.querySelectorAll(".wall");
  for (let wall of walls) {
    const w = wall.getBoundingClientRect();
    const gameRect = document.getElementById("game").getBoundingClientRect();

    const wallRect = {
      left: w.left - gameRect.left,
      top: w.top - gameRect.top,
      right: w.right - gameRect.left,
      bottom: w.bottom - gameRect.top
    };

    if (
      future.left < wallRect.right &&
      future.right > wallRect.left &&
      future.top < wallRect.bottom &&
      future.bottom > wallRect.top
    ) {
      return true;
    }
  }
  return false;
}


function checkWin() {
  const rRect = robot.getBoundingClientRect();
  const tRect = treasure.getBoundingClientRect();

  const overlap =
    rRect.left < tRect.right &&
    rRect.right > tRect.left &&
    rRect.top < tRect.bottom &&
    rRect.bottom > tRect.top;

  if (overlap) {
    winScreen.style.display = "flex";
  }
}

function restart() {
  robotX = 50;
  robotY = 50;
  robot.style.left = robotX + "px";
  robot.style.top = robotY + "px";
  winScreen.style.display = "none";
}

