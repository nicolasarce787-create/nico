
const canvas = document.getElementById("tree");
const ctx = canvas.getContext("2d");

let hearts = [];

const colors = [
  "#ff1493",
  "#ff4081",
  "#ffb6c1",
  "#ffcc33",
  "#ff5252",
  "#f06292",
  "#ff80ab",
  "#e91e63"
];

function resize() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * 0.75 * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight * 0.75 + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createTree();
}

function createTree() {
  hearts = [];

  const width = window.innerWidth;
  const height = window.innerHeight * 0.75;

  const centerX = width * 0.68;
  const centerY = height * 0.35;

  const radiusX = width * 0.22;
  const radiusY = height * 0.25;

  for (let i = 0; i < 500; i++) {
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random());

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2*t) -
      2 * Math.cos(3*t) -
      Math.cos(4*t);

    hearts.push({
      x: centerX + (x * r / 16) * radiusX,
      y: centerY - (y * r / 17) * radiusY,
      size: Math.random() * 9 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.35 + 0.1,
      phase: Math.random() * 6
    });
  }
}

function drawHeart(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";
  ctx.fillText("♥", x, y);
}

let frame = 0;

function animate() {
  const width = window.innerWidth;
  const height = window.innerHeight * 0.75;

  ctx.clearRect(0, 0, width, height);

  // Tronco
  ctx.fillStyle = "#159b79";
  ctx.beginPath();
  ctx.moveTo(width * 0.65, height * 0.85);
  ctx.lineTo(width * 0.72, height * 0.85);
  ctx.lineTo(width * 0.70, height * 0.48);
  ctx.lineTo(width * 0.68, height * 0.48);
  ctx.closePath();
  ctx.fill();

  // Corazones
  hearts.forEach(heart => {
    heart.y += heart.speed;

    if (heart.y > height * 0.68) {
      heart.y = height * 0.12;
    }

    const movement =
      Math.sin(frame * 0.02 + heart.phase) * 1.5;

    drawHeart(
      heart.x + movement,
      heart.y,
      heart.size,
      heart.color
    );
  });

  frame++;
  requestAnimationFrame(animate);
}

resize();
window.addEventListener("resize", resize);
animate();

// CONTADOR: 7 DE ABRIL DE 2022
const startDate = new Date(2022, 3, 7, 0, 0, 0);

function updateCounter() {
  const now = new Date();

  let difference = Math.max(0, now - startDate);

  const days = Math.floor(difference / 86400000);
  difference %= 86400000;

  const hours = Math.floor(difference / 3600000);
  difference %= 3600000;

  const minutes = Math.floor(difference / 60000);
  const seconds = Math.floor(difference / 1000) % 60;

  document.getElementById("counter").textContent =
    `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
}

updateCounter();
setInterval(updateCounter, 1000);
