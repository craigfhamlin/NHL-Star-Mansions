// Get the canvas and image elements
const canvas = document.getElementById("canvas");
const image = document.getElementById("image");

// Get the context and center point of the canvas
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Set the rotation speed and initial angle
const speed = 0.05;
let angle = 0;

// Draw the rotating triangle with the image inside it
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Save the current context state
  ctx.save();

  // Rotate the context around the center point
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  // Draw the larger triangle with a yellow border
  const triangleSize = 100;
  ctx.beginPath();
  ctx.moveTo(-triangleSize, -triangleSize);
  ctx.lineTo(triangleSize, -triangleSize);
  ctx.lineTo(0, triangleSize);
  ctx.closePath();
  ctx.strokeStyle = "hwb(53 39% 0%)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Scale and draw the larger image inside the triangle
  const imageSize = Math.sqrt(2) * triangleSize * 0.8; // Calculate the maximum size of the image that fits inside the triangle, scaled up by 30%
  const yAdjustment = (imageSize * 0.15) / 2; // Calculate the adjustment value
  ctx.beginPath();
  ctx.moveTo(-triangleSize, -triangleSize);
  ctx.lineTo(triangleSize, -triangleSize);
  ctx.lineTo(0, triangleSize);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    image,
    -imageSize / 2,
    -imageSize * 0.675,
    imageSize,
    imageSize
  );

  // Restore the context state
  ctx.restore();

  // Update the angle for the next frame
  angle += speed;

  // Request the next frame
  requestAnimationFrame(draw);
}

// Start the animation
draw();
