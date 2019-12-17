const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Circle //interactivity with mouse
let mouse = {
  x: null,
  y: null
}

let maxRadius = 30;
let minRadius = 2;

window.addEventListener('mousemove', 
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius, r = changeColour(), g = changeColour(), b = changeColour()) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.r = r;
  this.g = g;
  this.b = b;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = `rgb(${r}, ${g}, ${b})`;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
  
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

function changeColour() {
  let rand = 0 - 0.5 + Math.random() * (255 - 0 + 1);
  return Math.round(rand);
}

let circleArray = [];

for (let i = 0; i < 700; i++) {
  let radius = 30;
  let x = Math.random() * (innerWidth - radius * 2);
  let y = Math.random() * (innerHeight - radius * 2);
  let dx = (Math.random() - 0.5) * 3;
  let dy = (Math.random() - 0.5) * 3;
  circleArray.push(new Circle(x, y, dx, dy, minRadius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();