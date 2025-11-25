import { AnimationManager } from "./animation-manager.js";

export class MonitorManager {
  constructor() {
    this.monitor = document.querySelector("#spaceship-monitor");
    this.monitorChildren = [...this.monitor.children];
    this.defaultMonitorDisplay = document.querySelector("#monitor-spaceship");
    this.animationManager = new AnimationManager();
  }
  clear() {
    this.monitorChildren.forEach((child) => {
      this.animationManager.hideElement(child);
    });
  }
  reInitialize() {
    this.clear();
    this.animationManager.revealElement(this.defaultMonitorDisplay);
  }
  show(targetId) {
    this.clear();
    this.animationManager.revealElement(targetId);
  }
}
