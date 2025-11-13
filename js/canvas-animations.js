// --- Module-level State (Private to this file) ---
let stars = [];
let lightSpeedActive = false;
let starfieldCtx, interiorCtx, starfieldCanvas, interiorCanvas, center;
const numStars = 300;

// --- Private Helper Functions ---
function startTwinkle() {
  stars.forEach((star) => {
    gsap.killTweensOf(star);
    gsap.to(star, {
      alpha: Math.random() * 0.7 + 0.1,
      duration: Math.random() * 3 + 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random(),
    });
  });
}

export function enterLightSpeed() {
  if (lightSpeedActive) return;
  lightSpeedActive = true;
  stars.forEach((star) => {
    gsap.killTweensOf(star);
    star.x = center.x;
    star.y = center.y;
    star.angle = Math.random() * Math.PI * 2;
    star.alpha = Math.random() * 0.5 + 0.5;
    star.speed = 0;
    gsap.to(star, {
      speed: Math.random() * 25 + 5,
      duration: 3,
      ease: "power2.in",
    });
  });
}

export function exitLightSpeed() {
  if (!lightSpeedActive) return;
  stars.forEach((star, index) => {
    gsap.killTweensOf(star);
    const tween = gsap.to(star, {
      speed: 0,
      duration: 1.5,
      ease: "power2.out",
    });
    if (index === stars.length - 1) {
      tween.eventCallback("onComplete", () => {
        lightSpeedActive = false;
        startTwinkle();
      });
    }
  });
}

function drawStars() {
  starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);

  if (lightSpeedActive) {
    // --- Draw streaking lines ---
    stars.forEach((star) => {
      const prevX = star.x - Math.cos(star.angle) * star.speed * 2;
      const prevY = star.y - Math.sin(star.angle) * star.speed * 2;

      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;

      starfieldCtx.beginPath();
      starfieldCtx.moveTo(prevX, prevY);
      starfieldCtx.lineTo(star.x, star.y);
      starfieldCtx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
      starfieldCtx.lineWidth = star.radius;
      starfieldCtx.stroke();

      if (
        star.x < 0 ||
        star.x > starfieldCanvas.width ||
        star.y < 0 ||
        star.y > starfieldCanvas.height
      ) {
        star.x = center.x;
        star.y = center.y;
      }
    });
  } else {
    stars.forEach((star) => {
      starfieldCtx.beginPath();
      starfieldCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      starfieldCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      starfieldCtx.fill();
    });
  }

  requestAnimationFrame(drawStars);
}

// --- Public API (Exported Functions) ---

export function initCanvas(interiorImagePath) {
  starfieldCanvas = document.getElementById("starfield");

  if (!starfieldCanvas) return;

  starfieldCtx = starfieldCanvas.getContext("2d");

  // Get wrapper dimensions for proper sizing
  const wrapper = document.querySelector(".wrapper");
  const width = wrapper ? wrapper.offsetWidth : window.innerWidth;
  const height = wrapper ? wrapper.offsetHeight : window.innerHeight;

  center = { x: width / 2, y: height / 2 };

  // Create stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2,
      alpha: Math.random(),
    });
  }

  // Set sizes and start animations
  setAllCanvasSizes();
  window.addEventListener("resize", setAllCanvasSizes);
  startTwinkle();
  drawStars();
}

export function toggleLightSpeed(appState) {
  console.log("entered lightspeed function");
  if (!appState.isCurrentScene(appState.SCENES.SPACESHIP)) {
    console.error("It's too dangerous, we can't go to light speed here!");
    return;
  }

  if (appState.lightSpeedEnabled) {
    exitLightSpeed();
  } else {
    enterLightSpeed();
  }
  appState.toggleLightSpeed();
}

function setAllCanvasSizes() {
  const wrapper = document.querySelector(".wrapper");
  const width = wrapper ? wrapper.offsetWidth : window.innerWidth;
  const height = wrapper ? wrapper.offsetHeight : window.innerHeight;
  starfieldCanvas.width = width;
  starfieldCanvas.height = height;

  // Update center point when resizing
  center = { x: width / 2, y: height / 2 + height * 0.1 };
}
