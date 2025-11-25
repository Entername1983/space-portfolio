export class LayoutManager {
  constructor() {
    this.orientationBtn = document.querySelector("#mode-switcher");
    this.rootElement = document.body;

    this.orientationBtn.addEventListener("click", () => {
      const isPortrait =
        this.rootElement.getAttribute("data-orientation") === "portrait";
      if (isPortrait) {
        console.log("changing to lanscape");

        // Switch back to portrait
        this.rootElement.removeAttribute("data-orientation");
        this.orientationBtn.classList.remove("portrait");
      } else {
        console.log("changing to portrait");

        // Switch to landscape
        this.rootElement.setAttribute("data-orientation", "portrait");
        this.orientationBtn.classList.add("portrait");
      }
    });
  }
}
