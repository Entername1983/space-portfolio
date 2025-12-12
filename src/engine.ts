import { initCanvas } from "./canvas-animations";
import type { IClickable, TElementId } from "./data/types";
import { AlienAssistantManager } from "./managers/alien-manager/alien-manager";
import { DisplayManager } from "./managers/display-manager/display-manager";
import { IntroManager } from "./managers/intro-manager/intro-manager";
import { LayoutManager } from "./managers/layout-manager/layout-manager";
import { MonitorManager } from "./managers/monitor-manager/monitor-manager";
import { SpaceSceneManager } from "./managers/space-scene-manager/space-scene-manager";

export class Engine {
  public static instance: Engine | null = null;

  private introManager!: IntroManager;
  private alienAssistantManager!: AlienAssistantManager;
  private monitorManager!: MonitorManager;
  private displayManager!: DisplayManager;
  private spaceSceneManager!: SpaceSceneManager;
  private layoutManager!: LayoutManager;
  private clickList!: TElementId[];
  private activeClick!: TElementId | null;

  constructor() {
    if (Engine.instance) {
      return Engine.instance;
    }
    this.introManager = new IntroManager();
    this.alienAssistantManager = new AlienAssistantManager();
    this.monitorManager = new MonitorManager();
    this.displayManager = new DisplayManager();
    this.spaceSceneManager = new SpaceSceneManager();
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

  async handleInteraction(clickable: IClickable, event: MouseEvent) {
    console.log("element", clickable);
    switch (clickable.action) {
      case "VIEW_SPACE_ELEMENT":
        this.viewSpaceElement(clickable);
        break;
      case "DISPLAY_INTERACTION":
        await this.interactWithDisplay(clickable);
        break;
      case "PROJECT_INTERACTION":
        await this.interactWithProjects(clickable);
        break;
      case "DELEGATED_INTERACTION":
        // Using this to deal with content that is not present originally in the dom
        await this.handleDelegatedInteraction(clickable, event);
        break;
      case "PROCEED_TO_DESTINATION":
        await this.handleProceedToDestination(clickable, event);
        break;
      case "SPACE_SCENE_INTERACTION":
        await this.handleSpaceSceneInteraction(clickable, event);
        break;
      case "RETURN_TO_SPACESHIP":
        await this.handleReturnToSpaceship(clickable, event);
        break;
      case "TOGGLE_LIGHTSPEED":
        console.log("toggling lightspeed");
        await this.toggleLightSpeed(clickable, event);
        break;
      case "HOVER":
        this.handleHoverInteractions(clickable, event);
        break;
    }
  }
  handleLayoutChange(event: CustomEvent) {
    const newOrientation = event.detail.orientation;
    console.log(`Engine detected layout change to: ${newOrientation}`);

    this.alienAssistantManager.updateOrientation(newOrientation);
  }
  addClickToList(elementId: TElementId) {
    this.activeClick = elementId;
    this.clickList.push(this.activeClick);
  }
  interactWithProjects(clickable: IClickable) {
    this.addClickToList(clickable.elementId);
    this.monitorManager.show(clickable.elementId);
  }
  viewSpaceElement(clickable: IClickable) {
    this.addClickToList(clickable.elementId);
    this.monitorManager.show(clickable.elementId);
    this.alienAssistantManager.show(clickable.elementId);
  }
  goToSpaceElement(clickable: IClickable) {}

  async interactWithDisplay(clickable: IClickable) {
    console.log("interacting with display");
    this.monitorManager.show(clickable.elementId);
    if (
      clickable.elementId.startsWith("control") &&
      this.activeClick == clickable.elementId &&
      this.displayManager.isOpen()
    ) {
      this.displayManager.resetAndCloseDisplay();
      this.monitorManager.reInitialize();
    } else {
      await this.displayManager.show(clickable);
    }
    this.addClickToList(clickable.elementId);
  }
  handleDelegatedInteraction(clickable: IClickable, event: Event) {
    const actionTargetId = this.extractActionAndTargetFromDelegatedClick(event);
    if (actionTargetId == null) {
      console.error(`missing actionTargetId`);
      return;
    }
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
  extractActionAndTargetFromDelegatedClick(event: Event) {
    if (event.target == null) {
      console.error(`missing event target`);
      return;
    }
    if (!(event.target instanceof HTMLElement)) {
      console.error(`event target is not an HTMLElement`);
      return;
    }
    const commandElement = event.target.closest("[data-action]");
    if (commandElement == null) {
      console.error(`missing command element`);
      return;
    }
    if (!(commandElement instanceof HTMLElement)) {
      console.error(`command element is not an HTMLElement`);
      return;
    }
    const action = commandElement.dataset.action;
    const targetId = commandElement.dataset.id;
    return { action: action, targetId: targetId };
  }
  handleViewProject(projectName: string) {
    console.log("viewing project:", projectName);
    this.addClickToList(`#${projectName}`);
    this.monitorManager.show(`#${projectName}-logo`);
    this.displayManager.projectsContentManager.show(`#${projectName}-content`);
  }
  handleSpaceSceneInteraction(clickable: IClickable, event: MouseEvent) {
    if (this.activeClick == null) {
      console.error(`activeClick is null`);
      return;
    }
    this.spaceSceneManager.show(this.activeClick);
  }
  handleReturnToSpaceship(clickable: IClickable, event: MouseEvent) {
    if (this.activeClick == null) {
      console.error(`activeClick is null`);
      return;
    }
    this.spaceSceneManager.returnToSpaceship(this.activeClick);
  }
  handleViewLog(actionTargetId) {
    this.displayManager.logContentManager.handleDelegatedInteraction(
      actionTargetId
    );
  }
  toggleLightSpeed(clickable: IClickable, event: MouseEvent) {
    if (!this.spaceSceneManager.lightspeedIsEnabeled()) {
      this.spaceSceneManager.engageLightspeed();
      this.monitorManager.show(clickable.elementId);
    } else {
      this.spaceSceneManager.disengageLightspeed();
      this.monitorManager.reInitialize();
    }
  }
  handleHoverInteractions(clicklable: IClickable, event: MouseEvent) {
    this.alienAssistantManager.showWithoutProceedButton(clicklable.elementId);
  }
  handleProceedToDestination(clickable: IClickable, event: MouseEvent) {
    console.log("not yet implmeneted");
  }
}
