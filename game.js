const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mario = {
  x: 50,
  y: 300,
  width: 30,
  height: 40,
  color: "red",
  dx: 0,
  dy: 0,
  speed: 3,
  gravity: 0.5,
  jumpPower: -10,
  grounded: false
};

const keys = {};

const ground = {
  x: 0,
  y: 350,
  width: 800,
  height: 50,
  color: "#654321"
};

document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function update() {
  // Movement
  if (keys["ArrowRight"]) mario.dx = mario.speed;
  else if (keys["ArrowLeft"]) mario.dx = -mario.speed;
  else mario.dx = 0;

  if (keys["Space"] && mario.grounded) {
    mario.dy = mario.jumpPower;
    mario.grounded = false;
  }

  // Apply gravity
  mario.dy += mario.gravity;

  // Update position
  mario.x += mario.dx;
  mario.y += mario.dy;

  // Ground collision
  if (mario.y + mario.height >= ground.y) {
    mario.y = ground.y - mario.height;
    mario.dy = 0;
    mario.grounded = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = ground.color;
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

  // Draw Mario
  ctx.fillStyle = mario.color;
  ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();


