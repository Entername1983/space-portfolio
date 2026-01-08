import gsap, { type Timeline } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ALIEN_INFO_MAPPINGS } from "../../data/alien-info-mappings";
import type { TElementId } from "../../data/types";
import { state } from "../state-manager/state-manager.js";
gsap.registerPlugin(TextPlugin);
export class AlienAssistantManager {
  public static instance: AlienAssistantManager | null = null;

  private alien!: HTMLElement | null;
  private info!: HTMLElement | null;
  private timeline!: Timeline;
  private autoHideTimeout!: number | null;
  private closeBtn!: HTMLElement | null;
  private proceedBtn!: HTMLElement | null;
  private rootElement!: HTMLElement;
  private orientation!: "portrait" | "landscape";
  private silenceBtn!: HTMLElement | null;
  private mainSilenceSwitch!: HTMLInputElement | null;
  private unsiliencedIcon!: HTMLElement | null;
  private silencedIcon!: HTMLElement | null;

  constructor() {
    if (AlienAssistantManager.instance) {
      return AlienAssistantManager.instance;
    }
    this.alien = document.querySelector("#alien-sidekick");
    this.info = document.querySelector("#alien-info");
    this.timeline = this.createRevealTimeline();
    this.autoHideTimeout = null;
    this.closeBtn = document.querySelector("#info-close-button");
    this.proceedBtn = document.querySelector("#proceed-btn");
    this.silenceBtn = document.querySelector("#silence-btn");
    this.mainSilenceSwitch = document.querySelector("#alien-silence-switch");
    this.unsiliencedIcon = document.querySelector(".unsilenced");
    this.silencedIcon = document.querySelector(".silenced");
    this.rootElement = document.body;
    this.orientation = "portrait";
    this.attachCloseBtnListener();
    this.attachSilenceBtnListeners();
    AlienAssistantManager.instance = this;
  }
  attachCloseBtnListener() {
    if (this.closeBtn == null) return;
    this.closeBtn.addEventListener("click", () => {
      this.clear();
    });
  }
  attachSilenceBtnListeners() {
    if (this.silenceBtn == null) return;
    this.silenceBtn.addEventListener("click", () => {
      if (state.silencedAlien == false) {
        if (this.mainSilenceSwitch !== null) {
          console.log("syncing main silence switch to off");
          this.mainSilenceSwitch.checked = false;
        }
      }
      this.clear();

      this.toggleSilenceAlien();
    });
    if (this.mainSilenceSwitch == null) return;
    this.mainSilenceSwitch.addEventListener("change", (event: Event) => {
      console.log("main silence switch changed");
      const target = event.target as HTMLInputElement;

      const isChecked = target.checked;
      this.toggleSilenceAlien();
    });
  }

  toggleSilenceAlien() {
    state.silencedAlien = !state.silencedAlien;
    if (state.silencedAlien === true) {
      this.silencedIcon?.classList.add("active");
      this.unsiliencedIcon?.classList.remove("active");
    } else {
      this.silencedIcon?.classList.remove("active");
      this.unsiliencedIcon?.classList.add("active");
    }
    console.log("Toggling alien silence to", state.silencedAlien);
  }
  isAlienSilenced(): boolean {
    return state.silencedAlien;
  }
  createRevealTimeline(): gsap.Timeline {
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
  showWithoutProceedButton(elementId: TElementId) {
    this.show(elementId);
    if (this.proceedBtn == null) {
      console.error(`proceedBtn missing`);
      return;
    }
    this.proceedBtn.classList.remove("active");
  }
  show(elementId: TElementId) {
    if (this.proceedBtn == null) {
      console.error(`proceedBtn missing`);
      return;
    }
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
  updateOrientation(newOrientation: "portrait" | "landscape") {
    console.log("updating alien orientation to", newOrientation);
    console.log("yet to be implemented");
  }
  fillInfo(elementId: TElementId) {
    console.log("Element ID:", elementId);
    console.log("Alien Info Mappings:", ALIEN_INFO_MAPPINGS[elementId]);
    gsap.to(".info-content-text", {
      duration: 1,
      text: ALIEN_INFO_MAPPINGS[elementId],
      ease: "none",
    });
  }
}
