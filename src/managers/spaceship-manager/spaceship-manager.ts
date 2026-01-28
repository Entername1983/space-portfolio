import type { IClickable } from "../../data/types";

const SPACESHIP_COLORS = [
  "blue",
  "green",
  "white",
  "yellow",
  "red",
  "green-yellow",
  "pink",
  "purple",
] as const;

const COLORS_MAPPING = {
  // MONITOR_CLICKABLES
  "#space-black-hole": "red",
  "#space-station": "blue",
  "#star": "purple",
  "#satellite": "white",
  "#space-whale": "pink",
  "#red-planet": "red",
  "#asteroid": "green-yellow",

  // SPACE_SCENE_CLICKABLES

  // DELEGATED_CLICKABLES
  "#display-content-container": "white",

  // DISPLAY_CLICKABLES
  "#control-projects": "blue",
  "#control-bio": "green",
  "#control-log": "purple",
  "#control-acorn": "green-yellow",
  "#control-design": "pink",
  "#lightspeed-btn": "white",

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
  private mobileCircuitBoardSvg!: HTMLElement | null;
  private mobileWindowSvgOutlines!: HTMLElement | null;
  private desktopControlPanel!: HTMLElement | null;
  private sonarContainer!: HTMLElement | null;
  private spaceshipMonitor!: HTMLElement | null;
  private sceneControls!: HTMLElement | null;

  constructor() {
    if (SpaceshipManager.instance) {
      return SpaceshipManager.instance;
    }

    this.windowSvgOutlines = document.querySelector(
      "#svg-spaceship-overlay-desktop",
    );
    this.circuitBoardSvg = document.querySelector("#desktop-side-decoration");
    this.mobileCircuitBoardSvg = document.querySelector(
      "#mobile-side-decoration",
    );
    this.mobileWindowSvgOutlines = document.querySelector(
      "#mobile-spaceship-overlay-mask",
    );
    this.desktopControlPanel = document.querySelector(
      "#control-pannel-container",
    );
    this.sonarContainer = document.querySelector("#sonar-container");
    this.spaceshipMonitor = document.querySelector("#spaceship-monitor");
    this.sceneControls = document.querySelector("#scene-controls");
  }
  changeSpaceshipWallColor(clickable: IClickable) {
    const colorToUse = COLORS_MAPPING[clickable.elementId];
    if (colorToUse) {
      console.log("changing color to", colorToUse);
      this.changeColorsTo(colorToUse);
    }
  }

  changeColorsTo(color: TSpaceshipColor) {
    this.removeAllColorClasses();
    this.addColorClass(color);
  }

  removeAllColorClasses() {
    SPACESHIP_COLORS.forEach((color) => {
      this.windowSvgOutlines?.classList.remove(color);
      this.circuitBoardSvg?.classList.remove(color);
      this.mobileCircuitBoardSvg?.classList.remove(color);
      this.mobileWindowSvgOutlines?.classList.remove(color);
      this.desktopControlPanel?.classList.remove(color);
      this.sonarContainer?.classList.remove(color);
      this.spaceshipMonitor?.classList.remove(color);
      this.sceneControls?.classList.remove(color);
    });
  }
  addColorClass(color: TSpaceshipColor) {
    console.log("adding this class", color);
    this.windowSvgOutlines?.classList.add(color);
    this.circuitBoardSvg?.classList.add(color);
    this.mobileCircuitBoardSvg?.classList.add(color);
    this.mobileWindowSvgOutlines?.classList.add(color);
    this.desktopControlPanel?.classList.add(color);
    this.sonarContainer?.classList.add(color);
    this.spaceshipMonitor?.classList.add(color);
    this.sceneControls?.classList.add(color);
  }
  changeToRandomColor() {
    const color: TSpaceshipColor =
      SPACESHIP_COLORS[Math.floor(Math.random() * SPACESHIP_COLORS.length)] ??
      SPACESHIP_COLORS[0];
    this.changeColorsTo(color);
  }
}
