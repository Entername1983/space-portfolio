import { Clickables, Hoverables } from "./clickables";
import { CLICKABLES } from "./data/clickables-data";
import { HOVERABLES } from "./data/hoverables-data";
import { Engine } from "./engine";
document.addEventListener("DOMContentLoaded", () => {
    new Engine();
    const clickableInstances = {};
    CLICKABLES.forEach((item, index) => {
        const key = `monitor-clickable${index}`;
        const instance = new Clickables(item);
        clickableInstances[key] = instance;
    });
    console.log("Clickable Instances", clickableInstances);
    const hoverableInstances = {};
    HOVERABLES.forEach((item, index) => {
        const key = `hoverables${index}`;
        const instance = new Hoverables(item);
        hoverableInstances[key] = instance;
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
