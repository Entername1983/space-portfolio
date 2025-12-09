import { initCanvas } from "./canvas-animations";
import { AlienAssistantManager } from "./managers/alien-manager/alien-manager";
import { DisplayManager } from "./managers/display-manager/display-manager";
import { IntroManager } from "./managers/intro-manager/intro-manager";
import { LayoutManager } from "./managers/layout-manager/layout-manager";
import { MonitorManager } from "./managers/monitor-manager/monitor-manager";
import { SpaceSceneManager } from "./managers/space-scene-manager/space-scene-manager";
export class Engine {
    static instance = null;
    introManager;
    alienAssistantManager;
    monitorManager;
    displayManager;
    spaceSceneManager;
    layoutManager;
    clickList;
    activeClick;
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
        document.addEventListener("layoutChanged", this.handleLayoutChange.bind(this));
        await this.introManager.startIntro();
    }
    async handleInteraction(clickable, event) {
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
    handleLayoutChange(event) {
        const newOrientation = event.detail.orientation;
        console.log(`Engine detected layout change to: ${newOrientation}`);
        this.alienAssistantManager.updateOrientation(newOrientation);
    }
    addClickToList(clickable) {
        this.activeClick = clickable.elementId;
        this.clickList.push(this.activeClick);
    }
    interactWithProjects(clickable) {
        this.addClickToList(element);
        this.monitorManager.show(target);
    }
    viewSpaceElement(clickable) {
        this.addClickToList(element);
        this.monitorManager.show(target);
        this.alienAssistantManager.show(element.id);
    }
    goToSpaceElement(target, data) { }
    async interactWithDisplay(clickable) {
        console.log("interacting with display");
        this.monitorManager.show(data.monitorTargetId);
        if (element.id.startsWith("control") &&
            this.activeClick == element.id &&
            this.displayManager.isOpen()) {
            this.displayManager.resetAndCloseDisplay();
            this.monitorManager.reInitialize();
        }
        else {
            await this.displayManager.show(element, target, data);
        }
        this.addClickToList(element);
    }
    handleDelegatedInteraction(clickable, event) {
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
        this.displayManager.projectsContentManager.show(`${targetId}-content`);
    }
    handleSpaceSceneInteraction(clickable, event) {
        this.spaceSceneManager.show(this.activeClick);
    }
    handleReturnToSpaceship(clickable, event) {
        this.spaceSceneManager.returnToSpaceship(this.activeClick);
    }
    handleViewLog(actionTargetId) {
        this.displayManager.logContentManager.handleDelegatedInteraction(actionTargetId);
    }
    toggleLightSpeed(clickable, event) {
        if (!this.spaceSceneManager.lightspeedIsEnabeled()) {
            this.spaceSceneManager.engageLightspeed();
            this.monitorManager.show(target);
        }
        else {
            this.spaceSceneManager.disengageLightspeed();
            this.monitorManager.reInitialize();
        }
    }
    handleHoverInteractions(clicklable, event) {
        this.alienAssistantManager.showWithoutProceedButton(element.id);
    }
    handleProceedToDestination(clickable, event) {
        console.log("not yet implmeneted");
    }
}
