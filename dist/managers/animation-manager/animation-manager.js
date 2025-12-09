// This class is just responsible for taking elements and adding animations
export class AnimationManager {
    static instance = null;
    constructor() {
        if (AnimationManager.instance) {
            return AnimationManager.instance;
        }
        AnimationManager.instance = this;
    }
    hideElement(targetOrElement) {
        // Takes either a string that corresponds to an ID and fetches the element
        // Or takes the element itself
        let element = null;
        if (typeof targetOrElement === "string") {
            element = document.querySelector(`#${targetOrElement}`);
        }
        else {
            element = targetOrElement;
        }
        if (element == null) {
            console.warn(`Element ${targetOrElement} not found`);
            return;
        }
        element.classList.remove("active");
    }
    revealElement(targetOrElement) {
        let element = null;
        if (typeof targetOrElement === "string") {
            element = document.querySelector(`#${targetOrElement}`);
        }
        else {
            element = targetOrElement;
        }
        if (element == null) {
            console.warn(`Element ${targetOrElement} not found`);
            return;
        }
        element.classList.add("active");
    }
}
