import type { IClickable, TElementId } from "../../data/types";
import { LogContentManager } from "../log-content-manager/log-content-manager";
import { ProjectsContentManager } from "../projects-content-manager/projects-content-manager";

const DISPLAY_CONTENT_MAPPINGS: Record<TElementId, string> = {
  "#control-projects": "projects.html",
  "#control-log": "log.html",
  "#control-bio": "bio.html",
  "#control-one": "one.html",
  "#control-acorn": "acorn.html",
} as const;

type TDisplayContentKeys = keyof typeof DISPLAY_CONTENT_MAPPINGS;

export class DisplayManager {
  public static instance: DisplayManager | null = null;

  private display!: HTMLElement | null;
  private displayContentContainer!: HTMLElement | null;
  private displayIsOpen!: boolean;
  private DISPLAY_CONTENT_MAPPINGS!: Record<TElementId, string>;
  public projectsContentManager!: ProjectsContentManager;
  public logContentManager!: LogContentManager;
  private TEMPLATES_PATH!: string;
  private closeDisplayBtn!: HTMLElement | null;

  constructor() {
    if (DisplayManager.instance) {
      return DisplayManager.instance;
    }
    DisplayManager.instance = this;
    this.display = document.querySelector("#spaceship-display");
    this.displayContentContainer = document.querySelector(
      "#display-content-container"
    );
    this.displayIsOpen = false;
    this.DISPLAY_CONTENT_MAPPINGS = DISPLAY_CONTENT_MAPPINGS;
    this.projectsContentManager = new ProjectsContentManager();
    this.logContentManager = new LogContentManager();
    this.TEMPLATES_PATH = "./src/templates/";
    this.closeDisplayBtn = document.querySelector("#display-close-btn");
  }

  isOpen() {
    return this.displayIsOpen;
  }
  async show(clickable: IClickable) {
    this.clearScreenContent();
    if (!this.displayIsOpen) this.openScreen();
    const templateString = await this.fetchDisplayContentTemplate(
      clickable.elementId
    );
    if (this.displayContentContainer == null) {
      console.error(`missing display content container element`);
      return;
    }
    this.displayContentContainer.insertAdjacentHTML(
      "beforeend",
      templateString
    );
    this.displayContent();
    this.sortToSpecialContent(clickable);
    // delay by 1 s
    await new Promise((resolve) => setTimeout(resolve, 800));
    this.showCloseDisplayBtn();
  }

  showCloseDisplayBtn() {
    if (this.closeDisplayBtn == null) {
      console.error(`closeDisplayBtn is null`);
      return;
    }
    this.closeDisplayBtn.classList.add("active");
  }
  hideBackBtn() {
    if (this.closeDisplayBtn == null) {
      console.error(`closeDisplayBtn is null`);
      return;
    }
    this.closeDisplayBtn.classList.remove("active");
  }

  // Switch here to activate extra content as needed
  sortToSpecialContent(clickable: IClickable) {
    switch (clickable.elementId) {
      case "#control-bio":
        break;
      case "#control-one":
        break;
      case "#control-log":
        this.logContentManager.show();
        break;
      case "#control-acorn":
        break;
    }
  }

  resetAndCloseDisplay() {
    this.hideBackBtn();

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
  fillScreenContent() {}

  async fetchDisplayContentTemplate(elementId: TDisplayContentKeys) {
    const fetchPath = this.constructFetchPath(elementId);
    const templateString = await fetch(fetchPath).then((res) => res.text());
    return templateString;
  }
  constructFetchPath(elementId: TDisplayContentKeys) {
    const path = this.TEMPLATES_PATH;
    return `${path}${this.DISPLAY_CONTENT_MAPPINGS[elementId]}`;
  }
}
