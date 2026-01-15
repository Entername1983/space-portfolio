import { enterLightSpeed, exitLightSpeed } from "../../canvas-animations";
import {
  SPACE_SCENE_MAPPINGS,
  type TSpaceSceneMappings,
} from "../../data/mappings";
import type { TElementId } from "../../data/types";
import { AnimationManager } from "../animation-manager/animation-manager";
/** This class is in charge of switching out space scenes, such as the videos as well as managing lightspeed
 * canvas and spacestation **/

export class SpaceSceneManager {
  public static instance: SpaceSceneManager | null = null;
  private spaceSceneMappings!: TSpaceSceneMappings;
  private backBtn!: HTMLElement | null;
  private sceneControls!: HTMLElement | null;
  private spaceElements!: HTMLElement | null;
  private lightspeedIsOn!: boolean;
  private currentScene!: string;
  private currentBackdrop!: string;
  private wrapper!: HTMLElement | null;
  private animationManager!: AnimationManager;

  constructor() {
    if (SpaceSceneManager.instance) {
      return SpaceSceneManager.instance;
    }

    this.spaceSceneMappings = SPACE_SCENE_MAPPINGS;
    this.backBtn = document.querySelector("#back-btn");
    this.sceneControls = document.querySelector("#scene-controls");
    this.spaceElements = document.querySelector("#space-elements");
    this.lightspeedIsOn = false;
    this.currentScene = "spaceship";
    this.currentBackdrop = "default";
    this.wrapper = document.querySelector("#wrapper");
    this.animationManager = new AnimationManager();
  }
  lightspeedIsEnabeled() {
    return this.lightspeedIsOn;
  }
  show(activeClick: TElementId) {
    console.log("showing space scene for", activeClick);
    const scene = SPACE_SCENE_MAPPINGS[activeClick];
    if (scene == null) {
      console.error(`invalid activeClick for scene selection ${activeClick}`);
      return;
    }
    console.log("scene to show", scene);
    this.updateCurrentScene(scene.scene);
    this.updateCurrentBackdrop(scene.backdrop);
    switch (scene.scene) {
      case "spaceship":
        this.changeSpaceshipBackdrop(scene.backdrop);
        break;

      default:
        console.error(`unhandled scene type ${scene.scene}`);
        break;
    }
  }
  checkIfActiveClickHasSceneMapping(activeClick: TElementId) {
    const scene = SPACE_SCENE_MAPPINGS[activeClick];
    return scene != null;
  }
  findLastValidSceneElement = (
    elements: TElementId[]
  ): TElementId | undefined => {
    while (elements.length > 0) {
      const lastElement = elements.pop();
      if (lastElement && lastElement in SPACE_SCENE_MAPPINGS) {
        return lastElement;
      }
    }

    return undefined;
  };
  returnToSpaceship(activeClick: TElementId) {
    const scene = SPACE_SCENE_MAPPINGS[activeClick];
    if (scene == null) {
      console.error(`scene is null ${activeClick}`);
      return;
    }
    this.hideBackdrop(scene.backdrop);
    this.hideBackBtn();
    this.showSpaceElements();
    this.updateCurrentScene("spaceship");
    this.updateCurrentBackdrop("#default");
  }
  changeSpaceshipBackdrop(backdrop: TElementId) {
    console.log("revealing backdrop", backdrop);
    this.reavealBackdrop(backdrop);
    this.hideSpaceElements();
    this.revealBackBtn();
  }

