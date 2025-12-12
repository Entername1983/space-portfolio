// This class is just responsible for taking elements and adding animations

import type { TIDOrClass } from "../../data/types";

export class AnimationManager {
  public static instance: AnimationManager | null = null;

  constructor() {
    if (AnimationManager.instance) {
      return AnimationManager.instance;
    }
    AnimationManager.instance = this;
  }

  hideElement(targetOrElement: TIDOrClass | HTMLElement | Element) {
    // Takes either a string that corresponds to an ID and fetches the element
    // Or takes the element itself
    let element = null;
    if (typeof targetOrElement === "string") {
      element = document.querySelector(`${targetOrElement}`);
    } else {
      element = targetOrElement;
    }
    if (element == null) {
      console.warn(`Element ${targetOrElement} not found`);
      return;
    }

    element.classList.remove("active");
  }
  revealElement(targetOrElement: TIDOrClass | HTMLElement | Element) {
    let element = null;
    if (typeof targetOrElement === "string") {
      element = document.querySelector(`${targetOrElement}`);
    } else {
      element = targetOrElement;
    }
    if (element == null) {
      console.warn(`Element ${targetOrElement} not found`);
      return;
    }
    element.classList.add("active");
  }
}
