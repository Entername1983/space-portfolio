export class MonitorManager {
  constructor() {
    this.monitor = document.querySelector("#spaceship-monitor");
    this.monitorChildren = [...this.monitor.children];
    this.defaultMonitorDisplay = document.querySelector("#monitor-spaceship");
  }
  clear() {
    this.monitorChildren.forEach((child) => {
      child.classList.remove("active");
      this.activeClick = null;
    });
  }
  reInitialize() {
    this.clear();
    this.defaultMonitorDisplay.classList.add("active");
  }
  show(targetId) {
    console.log(`showing ${targetId}`);
    this.clear();
    const targetElement = document.querySelector(targetId);
    targetElement.classList.add("active");
    this.activeClick = targetId;
  }
}
