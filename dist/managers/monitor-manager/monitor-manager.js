import { AnimationManager } from "../animation-manager/animation-manager";
export class MonitorManager {
    static instance = null;
    monitor;
    monitorChildren;
    defaultMonitorDisplay;
    animationManager;
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
        this.monitorChildren.forEach((child) => {
            const childId = `#${child.id}`;
            this.animationManager.hideElement(childId);
        });
    }
    reInitialize() {
        this.clear();
        if (this.defaultMonitorDisplay == null) {
            console.error("default Monitor Display is null, returning");
            return;
        }
        const defaultMonitorDisplayID = `#${this.defaultMonitorDisplay.id}`;
        this.animationManager.revealElement(defaultMonitorDisplayID);
    }
    show(targetId) {
        this.clear();
        this.animationManager.revealElement(targetId);
    }
}
