// This class is just responsible for taking elements and adding animations

export class AnimationManager {
  constructor() {}

  hideElement(targetOrElement) {
    // Takes either a string that corresponds to an ID and fetches the element
    // Or takes the element itself
    let element = null;
    if (typeof targetOrElement === "string") {
      element = document.querySelector(`#${targetOrElement}`);
    } else {
      element = targetOrElement;
    }
    element.classList.add("active");
  }
  revealElement(targetOrElement) {
    let element = null;
    if (typeof targetOrElement === "string") {
      element = document.querySelector(`#${targetOrElement}`);
    } else {
      element = targetOrElement;
    }
    element.classList.remove("active");
  }
}
