//Arc //Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.stroke();

for (let i = 0; i < 150; i++) {
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  c.beginPath();
  c.arc(x, y, 30, 0, Math.PI * 2, false);
  c.stroke();
}



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
    // console.log(`r - ${r}, g - ${g}, b - ${b}`);
    // c.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    // c.stroke();
    let gradient = c.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
    gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
    gradient.addColorStop(1, 'rgb(255, 255, 255)');
    c.fillStyle = gradient;
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

    this.draw();
  }
}

function changeColour() {
  let rand = 0 - 0.5 + Math.random() * (255 - 0 + 1);
  return Math.round(rand);
}

function diffRadius() {
  let rand = 10 - 0.5 + Math.random() * (55 - 10 + 1);
  return Math.round(rand);
}

let circleArray = [];

for (let i = 0; i < 100; i++) {
  let radius = diffRadius();
  let x = Math.random() * (innerWidth - radius * 2);
  let y = Math.random() * (innerHeight - radius * 2);
  let dx = (Math.random() - 0.5) * 3;
  let dy = (Math.random() - 0.5) * 3;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
