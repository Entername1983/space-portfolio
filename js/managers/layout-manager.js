export class LayoutManager {
  constructor() {
    this.orientationBtn = document.querySelector("#mode-switcher");
    this.rootElement = document.body;

    this.orientationBtn.addEventListener("click", () => {
      const isPortrait =
        this.rootElement.getAttribute("data-orientation") === "portrait";
      let orientation = null;
      if (isPortrait) {
        console.log("changing to lanscape");

        // Switch back to portrait
        this.rootElement.removeAttribute("data-orientation");
        this.orientationBtn.classList.remove("portrait");
        orientation = "landscape";
      } else {
        console.log("changing to portrait");

        // Switch to landscape
        this.rootElement.setAttribute("data-orientation", "portrait");
        this.orientationBtn.classList.add("portrait");
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
