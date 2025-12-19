import type { TElementId, TIDOrClass } from "../../data/types";
import { AnimationManager } from "../animation-manager/animation-manager";

export class MonitorManager {
  public static instance: MonitorManager | null = null;

  private monitor!: HTMLElement | null;
  private monitorChildren!: Element[];
  private defaultMonitorDisplay!: HTMLElement | null;
  private animationManager!: AnimationManager;

  constructor() {
    if (MonitorManager.instance) {
      return MonitorManager.instance;
    }

    this.monitor = document.querySelector("#spaceship-monitor");
    if (this.monitor == null) {
      console.error("Monitor Element not found, returning");
      return;
    }
    this.monitorChildren = [...this.monitor.children];
    this.defaultMonitorDisplay = document.querySelector("#monitor-spaceship");
    this.animationManager = new AnimationManager();
  }
  clear() {
    this.monitorChildren.forEach((child: Element) => {
      const childId: TElementId = `#${child.id}`;
      this.animationManager.hideElement(childId);
    });
  }
  reInitialize() {
    this.clear();
    if (this.defaultMonitorDisplay == null) {
      console.error("default Monitor Display is null, returning");
      return;
    }
    const defaultMonitorDisplayID: TElementId = `#${this.defaultMonitorDisplay.id}`;
    this.animationManager.revealElement(defaultMonitorDisplayID);
  }
  show(targetId: TIDOrClass) {
    console.log(`Showing monitor target: ${targetId}`);
    this.clear();
    this.animationManager.revealElement(targetId);
  }
}
