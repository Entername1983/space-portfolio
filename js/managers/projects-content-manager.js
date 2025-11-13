import { progressiveTextDisplayAnimation } from "../utility.js";

export class ProjectsContentManager {
  constructor() {}
  hideMainMenu() {
    const mainMenu = document.querySelector("#projects-main-menu");
    gsap.to(mainMenu, {
      autoAlpha: 0,
      display: "none",
      duration: 0,
    });
  }

  revealMainMenu() {
    const mainMenu = document.querySelector("#projects-main-menu");
    gsap.to(mainMenu, {
      autoAlpha: 1,
      display: "block",
    });
  }
  show(targetId) {
    this.hideMainMenu();
    console.log(`content to show ${targetId}`);
    const element = document.querySelector(targetId);
    element.classList.add("active");
    progressiveTextDisplayAnimation(element);
    this.showBackButton();
  }

  showBackButton() {
    console.log("displaying back btn");
    const backBtn = document.querySelector("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 1,
      display: "block",
    });
  }
  hideBackBtn() {
    const backBtn = document.querySelector("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 0,
      display: "none",
    });
  }
  clearContent() {
    console.log("clearing content");
    const mainMenu = document.querySelector("#projects-content-container");
    for (const child of mainMenu.children) {
      child.classList.remove("active");
      child.style.display = "none";
      child.style.opacity = "0";
    }
  }

  returnToMainScreen() {
    this.clearContent();
    this.hideBackBtn();
    this.revealMainMenu();
  }
}
