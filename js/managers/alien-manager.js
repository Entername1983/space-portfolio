import { ALIEN_INFO_MAPPINGS } from "../data/alien-info-mappings.js";

export class AlienAssistantManager {
  constructor() {
    this.alien = document.querySelector("#alien-sidekick");
    this.info = document.querySelector("#alien-info");
    this.timeline = this.createRevealTimeline();
    this.autoHideTimeout = null;
    this.closeBtn = document.querySelector("#info-close-button");
    this.proceedBtn = document.querySelector("#proceed-btn");
    this.rootElement = document.body;
    this.orientation = "portrait";
    this.attachCloseBtnListener();
  }
  attachCloseBtnListener() {
    this.closeBtn.addEventListener("click", () => {
      this.clear();
    });
  }

  createRevealTimeline() {
    const masterHoverTimeline = gsap.timeline({ paused: true });
    masterHoverTimeline
      .to(this.info, {
        transform: "translate(0%, 0%)",

        duration: 1,
        ease: "power4.out",
      })
      .to(
        this.alien,
        {
          y: -200,
          duration: 1,
          ease: "power4.out",
        },
        "<"
      );
    return masterHoverTimeline;
  }

  clear() {
    this.clearInfo();
    this.hideAlien();
    this.hideInfo();
  }
  showWithoutProceedButton(elementId) {
    this.show(elementId);
    this.proceedBtn.classList.remove("active");
  }
  show(elementId) {
    this.proceedBtn.classList.add("active");
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    const DELAY_DURATION = 4000;
    this.fillInfo(elementId);
    this.revealAlien();
    this.autoHideTimeout = setTimeout(() => {
      this.clear();
    }, DELAY_DURATION);
  }

  hideAlien() {
    this.timeline.timeScale(3).reverse();
  }
  revealAlien() {
    this.timeline.timeScale(1).play();
  }
  hideInfo() {}
  revealInfo() {}
  clearInfo() {
    gsap.to(".info-content-text", {
      duration: 1,
      text: "...",
      ease: "none",
    });
  }
  fillInfo(elementId) {
    gsap.to(".info-content-text", {
      duration: 1,
      text: ALIEN_INFO_MAPPINGS[elementId],
      ease: "none",
    });
  }
}
