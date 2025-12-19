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
        let orientation = null;
        if (isPortrait) {
          console.log("changing to lanscape");

          // Switch back to portrait
          this.rootElement.removeAttribute("data-orientation");
          this.orientationBtn?.classList.remove("portrait"); // Already handled null check above
          orientation = "landscape";
        } else {
          console.log("changing to portrait");

          // Switch to landscape
          this.rootElement.setAttribute("data-orientation", "portrait");
          this.orientationBtn?.classList.add("portrait"); // Already hadnled null check above
          orientation = "portrait";
        }
        const event = new CustomEvent("layoutChanged", {
          detail: {
            orientation: orientation,
          },
        });
        document.dispatchEvent(event);
      });
    }
  }
}
