const DISPLAY_CONTENT_MAPPINGS = {
  "control-projects": "projects.html",
  "control-log": "log.html",
  "control-bio": "bio.html",
  "control-one": "one.html",
  "control-acorn": "acorn.html",
};

export class DisplayManager {
  constructor() {
    this.display = document.querySelector("#spaceship-display");
    // this is the one to fill with content
    this.displayContentContainer = document.querySelector(
      "#display-content-container"
    );

    this.displayIsOpen = false;
    this.DISPLAY_CONTENT_MAPPINGS = DISPLAY_CONTENT_MAPPINGS;
  }
  isOpen() {
    return this.displayIsOpen;
  }
  async show(element, target, data) {
    this.clearScreenContent();
    if (!this.displayIsOpen) this.openScreen();
    const templateString = await this.fetchDisplayContentTemplate(element.id);
    this.displayContentContainer.insertAdjacentHTML(
      "beforeend",
      templateString
    );
    this.displayContent();
  }
  resetAndCloseDisplay() {
    this.closeScreen();
    this.removeContent();
    this.clearScreenContent();
    this.displayIsOpen = false;
  }
  openScreen() {
    this.displayIsOpen = true;
    this.display.classList.add("open");
  }
  closeScreen() {
    console.log("closing screen");
    this.displayIsOpen = false;
    this.display.classList.remove("open");
  }
  clearScreenContent() {
    this.displayContentContainer.innerHTML = "";
  }
  displayContent() {
    const displayContent = document.querySelector(".display-content");
    displayContent.classList.add("active");
  }
  removeContent() {
    const displayContent = document.querySelector(".display-content");
    displayContent.classList.remove("active");
  }
  fillScreenContent() {}
  async fetchDisplayContentTemplate(elementId) {
    const fetchPath = this.constructFetchPath(elementId);
    const templateString = await fetch(fetchPath).then((res) => res.text());
    return templateString;
  }
  constructFetchPath(elementId) {
    const path = "./templates/";
    return `${path}${this.DISPLAY_CONTENT_MAPPINGS[elementId]}`;
  }
}
