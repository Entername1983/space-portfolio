import { Engine } from "./engine.js";

export class Clickables {
  constructor(elementId, actionType, target, data) {
    console.log(elementId);
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
