import { LogContentManager } from "../log-content-manager/log-content-manager";
import { ProjectsContentManager } from "../projects-content-manager/projects-content-manager";
const DISPLAY_CONTENT_MAPPINGS = {
    "#control-projects": "projects.html",
    "#control-log": "log.html",
    "#control-bio": "bio.html",
    "#control-one": "one.html",
    "#control-acorn": "acorn.html",
};
export class DisplayManager {
    static instance = null;
    display;
    displayContentContainer;
    displayIsOpen;
    DISPLAY_CONTENT_MAPPINGS;
    projectsContentManager;
    logContentManager;
    TEMPLATES_PATH;
    constructor() {
        if (DisplayManager.instance) {
            return DisplayManager.instance;
        }
        DisplayManager.instance = this;
        this.display = document.querySelector("#spaceship-display");
        this.displayContentContainer = document.querySelector("#display-content-container");
        this.displayIsOpen = false;
        this.DISPLAY_CONTENT_MAPPINGS = DISPLAY_CONTENT_MAPPINGS;
        this.projectsContentManager = new ProjectsContentManager();
        this.logContentManager = new LogContentManager();
        this.TEMPLATES_PATH = "./templates/";
    }
    isOpen() {
        return this.displayIsOpen;
    }
    async show(clickable) {
        this.clearScreenContent();
        if (!this.displayIsOpen)
            this.openScreen();
        const templateString = await this.fetchDisplayContentTemplate(clickable.elementId);
        if (this.displayContentContainer == null) {
            console.error(`missing display content container element`);
            return;
        }
        this.displayContentContainer.insertAdjacentHTML("beforeend", templateString);
        this.displayContent();
        this.sortToSpecialContent(clickable);
    }
    // Switch here to activate extra content as needed
    sortToSpecialContent(clickable) {
        switch (clickable.elementId) {
            case "#control-bio":
                break;
            case "#control-one":
                break;
            case "#control-log":
                this.logContentManager.show();
                break;
            case "#control-one":
                break;
            case "#control-acorn":
                break;
        }
    }
    resetAndCloseDisplay() {
        this.closeScreen();
        this.removeContent();
        // this.clearScreenContent();
        this.displayIsOpen = false;
    }
    openScreen() {
        this.displayIsOpen = true;
        if (this.display == null) {
            console.error(`display is null`);
            return;
        }
        this.display.classList.add("open");
    }
    closeScreen() {
        this.displayIsOpen = false;
        if (this.display == null) {
            console.error(`display is null`);
            return;
        }
        this.display.classList.remove("open");
    }
    clearScreenContent() {
        if (this.displayContentContainer == null) {
            console.error(`displayContentContainer is null`);
            return;
        }
        this.displayContentContainer.innerHTML = "";
    }
    displayContent() {
        const displayContent = document.querySelector(".display-content");
        if (displayContent == null) {
            console.error(`displayContent is null`);
            return;
        }
        displayContent.classList.add("active");
    }
    removeContent() {
        const displayContent = document.querySelector(".display-content");
        if (displayContent == null) {
            console.error(`displayContent is null`);
            return;
        }
        displayContent.classList.remove("active");
    }
    fillScreenContent() { }
    async fetchDisplayContentTemplate(elementId) {
        const fetchPath = this.constructFetchPath(elementId);
        const templateString = await fetch(fetchPath).then((res) => res.text());
        return templateString;
    }
    constructFetchPath(elementId) {
        const path = this.TEMPLATES_PATH;
        return `${path}${this.DISPLAY_CONTENT_MAPPINGS[elementId]}`;
    }
}
