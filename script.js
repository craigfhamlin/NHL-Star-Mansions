//create some particles
const count = 100;
const particleColors = ["white", "lightblue", "pink"];

for (let i = 0; i < count; i++) {
  createParticles();
}

// random position the starting position of the particles

function createParticles() {
  const particle = document.createElement("div");
  const container = document.querySelector(".container");
  particle.classList.add("particle");
  //randomly assign different background colors to newly created div element
  particle.style.backgroundColor =
    particleColors[Math.floor(gsap.utils.random(0, 3))];

  // random position the starting position of the particles
  const heightStart = gsap.utils.random(5, 10);
  const widthStart = gsap.utils.random(0, 40);

  //set starting properties
  gsap.set(particle, {
    y: `${heightStart}vh`,
    x: `${widthStart}vw`,
    //randomly generate different sizes
    scale: gsap.utils.random(0.5, 1),
  });

  container.append(particle);
  animateParticle(particle);
}

function animateParticle(particle, heightStart, widthStart) {
  const timelineTrajectory = gsap.timeline({
    repeat: -1, // infinite loop
    defaults: {
      //random speed
      duration: gsap.utils.random(3, 5),
      ease: "none",
    },
  });

  //we want to make the particles move round in a circular trajectory
  const widthEnd = gsap.utils.random(70, 80);
  const heightEnd = gsap.utils.random(70, 80);

  timelineTrajectory
    //make particle move let to right
    .to(particle, { x: `${widthEnd}vw` })
    //move them right to bottom
    .to(particle, {
      y: `${heightEnd}vh`,
      duration: gsap.utils.random(1.5, 2.5),
    })
    //return right to bottom
    .to(particle, { x: `${widthStart}vw` })
    .to(particle, {
      y: `${heightStart}vh`,
      duration: gsap.utils.random(1.5, 2.5),
    });
}

function returnToMain() {
  window.location.href = "index.html";
}

function fade() {
  const element = document.body;
  var op = 1;
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity =" + op * 100 + ")";
    op -= op * 0.1;
  }, 195);
}

setInterval(fade, 7500);
setInterval(returnToMain, 12000);

function homeScore() {
  let score = 100;
  setInterval(() => {
    score = score + 36;
    document.querySelector("#home-pts").innerHTML = score;
  }, 100);
}

function guestScore() {
  setInterval(() => {
    document.querySelector("#guest-pts").innerHTML = -1;
  }, 10300);
}

homeScore();
guestScore();
