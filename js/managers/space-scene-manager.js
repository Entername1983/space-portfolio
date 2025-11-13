import { enterLightSpeed, exitLightSpeed } from "../canvas-animations.js";

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
  engageLightspeed() {
    this.lightspeedIsOn = true;
    this.hideSpaceElements();
    enterLightSpeed();
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
    this.showSpaceElements();
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
