import { Clickables } from "./clickables.js";
import { CLICKABLES } from "./data/clickables-data.js";
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
  console.log("initializing");
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
  });
});
