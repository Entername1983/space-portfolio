import type { TElementId } from "../../data/types";
import { progressiveTextDisplayAnimation } from "../../util/utility";

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
      display: "flex",
    });
  }
  show(targetId: TElementId) {
    console.log("Showing project content:", targetId);
    this.hideMainMenu();
    const element = document.querySelector(targetId);
    console.log("ELEMENT HERE", element);
    if (element == null) {
      console.error(
        `element not found for projects content manager: ${targetId}`
      );
      return;
    }
    element.classList.add("active");
    progressiveTextDisplayAnimation(element);
    this.showBackButton();
  }

  showBackButton() {
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
    const mainMenu = document.querySelector("#projects-content-container");
    if (mainMenu == null) {
      console.error(`mainMenu not found for projects content manager`);
      return;
    }
    for (const child of mainMenu.children) {
      child.classList.remove("active");
      if (!(child instanceof HTMLElement)) continue;
      // child.style.display = "none";
      // child.style.opacity = "0";
    }
  }

  returnToMainScreen() {
    this.clearContent();
    this.hideBackBtn();
    this.revealMainMenu();
  }
}
