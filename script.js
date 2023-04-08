const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 200;

// Crea un oggetto particella
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 3 + 1;
    this.directionX = Math.random() * 3 - 1.5;
    this.directionY = Math.random() * 3 - 1.5;
  }

  // Disegna la particella sul canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Aggiorna la posizione della particella
  update() {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  }

  // Controlla se la particella esce dallo schermo e la fa tornare dall'altra parte
  checkBounds() {
    if (this.x > canvas.width + 10 || this.x < -10) {
      this.x = -this.directionX * 10;
    }
    if (this.y > canvas.height + 10 || this.y < -10) {
      this.y = -this.directionY * 10;
    }
  }

  // Crea la connessione tra le particelle vicine
  connect() {
    for (let i = 0; i < particlesArray.length; i++) {
      const distance = Math.sqrt(
        (this.x - particlesArray[i].x) ** 2 + (this.y - particlesArray[i].y) ** 2
      );
      if (distance < 60) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
        ctx.stroke();
      }
    }
  }
}

// Crea le particelle
function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Anima le particelle
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw();
    particlesArray[i].update();
    particlesArray[i].checkBounds();
    particlesArray[i].connect();
  }
}

init();
animate();