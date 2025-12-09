import { enterLightSpeed, exitLightSpeed } from "../../canvas-animations";
import { SPACE_SCENE_MAPPINGS, } from "../../data/mappings";
import { AnimationManager } from "../animation-manager/animation-manager";
/** This class is in charge of switching out space scenes, such as the videos as well as managing lightspeed
 * canvas and spacestation **/
export class SpaceSceneManager {
    static instance = null;
    spaceSceneMappings;
    backBtn;
    sceneControls;
    spaceElements;
    lightspeedIsOn;
    currentScene;
    currentBackdrop;
    wrapper;
    animationManager;
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
    show(activeClick) {
        const scene = SPACE_SCENE_MAPPINGS[activeClick];
        if (scene == null) {
            console.error(`invalid activeClick for scene selection ${activeClick}`);
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
        if (scene == null) {
            console.error(`scene is null ${activeClick}`);
            return;
        }
        this.hideBackdrop(scene.backdrop);
        this.hideBackBtn();
        this.showSpaceElements();
        this.updateCurrentScene("spaceship");
        this.updateCurrentBackdrop("default");
    }
    changeSpaceshipBackdrop(backdrop) {
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
    hideSpaceElements() {
        this.animationManager.hideElement(this.spaceElements);
    }
    showSpaceElements() {
        this.animationManager.revealElement(this.spaceElements);
    }
    reavealBackdrop(backdrop) {
        this.animationManager.revealElement(backdrop);
    }
    hideBackdrop(backdrop) {
        this.animationManager.hideElement(backdrop);
    }
    revealBackBtn() {
        this.animationManager.revealElement(this.backBtn);
    }
    hideBackBtn() {
        this.animationManager.hideElement(this.backBtn);
    }
    revealSceneControls() {
        this.animationManager.revealElement(this.sceneControls);
    }
    hideSceneControls() {
        this.animationManager.hideElement(this.sceneControls);
    }
    getElementQuadrant(element, container) {
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
        if (isTop && isLeft)
            return "top-left";
        if (isTop && !isLeft)
            return "top-right";
        if (!isTop && isLeft)
            return "bottom-left";
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
