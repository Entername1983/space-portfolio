import { state } from "../state-manager/state-manager.js";

export class LayoutManager {
  public static instance: LayoutManager | null = null;

  private orientationBtn!: HTMLElement | null;
  private rootElement!: HTMLElement;

  constructor() {
    if (LayoutManager.instance) {
      return LayoutManager.instance;
    }

    this.orientationBtn = document.querySelector("#mode-switcher");
    this.rootElement = document.body;
    LayoutManager.instance = this;

    if (this.orientationBtn != null) {
      this.orientationBtn.addEventListener("click", () => {
        const isPortrait =
          this.rootElement.getAttribute("data-orientation") === "portrait";
        if (isPortrait) {
          this.switchToLandscape();
        } else {
          this.switchToPortrait();
        }
        const event = new CustomEvent("layoutChanged", {
          detail: {
            orientation: state.orientation,
          },
        });
        document.dispatchEvent(event);
      });
    }
  }
  checkOrientation() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      console.log("This is a mobile-sized screen.");
      state.orientation = "portrait";
    } else {
      console.log("This is a desktop-sized screen.");
      this.switchToLandscape();
    }
  }

  switchToLandscape() {
    console.log("changing to lanscape");

    // Switch back to portrait
    this.rootElement.removeAttribute("data-orientation");
    this.orientationBtn?.classList.remove("portrait"); // Already handled null check above
    state.orientation = "landscape";
  }
  switchToPortrait() {
    console.log("changing to portrait");

    // Switch to landscape
    this.rootElement.setAttribute("data-orientation", "portrait");
    this.orientationBtn?.classList.add("portrait"); // Already handled null check above
    state.orientation = "portrait";
  }
}
