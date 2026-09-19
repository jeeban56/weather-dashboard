const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const statusText = document.getElementById("gameStatus");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

const paddle = { width: 14, height: 105, speed: 7 };
const player = { x: 28, y: canvas.height / 2 - paddle.height / 2, ...paddle };
const computer = { x: canvas.width - 42, y: canvas.height / 2 - paddle.height / 2, ...paddle };
const ball = { size: 14, x: canvas.width / 2, y: canvas.height / 2, speed: 6, velocityX: 6, velocityY: 3 };
const keys = { up: false, down: false };
let scores = { player: 0, computer: 0 };
let running = false;
let animationFrame;

function resetBall(direction = Math.random() > 0.5 ? 1 : -1) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = direction * ball.speed;
  ball.velocityY = (Math.random() * 4 - 2) || 1;
}

function resetGame() {
  scores = { player: 0, computer: 0 };
  playerScore.textContent = "0";
  computerScore.textContent = "0";
  player.y = computer.y = canvas.height / 2 - paddle.height / 2;
  resetBall();
}

function movePlayer() {
  if (keys.up) player.y -= player.speed;
  if (keys.down) player.y += player.speed;
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function moveComputer() {
  const target = ball.y - computer.height / 2;
  const difference = target - computer.y;
  computer.y += Math.sign(difference) * Math.min(Math.abs(difference), 4.5);
  computer.y = Math.max(0, Math.min(canvas.height - computer.height, computer.y));
}

function collides(paddleToCheck) {
  return ball.x < paddleToCheck.x + paddleToCheck.width &&
    ball.x + ball.size > paddleToCheck.x &&
    ball.y < paddleToCheck.y + paddleToCheck.height &&
    ball.y + ball.size > paddleToCheck.y;
}

function update() {
  movePlayer();
  moveComputer();
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if (ball.y <= 0 || ball.y + ball.size >= canvas.height) {
    ball.velocityY *= -1;
    ball.y = Math.max(0, Math.min(canvas.height - ball.size, ball.y));
  }

  if (collides(player) && ball.velocityX < 0) {
    ball.x = player.x + player.width;
    ball.velocityX = Math.abs(ball.velocityX) * 1.04;
    ball.velocityY += ((ball.y + ball.size / 2) - (player.y + player.height / 2)) * 0.08;
  }
  if (collides(computer) && ball.velocityX > 0) {
    ball.x = computer.x - ball.size;
    ball.velocityX = -Math.abs(ball.velocityX) * 1.04;
    ball.velocityY += ((ball.y + ball.size / 2) - (computer.y + computer.height / 2)) * 0.08;
  }

  if (ball.x + ball.size < 0) {
    scores.computer += 1;
    computerScore.textContent = scores.computer;
    roundOver("computer");
  } else if (ball.x > canvas.width) {
    scores.player += 1;
    playerScore.textContent = scores.player;
    roundOver("player");
  }
}

function roundOver(winner) {
  if (scores.player >= 7 || scores.computer >= 7) {
    running = false;
    cancelAnimationFrame(animationFrame);
    statusText.textContent = scores.player >= 7 ? "You win! Press Play again." : "Computer wins. Press Play again.";
    startButton.textContent = "Play again";
    return;
  }
  statusText.textContent = winner === "player" ? "Point for you!" : "Point for the computer";
  resetBall(winner === "player" ? 1 : -1);
}

function draw() {
  context.fillStyle = "#0d0c1d";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.setLineDash([8, 12]);
  context.strokeStyle = "rgba(184, 188, 255, .25)";
  context.beginPath(); context.moveTo(canvas.width / 2, 0); context.lineTo(canvas.width / 2, canvas.height); context.stroke();
  context.setLineDash([]);
  context.fillStyle = "#b8bcff";
  context.fillRect(player.x, player.y, player.width, player.height);
  context.fillStyle = "#8f95ff";
  context.fillRect(computer.x, computer.y, computer.width, computer.height);
  context.fillStyle = "#fff";
  context.shadowColor = "#b8bcff"; context.shadowBlur = 15;
  context.fillRect(ball.x, ball.y, ball.size, ball.size);
  context.shadowBlur = 0;
}

function gameLoop() {
  if (!running) return;
  update();
  draw();
  animationFrame = requestAnimationFrame(gameLoop);
}

function startGame() {
  if (scores.player >= 7 || scores.computer >= 7) resetGame();
  running = true;
  startButton.textContent = "Restart";
  statusText.textContent = "Game in progress";
  cancelAnimationFrame(animationFrame);
  gameLoop();
}

function setPlayerPosition(event) {
  const bounds = canvas.getBoundingClientRect();
  const y = (event.clientY - bounds.top) * (canvas.height / bounds.height);
  player.y = Math.max(0, Math.min(canvas.height - player.height, y - player.height / 2));
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") event.preventDefault();
  if (event.key === "ArrowUp") keys.up = true;
  if (event.key === "ArrowDown") keys.down = true;
  if (event.key === "Enter" && !running) startGame();
});
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") keys.up = false;
  if (event.key === "ArrowDown") keys.down = false;
});
canvas.addEventListener("mousemove", setPlayerPosition);
canvas.addEventListener("pointermove", setPlayerPosition);
startButton.addEventListener("click", startGame);

draw();
