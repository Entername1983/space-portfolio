import { initCanvas } from "./canvas-animations.js";
import { AlienAssistantManager } from "./managers/alien-manager.js";
import { DisplayManager } from "./managers/display-manager.js";
import { IntroManager } from "./managers/intro-manager.js";
import { LayoutManager } from "./managers/layout-manager.js";
import { MonitorManager } from "./managers/monitor-manager.js";
import { SpaceSceneManager } from "./managers/space-scene-manager.js";
export class Engine {
  constructor() {
    if (Engine.instance) {
      return Engine.instance;
    }
    this.introManager = new IntroManager();
    this.alienAssistantManager = new AlienAssistantManager();
    this.monitorManager = new MonitorManager("");
    this.displayManager = new DisplayManager("");
    this.spaceSceneManager = new SpaceSceneManager("");
    this.layoutManager = new LayoutManager();
    Engine.instance = this;
    this.clickList = [];
    this.activeClick = null;

    this.initialize();
    initCanvas();
  }
  async initialize() {
    document.addEventListener(
      "layoutChanged",
      this.handleLayoutChange.bind(this)
    );
    await this.introManager.startIntro();
  }

  async handleInteraction(element, actionType, target, data, event) {
    console.log("element", element);
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
        console.log("toggling lightspeed");
        await this.toggleLightSpeed(element, target, data, event);
        break;
      case "HOVER":
        this.handleHoverInteractions(element, target, data, event);
        break;
    }
  }
  handleLayoutChange(event) {
    const newOrientation = event.detail.orientation;
    console.log(`Engine detected layout change to: ${newOrientation}`);

    this.alienAssistantManager.updateOrientation(newOrientation);
  }
  addClickToList(element) {
    this.activeClick = element.id;
    this.clickList.push(this.activeClick);
  }
  interactWithProjects(element, target, data) {
    this.addClickToList(element);
    this.monitorManager.show(target);
  }
  viewSpaceElement(element, target, data) {
    this.addClickToList(element);
    this.monitorManager.show(target);
    this.alienAssistantManager.show(element.id);
  }
  goToSpaceElement(target, data) {}

  async interactWithDisplay(element, target, data) {
    this.monitorManager.show(data.monitorTargetId);
    if (
      element.id.startsWith("control") &&
      this.activeClick == element.id &&
      this.displayManager.isOpen()
    ) {
      this.displayManager.resetAndCloseDisplay();
      this.monitorManager.reInitialize();
    } else {
      await this.displayManager.show(element, target, data);
    }
    this.addClickToList(element);
  }
  handleDelegatedInteraction(element, target, data, event) {
    const actionTargetId = this.extractActionAndTargetFromDelegatedClick(event);
    switch (actionTargetId.action) {
      case "PROJECT_VIEW":
        this.handleViewProject(actionTargetId.targetId);
        break;
      case "MAIN_PROJECT_MENU":
        this.displayManager.projectsContentManager.returnToMainScreen();
        break;
      case "LOG_VIEW":
        this.handleViewLog(actionTargetId);
        break;
    }
  }
  extractActionAndTargetFromDelegatedClick(event) {
    const commandElement = event.target.closest("[data-action]");
    const action = commandElement.dataset.action;
    const targetId = commandElement.dataset.id;
    return { action: action, targetId: targetId };
  }
  handleViewProject(targetId) {
    this.addClickToList(targetId);
    this.monitorManager.show(`${targetId}-logo`);
    this.displayManager.projectsContentManager.show(`#${targetId}-content`);
  }
  handleSpaceSceneInteraction(element, target, data, event) {
    this.spaceSceneManager.show(this.activeClick);
  }
  handleReturnToSpaceship(element, target, data, event) {
    this.spaceSceneManager.returnToSpaceship(this.activeClick);
  }
  handleViewLog(actionTargetId) {
    this.displayManager.logContentManager.handleDelegatedInteraction(
      actionTargetId
    );
  }
  toggleLightSpeed(element, target, data, event) {
    if (!this.spaceSceneManager.lightspeedIsEnabeled()) {
      this.spaceSceneManager.engageLightspeed();
      this.monitorManager.show(target);
    } else {
      this.spaceSceneManager.disengageLightspeed();
      this.monitorManager.reInitialize();
    }
  }
  handleHoverInteractions(element, target, data, event) {
    this.alienAssistantManager.showWithoutProceedButton(element.id);
  }
}
