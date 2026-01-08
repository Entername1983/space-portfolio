import { initCanvas } from "./canvas-animations";
import type { IClickable, TElementId } from "./data/types";
import { AlienAssistantManager } from "./managers/alien-manager/alien-manager";
import { DisplayManager } from "./managers/display-manager/display-manager";
import { IntroManager } from "./managers/intro-manager/intro-manager";
import { LayoutManager } from "./managers/layout-manager/layout-manager";
import { MonitorManager } from "./managers/monitor-manager/monitor-manager";
import { SpaceSceneManager } from "./managers/space-scene-manager/space-scene-manager";
import { state } from "./managers/state-manager/state-manager";
// TODO: Change the singleton pattern to the following structure:
// private static instance: Engine | null = null;

//   // 1. Private constructor: No one outside this class can call 'new Engine()'
//   private constructor() {
//     // Initialization logic here
//     console.log("Engine initialized once");
//   }

//   // 2. Controlled access point
//   public static getInstance(): Engine {
//     if (!Engine.instance) {
//       Engine.instance = new Engine();
//     }
//     return Engine.instance;
//   }

export class Engine {
  public static instance: Engine | null = null;

  private introManager!: IntroManager;
  private alienAssistantManager!: AlienAssistantManager;
  private monitorManager!: MonitorManager;
  private displayManager!: DisplayManager;
  private spaceSceneManager!: SpaceSceneManager;
  private layoutManager!: LayoutManager;

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

    this.initialize();
    initCanvas();
    this.startIntro();
  }
  initialize() {
    this.layoutManager.checkOrientation();
    document.addEventListener(
      "layoutChanged",
      this.handleLayoutChange.bind(this)
    );
  }
  async startIntro() {
    await this.introManager.startIntro();
  }

  async handleInteraction(clickable: IClickable, event: MouseEvent) {
    console.log("element", clickable);
    console.log("STATE", state);
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
    state.activeClick = elementId;
    state.clickList.push(state.activeClick);
    console.log("click list:", state.clickList);
  }
  interactWithProjects(clickable: IClickable) {
    this.addClickToList(clickable.elementId);
    this.displayClickableOnMonitor(clickable);
  }
  viewSpaceElement(clickable: IClickable) {
    this.addClickToList(clickable.elementId);
    this.displayClickableOnMonitor(clickable);
    if (state.silencedAlien === true && state.activeClick != null) {
      this.spaceSceneManager.show(state.activeClick);
      return;
    }
    this.alienAssistantManager.show(clickable.elementId);
  }
  goToSpaceElement(clickable: IClickable) {}

  async interactWithDisplay(clickable: IClickable) {
    console.log("interacting with display");
    this.displayClickableOnMonitor(clickable);

    if (
      clickable.elementId.startsWith("#control") &&
      state.activeClick == clickable.elementId &&
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
    /** This is used to handle interactions of elements that are not initially loaded
     * in the DOM, using data target instead of standard clickable format **/
    const actionTargetId = this.extractActionAndTargetFromDelegatedClick(event);
    if (actionTargetId == null) {
      console.error(`missing actionTargetId`);
      return;
    }
    switch (actionTargetId.action) {
      case "PROJECT_VIEW":
        if (actionTargetId.targetId == null) {
          console.error(`missing targetId for project view`);
          return;
        }
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
    const element = document.querySelector(`#${projectName}-content`);
    console.log("element123:", element);
    console.log("viewing project:", projectName);
    this.addClickToList(`#${projectName}`);
    this.monitorManager.show(`#${projectName}-logo`);

    this.displayManager.projectsContentManager.show(`#${projectName}-content`);
  }
  handleSpaceSceneInteraction(clickable: IClickable, event: MouseEvent) {
    if (state.activeClick == null) {
      console.error(`activeClick is null`);
      return;
    }
    this.spaceSceneManager.show(state.activeClick);
  }
  handleReturnToSpaceship(clickable: IClickable, event: MouseEvent) {
    if (state.activeClick == null) {
      console.error(`activeClick is null`);
      return;
    }
    this.spaceSceneManager.returnToSpaceship(state.activeClick);
  }
  handleViewLog(actionTargetId) {
    this.displayManager.logContentManager.handleDelegatedInteraction(
      actionTargetId
    );
  }
  toggleLightSpeed(clickable: IClickable, event: MouseEvent) {
    if (!this.spaceSceneManager.lightspeedIsEnabeled()) {
      this.spaceSceneManager.engageLightspeed();
      if (clickable.targetId == null) {
        console.error(`missing targetId for display interaction`);
        return;
      }
      this.displayClickableOnMonitor(clickable);
    } else {
      this.spaceSceneManager.disengageLightspeed();
      this.monitorManager.reInitialize();
    }
  }
  handleHoverInteractions(clicklable: IClickable, event: MouseEvent) {
    if (state.silencedAlien === true) {
      return;
    }
    this.alienAssistantManager.showWithoutProceedButton(clicklable.elementId);
  }
  handleProceedToDestination(clickable: IClickable, event: MouseEvent) {
    console.log("not yet implmeneted");
  }
  displayClickableOnMonitor(clickable: IClickable) {
    if (clickable.data.monitorTargetId == null) {
      console.error(`missing targetId for display interaction`);
      console.log("clickable:", clickable);
      return;
    }
    this.monitorManager.show(clickable.data.monitorTargetId);
  }
}
