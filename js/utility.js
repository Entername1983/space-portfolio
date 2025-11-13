export function generateCorruptedText(length) {
  const chars =
    "!@#$%^&*()0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < Math.min(length, 20); i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function progressiveTextDisplayAnimation(contentElement) {
  // Show the container
  contentElement.style.display = "block";

  // Find all text elements to animate
  const textElements = contentElement.querySelectorAll("p, a, li");

  // Create timeline for terminal loading effect
  const timeline = gsap.timeline();

  // Add terminal loading prompt
  timeline.set(contentElement, {
    opacity: 1,
  });

  // Animate each text element with typewriter effect
  textElements.forEach((element, index) => {
    const originalText = element.textContent;

    // Clear text first
    gsap.set(element, { text: "" });

    // Add corruption effect first (random characters)
    if (originalText.length > 10) {
      timeline.to(
        element,
        {
          duration: 0.1,
          text: generateCorruptedText(originalText.length),
          ease: "none",
        },
        `+=${index * 0.05}`
      );
    }

    timeline.to(
      element,
      {
        duration: originalText.length * 0.01,
        text: originalText,
        ease: "none",
      },
      `+=${index * 0.05}`
    );
  });

  return timeline;
}
