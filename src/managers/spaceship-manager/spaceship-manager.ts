import type { IClickable } from "../../data/types";

const SPACESHIP_COLORS = [
  "blue",
  "green",
  "white",
  "yellow",
  "red",
  "green-yellow",
  "pink",
] as const;

const COLORS_MAPPING = {
  // MONITOR_CLICKABLES
  "#space-black-hole": "red",
  "#space-station": "blue",
  "#star": "yellow",
  "#satellite": "white",
  "#space-whale": "pink",
  "#red-planet": "red",
  "#asteroid": "green-yellow",

  // SPACE_SCENE_CLICKABLES
  "#proceed-btn": "green",
  "#back-btn": "red",

  // DELEGATED_CLICKABLES
  "#display-content-container": "white",

  // DISPLAY_CLICKABLES
  "#control-projects": "blue",
  "#control-bio": "green",
  "#control-log": "yellow",
  "#control-acorn": "green-yellow",
  "#control-design": "pink",
  "#lightspeed-btn": "white",
  "#display-close-btn": "red",
  "#projects-back-button": "yellow",

  // PROJECT_CLICKABLES
  "#li-swift-swatch": "green",
  "#li-cephadex": "blue",
  "#li-cognaite": "pink",
  "#li-chair-the-fed": "yellow",
  "#li-ai-story-tellers": "white",
  "#li-acorn": "green-yellow",
  "#li-blog": "blue",
  "#li-space-portfolio": "green",
};

type TSpaceshipColor = (typeof SPACESHIP_COLORS)[number];

export class SpaceshipManager {
  public static instance: SpaceshipManager | null = null;

  private windowSvgOutlines!: HTMLElement | null;
  private circuitBoardSvg!: HTMLElement | null;

  constructor() {
    if (SpaceshipManager.instance) {
      return SpaceshipManager.instance;
    }

    this.windowSvgOutlines = document.querySelector(
      "#svg-spaceship-overlay-desktop",
    );
    this.circuitBoardSvg = document.querySelector("#desktop-side-decoration");
  }
  changeSpaceshipWallColor(clickable: IClickable) {
    const colorToUse = COLORS_MAPPING[clickable.elementId];
    console.log("changing color to", colorToUse);
    this.changeColorsTo(colorToUse);
  }

  changeColorsTo(color: TSpaceshipColor) {
    this.removeAllColorClasses();
    this.addColorClass(color);
  }

  removeAllColorClasses() {
    SPACESHIP_COLORS.forEach((color) => {
      this.windowSvgOutlines?.classList.remove(color);
      this.circuitBoardSvg?.classList.remove(color);
    });
  }
  addColorClass(color: TSpaceshipColor) {
    console.log("adding this class", color);
    this.windowSvgOutlines?.classList.add(color);
    this.circuitBoardSvg?.classList.add(color);
  }
  changeToRandomColor() {
    const color: TSpaceshipColor =
      SPACESHIP_COLORS[Math.floor(Math.random() * SPACESHIP_COLORS.length)] ??
      SPACESHIP_COLORS[0];
    this.changeColorsTo(color);
  }
}
