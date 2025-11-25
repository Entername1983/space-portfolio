import { Engine } from "./engine.js";

export class Clickables {
  constructor(elementId, actionType, target, data) {
    this.element = document.querySelector(elementId);
    this.actionType = actionType;
    this.target = target;
    this.data = data;
    this.element.addEventListener("click", this.interact.bind(this));
  }
  async interact(event) {
    await Engine.instance.handleInteraction(
      this.element,
      this.actionType,
      this.target,
      this.data,
      event
    );
  }
}

export class Hoverables {
  constructor(elementId, actionType, target, data) {
    this.element = document.querySelector(elementId);
    this.actionType = actionType;
    this.target = target;
    this.data = data;
    this.handleEvent = this.interact.bind(this);
    this.element.addEventListener("mouseenter", this.handleEvent);
    this.element.addEventListener("mouseleave", this.handleEvent);
  }
  async interact(event) {
    await Engine.instance.handleInteraction(
      this.element,
      this.actionType,
      this.target,
      this.data,
      event
    );
  }
  disconnect() {
    if (this.element) {
      this.element.removeEventListener("mouseenter", this.handleEvent);
      this.element.removeEventListener("mouseleave", this.handleEvent);
    }
  }
}
