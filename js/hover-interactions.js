/**
 * Hover Interactions Module
 * Manages interactive hover effects for space elements
 * Shows info container with text when hovering over space objects
 */

// --- 1. Create ONE master timeline for the container movement ---

const masterHoverTimeline = gsap.timeline({ paused: true });

// Detect mobile to use correct animation direction
const isMobile = window.matchMedia("(max-width: 700px)").matches;

masterHoverTimeline
  .to(".info-container", {
    y: isMobile ? -300 : 300, // Mobile: UP, Desktop: DOWN
    duration: 1,
    ease: "power4.out",
  })
  .to(
    ".alien-sidekick",
    {
      y: -200, // Mobile: more upward movement
      duration: 1,
      ease: "power4.out",
    },
    "<"
  );

// --- 2. Create a variable to hold the text animation ---
let textTween;

/**
 * Kill the current text animation and clear the text
 * Used by the close button
 */
export function killTextTween() {
  console.log("killing tween");
  if (textTween) {
    textTween.kill();
  }
  gsap.set(".info-content-text", { text: "" });
  masterHoverTimeline.timeScale(3).reverse();
}

/**
 * Initialize hover interactions for all space elements
 * @param {Object} elementMap - Map of CSS selectors to hover text
 */
export function initHoverInteractions(elementMap) {
  Object.entries(elementMap).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.addEventListener("mouseenter", () => {
      // --- 3. Kill any previous text animation to prevent overlaps ---
      if (textTween) {
        textTween.kill();
      }

      // --- 4. Create the NEW text animation and play the master timeline ---
      // We start with blank text to ensure the typewriter effect restarts
      gsap.set(".info-content-text", { text: "" });
      textTween = gsap.to(".info-content-text", {
        duration: 1,
        text: text,
        ease: "none",
      });

      masterHoverTimeline.timeScale(1).play();
    });

    element.addEventListener("mouseleave", () => {
      // --- 5. Reverse the master timeline ---
      masterHoverTimeline.timeScale(3).reverse();
    });
  });
}

// ... (The rest of the file, like setupDoorTimelines, is fine) ...
export function setupDoorTimelines() {
  console.log("setting up door timelines");
  const doors = document.querySelectorAll(
    ".red-door, .yellow-door, .cyan-door"
  );

  doors.forEach((door) => {
    if (!door) return;
    const doorChild = door.querySelector(".door-img");
    const doorTimeline = gsap.to(doorChild, {
      x: 200,
      autoAlpha: 0,
      duration: 2,
      paused: true,
    });

    door.addEventListener("mouseenter", () => {
      console.log("mouse enter");
      doorTimeline.timeScale(1).play();
    });
    door.addEventListener("mouseleave", () => {
      doorTimeline.timeScale(1).reverse();
    });
  });
}

export function initComplexHoverInteractions(complexElements, appState) {
  Object.entries(complexElements).forEach(([key, config]) => {
    const element = document.querySelector(config.selector);
    if (!element) return;

    element.addEventListener("mouseenter", () => {
      // Kill any previous text animation
      if (textTween) {
        textTween.kill();
      }

      // FIX: Select the appropriate text based on current scene
      // If there's specific text for this scene, use it. Otherwise, use default.
      const currentScene = appState.currentScene;
      const textToDisplay =
        config.sceneText[currentScene] || config.sceneText.default;

      // Animate the text
      gsap.set(".info-content-text", { text: "" });
      textTween = gsap.to(".info-content-text", {
        duration: 1,
        text: textToDisplay,
        ease: "none",
      });

      masterHoverTimeline.timeScale(1).play();
    });

    element.addEventListener("mouseleave", () => {
      masterHoverTimeline.timeScale(3).reverse();
    });
  });
}
