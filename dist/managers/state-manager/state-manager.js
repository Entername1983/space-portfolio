class StateManager {
    isLightSpeed = false;
    clickList = [];
    activeClick = null;
    orientation = null;
    silencedAlien = false;
    seenProjects = [];
}
export const state = new StateManager();
