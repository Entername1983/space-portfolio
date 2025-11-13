import { initCanvas } from "./canvas-animations.js";
import { AlienAssistantManager } from "./managers/alien-manager.js";
import { DisplayManager } from "./managers/display-manager.js";
import { IntroManager } from "./managers/intro-manager.js";
import { MonitorManager } from "./managers/monitor-manager.js";
import { ProjectsContentManager } from "./managers/projects-content-manager.js";
import { SpaceSceneManager } from "./managers/space-scene-manager.js";

export class Engine {
  constructor() {
    if (Engine.instance) {
      console.log("Instance already initialized");
      return Engine.instance;
    }
    this.introManager = new IntroManager();
    this.alienAssistantManager = new AlienAssistantManager();
    this.monitorManager = new MonitorManager("");
    this.displayManager = new DisplayManager("");
    this.spaceSceneManager = new SpaceSceneManager("");
    this.projectsContentManager = new ProjectsContentManager();
    Engine.instance = this;
    this.clickList = [];
    this.activeClick = null;

    this.initialize();
    initCanvas();
  }
  async initialize() {
    console.log("initializing");
    await this.introManager.startIntro();
  }

  async handleInteraction(element, actionType, target, data, event) {
    console.log(this.clickList);

    switch (actionType) {
      case "VIEW_SPACE_ELEMENT":
        this.viewSpaceElement(element, target, data);
        break;
      case "DISPLAY_INTERACTION":
        await this.interactWithDisplay(element, target, data);
        break;
      case "PROJECT_INTERACTION":
        await this.interactWithProjects(element, target, data);
        break;
      case "DELEGATED_INTERACTION":
        // Using this to deal with content that is not present originally in the dom
        await this.handleDelegatedInteraction(element, target, data, event);
        break;
      case "PROCEED_TO_DESTINATION":
        await this.handleProceedToDestination(element, target, data, event);
        break;
      case "SPACE_SCENE_INTERACTION":
        await this.handleSpaceSceneInteraction(element, target, data, event);
        break;
      case "RETURN_TO_SPACESHIP":
        await this.handleReturnToSpaceship(element, target, data, event);
        break;
      case "TOGGLE_LIGHTSPEED":
        await this.toggleLightSpeed(element, target, data, event);
        break;
    }
  }
  addClickToList(element) {
    // Storing the latest interactable item, excludes things like proceedBtn
    this.activeClick = element.id;
    this.clickList.push(this.activeClick);
    console.log(this.clickList);
  }
  interactWithProjects(element, target, data) {
    this.addClickToList(element);
    console.log("interacting with projects");
    this.monitorManager.show(target);
  }
  viewSpaceElement(element, target, data) {
    console.log("viewing space element");
    this.addClickToList(element);
    this.monitorManager.show(target);
    this.alienAssistantManager.show(element.id);
  }
  goToSpaceElement(target, data) {}

  async interactWithDisplay(element, target, data) {
    console.log(`active click ${this.activeClick} elementId ${element.id}`);

    if (
      element.id.startsWith("control") &&
      this.activeClick == element.id &&
      this.displayManager.isOpen()
    ) {
      console.log("resetting and closing display");
      this.displayManager.resetAndCloseDisplay();
    } else {
      await this.displayManager.show(element, target, data);
    }
    this.monitorManager.show(`#${data.monitorTargetId}`);
    this.addClickToList(element);
  }
  handleDelegatedInteraction(element, target, data, event) {
    console.log("handling delegated interaction");
    const actionTargetId = this.handleDelegatedClick(event);
    switch (actionTargetId.action) {
      case "VIEW_PROJECT":
        this.handleViewProject(actionTargetId.targetId);
        break;
      case "MAIN_PROJECT_MENU":
        this.projectsContentManager.returnToMainScreen();
    }
  }
  handleDelegatedClick(event) {
    const commandElement = event.target.closest("[data-action]");
    const action = commandElement.dataset.action;
    const targetId = commandElement.dataset.id;
    console.log(`Action: ${action}, Target: ${targetId}`);
    return { action: action, targetId: targetId };
  }
  handleViewProject(targetId) {
    this.addClickToList(targetId);
    this.monitorManager.show(`#${targetId}-logo`);
    this.projectsContentManager.show(`#${targetId}-content`);
  }
  handleSpaceSceneInteraction(element, target, data, event) {
    console.log("handling space scene interaction");
    this.spaceSceneManager.show(this.activeClick);
  }
  handleReturnToSpaceship(element, target, data, event) {
    console.log("Returning to spaceship");
    this.spaceSceneManager.returnToSpaceship(this.activeClick);
  }
  toggleLightSpeed(element, target, data, event) {
    console.log("toggling light speed");
    // if lightspeed already enabled, disable
    if (!this.spaceSceneManager.lightspeedIsEnabeled()) {
      console.log("here");
      console.log(target);
      this.spaceSceneManager.engageLightspeed();
      this.monitorManager.show(target);
    } else {
      this.spaceSceneManager.disengageLightspeed();
      this.monitorManager.reInitialize();
    }
  }
}
