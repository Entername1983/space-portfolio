const MONITORCONTENT = { MONITORCONTENT: {} };
const FRONTSCREENCONTENT = {
  projects: {
    name: "PROJECTS",
  },
  bio: {
    name: "BIO",
  },
  log: {
    name: "LOG",
  },
};
export const appState = {
  SCENES: {
    DEFAULT: "default",
    SPACESHIP: "spaceship",
    SPACESTATION: "spacestation",
    BLACKHOLE: "blackhole",
    STAR: "star",
    SPACEWHALE: "spacewhale",
    PLANET: "planet",
    ASTEROID: "asteroid",
    SATELLITE: "satellite",
    PLANET: "planet",
    CRATER: "crater",
    SATELLITE: "satellite",
  },
  currentScene: "default",
  MONITORCONTENT: MONITORCONTENT,
  currentMonitorContent: "1612",
  FRONTSCREENCONTENT: FRONTSCREENCONTENT,
  currentFrontScreenContent: "none",
  lightSpeedEnabled: false,

  toggleLightSpeed() {
    console.log("toggling light speed in app state");
    console.log(this.lightSpeedEnabled);
    this.lightSpeedEnabled = !this.lightSpeedEnabled;
  },

  setCurrentScene(scene) {
    if (this.SCENES[scene.toUpperCase()]) {
      this.currentScene = scene;
      console.log("Scene changed to:", this.currentScene);
    } else {
      console.error(`Attempted to set invalid scene: ${scene}`);
    }
  },
  isCurrentScene(scene) {
    return this.currentScene === scene;
  },
  setCurrentMonitorContent(monitorContent) {
    if (this.MONITORCONTENT[monitorContent.toUpperCase()]) {
      this.currentMonitorContent = monitorContent;
    } else {
      console.error(
        `Attempted to set invalid monitor content: ${monitorContent}`
      );
    }
  },
  isCurrentMonitorContent(monitorContent) {
    return this.currentMonitorContent === monitorContent;
  },
  setCurrentFrontScreenContent(frontScreenContent) {
    if (
      this.FRONTSCREENCONTENT[frontScreenContent] ||
      frontScreenContent === "none"
    ) {
      this.currentFrontScreenContent = frontScreenContent;
    } else {
      console.error(
        `Attempted to set invalid front screen content: ${frontScreenContent}`
      );
    }
  },
  isCurrentFrontScreenContent(frontScreenContent) {
    return this.currentFrontScreenContent === frontScreenContent;
  },
};
