//OLD WORKING VERSION

window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// variables to store the position of the user
let userX = window.innerWidth / 2;
let userY = window.innerHeight / 2;

// variable to store an array of bullets
const bullets = [];

// event listener to update cursor position on mouse move
window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// event listener to shoot bullets on mouse click
window.addEventListener("click", (event) => {
  // create a new bullet at the position of the user
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${userX}px`;
  bullet.style.top = `${userY}px`;
  bullets.push(bullet);
  document.body.appendChild(bullet);
  // remove the bullet after 1 second
  setTimeout(() => {
    bullet.remove();
  }, 500);
});

function stanimate() {
  // update position of user based on cursor position
  const dx = mouseX - userX;
  const dy = mouseY - userY;
  const angle = Math.atan2(dy, dx);
  userX += Math.cos(angle) * 10;
  userY += Math.sin(angle) * 10;
  document.querySelector(".user").style.transform = `rotate(${angle}rad)`;

  // request animation frame to update the animation loop
  requestAnimationFrame(stanimate);
}

// start the animation loop
stanimate();

var shotCounter = 0;
document.addEventListener("DOMContentLoaded", function () {
  var ball = document.getElementById("ball");
  var x = Math.floor(Math.random() * window.innerWidth);
  var y = Math.floor(Math.random() * window.innerHeight);
  var dx = 7;
  var dy = 7;

  function crazyAnimate() {
    x += dx;
    y += dy;

    if (x < 0 || x > window.innerWidth - 100) {
      // reverse horizontal direction
      dx = -dx;
    }

    if (y < 0 || y > window.innerHeight - 100) {
      // reverse vertical direction
      dy = -dy;
    }

    // randomly change direction
    if (Math.random() < 0.05) {
      dx = -dx;
      dy = -dy;
    }

    ball.style.left = x + "px";
    ball.style.top = y + "px";

    requestAnimationFrame(crazyAnimate);
  }

  function animate() {
    x += dx;
    y += dy;
    if (x < 0 || x > window.innerWidth - 100) {
      dx = -dx;
    }
    if (y < 0 || y > window.innerHeight - 100) {
      dy = -dy;
    }
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    requestAnimationFrame(animate);
  }

  animate();

  function explode(event) {
    shotCounter++;
    var ball = document.getElementById("ball");
    ball.id = "shot";
    var ballRect = ball.getBoundingClientRect();
    var ballX = ballRect.left + ballRect.width / 2;
    var ballY = ballRect.top + ballRect.height / 2;
    var clickX = event.clientX;
    var clickY = event.clientY;
    var distance = Math.sqrt(
      Math.pow(ballX - clickX, 2) + Math.pow(ballY - clickY, 2)
    );
    if (distance <= 200) {
      // change the background color to yellow
      ball.style.backgroundColor = "yellow";

      // create a new div element to represent the explosion
      var explosion = document.createElement("div");
      explosion.style.position = "absolute";
      explosion.style.top = y + "px";
      explosion.style.left = x + "px";
      explosion.style.width = "10px";
      explosion.style.height = "10px";
      explosion.style.borderRadius = "50%";
      explosion.style.backgroundColor = "orange";
      explosion.style.zIndex = "9999";
      document.body.appendChild(explosion);

      // make the ball spin quickly until opacity is 0
      var rotation = 0;
      var opacity = 1.0;
      var interval = setInterval(function () {
        rotation += 30;
        opacity -= 0.1;
        ball.style.transform = "rotate(" + rotation + "deg)";
        ball.style.opacity = opacity;
        if (opacity <= 0) {
          clearInterval(interval);
          document.body.removeChild(explosion);
          ball.style.transform = "none";
          ball.style.display = "none";
          if (shotCounter == 2) {
            setTimeout(function () {
              document.body.style.backgroundImage =
                "url('images/disneyworld.jpg')";
            }, 2500);
          } else if (shotCounter == 4) {
            setTimeout(function () {
              document.body.style.backgroundImage = "url('images/ukraine.jpg')";
              crazyAnimate();
            }, 2500);
          } else if (shotCounter == 5) {
            setTimeout(function () {
              location.replace("win-screen-z.html");
            }, 2500);
          }

          setTimeout(function () {
            ball.style.display = "block";
            ball.style.opacity = 1.0;
            ball.id = "ball";
          }, 5000);
        }
      }, 50);
    }
  }

  ball.addEventListener("click", explode);
});
