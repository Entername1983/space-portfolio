import { enterLightSpeed, exitLightSpeed } from "../canvas-animations.js";
import { AnimationManager } from "./animation-manager.js";
/** This class is in charge of switching out space scenes, such as the videos as well as managing lightspeed
 * canvas and spacestation **/
const SPACE_SCENE_MAPPINGS = {
  "space-black-hole": {
    scene: "spaceship",
    backdrop: "black-hole-space-scene",
  },
  star: {
    scene: "spaceship",
    backdrop: "star-space-scene",
  },
  "space-whale": {
    scene: "spaceship",
    backdrop: "space-whale-space-scene",
  },
  "infected-station": {
    scene: "spaceship",
    backdrop: "infected-station-space-scene",
  },
  "red-planet": {
    scene: "spaceship",
    backdrop: "red-planet-space-scene",
  },
  asteroid: {
    scene: "spaceship",
    backdrop: "red-planet-crater-space-scene",
  },
  satellite: {
    scene: "spaceship",
    backdrop: "infected-satellite-space-scene",
  },
  "space-station": {
    scene: "space-station",
    backdrop: "spacestation-interior-section",
  },
};
export class SpaceSceneManager {
  constructor() {
    // Button that confirms we want to start a scene
    this.spaceSceneMappings = SPACE_SCENE_MAPPINGS;
    this.backBtn = document.querySelector("#back-btn");
    this.spaceElements = document.querySelector("#space-elements");
    this.lightspeedIsOn = false;
    this.currentScene = "spaceship";
    this.currentBackdrop = "default";
    this.wrapper = document.querySelector("#wrapper");
    this.animationManager = new AnimationManager();
  }
  show(activeClick) {
    const scene = SPACE_SCENE_MAPPINGS[activeClick];
    if (scene == null) {
      console.log(`invalid activeClick for scene selection ${activeClick}`);
      return;
    }
    this.updateCurrentScene(scene.scene);
    this.updateCurrentBackdrop(scene.backdrop);
    switch (scene.scene) {
      case "spaceship":
        this.changeSpaceshipBackdrop(scene.backdrop);
    }
  }
  returnToSpaceship(activeClick) {
    const scene = SPACE_SCENE_MAPPINGS[activeClick];
    console.log(`returning to spaceship ${scene}`);
    this.hideBackdrop(scene.backdrop);
    this.hideBackBtn();
    this.showSpaceElements();
    this.updateCurrentScene("spaceship");
    this.updateCurrentBackdrop("default");
  }
  changeSpaceshipBackdrop(backdrop) {
    console.log(`changing spaceship scene ${backdrop}`);
    this.reavealBackdrop(backdrop);
    this.hideSpaceElements();
    this.revealBackBtn();
  }
  lightspeedIsEnabeled() {
    return this.lightspeedIsOn;
  }

  getElementQuadrant(element, container) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    console.log("element", element);
    console.log("elementRect", elementRect);
    console.log("container", container);
    console.log("containerRect", containerRect);
    // Calculate container center
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

    // Calculate element center
    const elementCenterX = elementRect.left + elementRect.width / 2;
    const elementCenterY = elementRect.top + elementRect.height / 2;

    // Determine quadrant based on position relative to container center
    const isLeft = elementCenterX < containerCenterX;
    const isTop = elementCenterY < containerCenterY;

    if (isTop && isLeft) return "top-left";
    if (isTop && !isLeft) return "top-right";
    if (!isTop && isLeft) return "bottom-left";
    return "bottom-right";
  }

  engageLightspeed() {
    this.lightspeedIsOn = true;

    // Get all child elements of space-elements
    const children = Array.from(this.spaceElements.children);

    // Apply quadrant-based animations to each element (except satellite and asteroid)

    // Wait for animations to complete before triggering lightspeed canvas
    enterLightSpeed();

    setTimeout(() => {
      children.forEach((child) => {
        // Skip satellite and asteroid elements - they just disappear
        if (child.id === "satellite" || child.id === "asteroid") {
          child.style.opacity = "0";
          return;
        }
        child.classList.remove("animated");
        const quadrant = this.getElementQuadrant(child, this.wrapper);
        const animationClass = `lightspeed-fly-out-${quadrant}`;
        child.classList.add(animationClass);
      });
      // this.hideSpaceElements();
    }, 2000);
  }

  updateCurrentScene(scene) {
    this.currentScene = scene;
  }
  updateCurrentBackdrop(backdrop) {
    this.currentBackdrop = backdrop;
  }

  returnCurrentScene() {
    this.currentScene();
  }
  returnCurrentBackdrop() {
    this.currentBackdrop();
  }

  disengageLightspeed() {
    this.lightspeedIsOn = false;
    exitLightSpeed();

    // Show elements first so they can be animated in
    this.spaceElements.style.display = "block";

    // Get all child elements of space-elements
    const children = Array.from(this.spaceElements.children);

    // Remove any fly-out classes and add fly-in classes
    children.forEach((child) => {
      // Remove any existing lightspeed classes
      child.classList.remove(
        "lightspeed-fly-out-top-left",
        "lightspeed-fly-out-top-right",
        "lightspeed-fly-out-bottom-left",
        "lightspeed-fly-out-bottom-right"
      );
      // Apply reverse animation based on quadrant
      const quadrant = this.getElementQuadrant(child, this.wrapper);
      const animationClass = `lightspeed-fly-in-${quadrant}`;
      child.classList.add(animationClass);
    });

    // After animations complete, clean up classes and ensure visibility
    setTimeout(() => {
      children.forEach((child) => {
        child.classList.remove(
          "lightspeed-fly-in-top-left",
          "lightspeed-fly-in-top-right",
          "lightspeed-fly-in-bottom-left",
          "lightspeed-fly-in-bottom-right"
        );
        child.classList.add("animated");
        child.classList.add("active");
      });

      this.spaceElements.style.opacity = "1";
    }, 2000);
  }

  hideSpaceElements() {
    console.log(this.spaceElements);
    this.spaceElements.style.display = "none";
    this.spaceElements.style.opacity = "0";
  }
  showSpaceElements() {
    this.spaceElements.style.display = "block";
    this.spaceElements.style.opacity = "1";
  }

  reavealBackdrop(backdrop) {
    const backdropElement = document.querySelector(`#${backdrop}`);
    backdropElement.style.display = "block";
    backdropElement.style.opacity = 1;
  }
  hideBackdrop(backdrop) {
    const backdropElement = document.querySelector(`#${backdrop}`);
    backdropElement.style.display = "none";
    backdropElement.style.opacity = 0;
  }
  revealBackBtn() {
    this.backBtn.style.display = "block";
    this.backBtn.style.opacity = "1";
  }
  hideBackBtn() {
    this.backBtn.style.display = "none";
    this.backBtn.style.opacity = "0";
  }
}
