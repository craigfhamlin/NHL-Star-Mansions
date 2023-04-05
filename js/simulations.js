var aboutButton = document.getElementById("sim_button");
var navList1 = document.getElementById("item1");
var navList2 = document.getElementById("item2");
var navList3 = document.getElementById("item3");
var navList4 = document.getElementById("item4");

var navArray = [
  document.getElementById("item1"),
  document.getElementById("item2"),
  document.getElementById("item3"),
  document.getElementById("item4"),
];

const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    aboutButton.classList.toggle("sim_button_expand");
    navArray.forEach((navItem) => navItem.classList.toggle("nav_item_expand"));
    // navArray.forEach(function (navItem) {
    //     navItem.classList.toggle("nav_item_expand");
    //   });
  })
);

window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // Set canvas width and height
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create an array of particles
  var particles = [];
  for (var i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  // Define Particle class
  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.radius = Math.random() * 5 + 7;
  }

  // Update particles and draw Northern Lights
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -50) p.x = canvas.width + 50;
      if (p.y < -50) p.y = canvas.height + 50;
      if (p.x > canvas.width + 50) p.x = -50;
      if (p.y > canvas.height + 50) p.y = -50;

      // Draw particle
      ctx.beginPath();
      var gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.5)"); // blue
      gradient.addColorStop(0.5, "rgba(0, 128, 0, 0.3)"); // green
      gradient.addColorStop(1, "rgba(128, 0, 128, 0)"); // purple
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "yellow";
      ctx.font = p.radius + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("$", p.x, p.y);
    }

    // Schedule next frame
    requestAnimationFrame(draw);
  }

  // Start animation
  draw();
};