  engageLightspeed() {
    this.lightspeedIsOn = true;
    enterLightSpeed();
    this.hideSpaceElements();
  }
  disengageLightspeed() {
    this.lightspeedIsOn = false;
    exitLightSpeed();
    if (this.spaceElements == null) {
      console.error(`spaceElements missing`);
      return;
    }
    this.animationManager.revealElement(this.spaceElements);
  }
  updateCurrentScene(scene: string) {
    this.currentScene = scene;
  }
  updateCurrentBackdrop(backdrop: TElementId) {
    this.currentBackdrop = backdrop;
  }
  returnCurrentScene() {
    return this.currentScene;
  }
  returnCurrentBackdrop() {
    return this.currentBackdrop;
  }
  hideSpaceElements() {
    if (this.spaceElements == null) {
      console.error(`spaceElements missing`);
      return;
    }
    this.animationManager.hideElement(this.spaceElements);
  }
  showSpaceElements() {
    if (this.spaceElements == null) {
      console.error(`spaceElements missing`);
      return;
    }
    this.animationManager.revealElement(this.spaceElements);
  }
  reavealBackdrop(backdrop: TElementId) {
    console.log("revealing backdrop:", backdrop);
    this.animationManager.revealElement(backdrop);
  }
  hideBackdrop(backdrop: TElementId) {
    this.animationManager.hideElement(backdrop);
  }
  revealBackBtn() {
    if (this.backBtn == null) {
      console.error(`backBtn missing`);
      return;
    }
    this.animationManager.revealElement(this.backBtn);
  }
  hideBackBtn() {
    if (this.backBtn == null) {
      console.error(`backBtn missing`);
      return;
    }
    this.animationManager.hideElement(this.backBtn);
  }
  revealSceneControls() {
    if (this.sceneControls == null) {
      console.error(`sceneControls missing`);
      return;
    }
    this.animationManager.revealElement(this.sceneControls);
  }
  hideSceneControls() {
    if (this.sceneControls == null) {
      console.error(`sceneControls missing`);
      return;
    }
    this.animationManager.hideElement(this.sceneControls);
  }

  getElementQuadrant(element: HTMLElement, container: HTMLElement) {
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
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

  spreadSpaceElements() {
    // const children = Array.from(this.spaceElements.children);
    // Lightspeed star animation
    // setTimeout(() => {
    //   children.forEach((child) => {
    //     // Skip satellite and asteroid elements - they just disappear
    //     if (child.id === "satellite" || child.id === "asteroid") {
    //       child.style.opacity = "0";
    //       return;
    //     }
    //     child.classList.remove("animated");
    //     const quadrant = this.getElementQuadrant(child, this.wrapper);
    //     const animationClass = `lightspeed-fly-out-${quadrant}`;
    //     child.classList.add(animationClass);
    //   });
    // }, 2000);
  }
  narrowSpaceELements() {
    // Show elements first so they can be animated in
    // this.spaceElements.style.display = "block";
    // Get all child elements of space-elements
    // const children = Array.from(this.spaceElements.children);
    // Remove any fly-out classes and add fly-in classes
    // children.forEach((child) => {
    // Remove any existing lightspeed classes
    // if (child.id === "satellite" || child.id === "asteroid") {
    //   child.style.opacity = "0";
    //   return;
    // }
    // child.classList.remove(
    //   "lightspeed-fly-out-top-left",
    //   "lightspeed-fly-out-top-right",
    //   "lightspeed-fly-out-bottom-left",
    //   "lightspeed-fly-out-bottom-right"
    // );
    // Apply reverse animation based on quadrant
    // const quadrant = this.getElementQuadrant(child, this.wrapper);
    // const animationClass = `lightspeed-fly-in-${quadrant}`;
    //   child.classList.add(animationClass);
    // });
    // After animations complete, clean up classes and ensure visibility
    // setTimeout(() => {
    //   children.forEach((child) => {
    //     child.classList.remove(
    //       "lightspeed-fly-in-top-left",
    //       "lightspeed-fly-in-top-right",
    //       "lightspeed-fly-in-bottom-left",
    //       "lightspeed-fly-in-bottom-right"
    //     );
    //     child.classList.add("animated");
    //     child.classList.add("active");
    //   });
    //   this.spaceElements.style.opacity = "1";
    // }, 2000);
  }
}
