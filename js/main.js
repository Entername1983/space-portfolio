import { Clickables, Hoverables } from "./clickables.js";
import { CLICKABLES } from "./data/clickables-data.js";
import { HOVERABLES } from "./data/hoverables-data.js";
import { Engine } from "./engine.js";

// GSAP plugins are loaded via CDN in HTML, register them
gsap.registerPlugin(
  TextPlugin,
  SplitText,
  ScrollTrigger,
  ScrollToPlugin,
  DrawSVGPlugin,
  MorphSVGPlugin
);

document.addEventListener("DOMContentLoaded", () => {
  new Engine();
  const clickableInstances = {};
  CLICKABLES.forEach((item, index) => {
    const key = `monitor-clickable${index}`;
    const instance = new Clickables(
      item.elementId,
      item.action,
      item.targetId,
      item.data
    );
    clickableInstances[key] = instance;
    const hoverableInstances = {};
    HOVERABLES.forEach((item, index) => {
      const key = `hoverables${index}`;
      const instance = new Hoverables(
        item.elementId,
        item.action,
        item.targetId,
        item.data
      );

      hoverableInstances[key] = instance;
    });
  });
  (function setGlowEffectRx() {
    const glowEffects = document.querySelectorAll(".glow-effect");

    glowEffects.forEach((glowEffect) => {
      const glowLines = glowEffect.querySelectorAll("rect");
      const rx = getComputedStyle(glowEffect).borderRadius;

      glowLines.forEach((line) => {
        line.setAttribute("rx", rx);
      });
    });
  })();
});
