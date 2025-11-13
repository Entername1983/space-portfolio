export const MONITOR_CLICKABLES = [
  {
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-black-hole",
    data: {},
  },
  {
    elementId: "#space-station",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-space-station",
    data: {},
  },
  {
    elementId: "#star",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-star",
    data: {},
  },
  {
    elementId: "#satellite",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-satellite",
    data: {},
  },
  {
    elementId: "#space-whale",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-space-whale",
    data: {},
  },
  {
    elementId: "#red-planet",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-red-planet",
    data: {},
  },
  {
    elementId: "#asteroid",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "monitor-asteroid",
    data: {},
  },
];

export const SPACE_SCENE_CLICKABLES = [
  {
    elementId: "#proceed-btn",
    action: "SPACE_SCENE_INTERACTION",
    targetId: "",
    data: {},
  },
  {
    elementId: "#back-btn",
    action: "RETURN_TO_SPACESHIP",
    targetId: "",
    data: {},
  },
];

export const DELEGATED_CLICKABLES = [
  {
    elementId: "#display-content-container",
    action: "DELEGATED_INTERACTION",
    targetId: "",
    data: {},
  },
  {
    elementId: "#display-content-container",
    action: "DELEGATED_INTERACTION",
    targetId: "",
    data: {},
  },
];

export const DISPLAY_CLICKABLES = [
  {
    elementId: "#control-projects",
    action: "DISPLAY_INTERACTION",
    targetId: "",
    data: {
      monitorTargetId: "monitor-spaceship",
    },
  },
  {
    elementId: "#control-bio",
    action: "DISPLAY_INTERACTION",
    targetId: "",
    data: {
      monitorTargetId: "headshot-image",
    },
  },
  {
    elementId: "#control-log",
    action: "DISPLAY_INTERACTION",
    targetId: "",
    data: { monitorTargetId: "monitor-spaceship" },
  },
  {
    elementId: "#control-acorn",
    action: "DISPLAY_INTERACTION",
    targetId: "",
    data: { monitorTargetId: "monitor-spaceship" },
  },
  {
    elementId: "#control-one",
    action: "DISPLAY_INTERACTION",
    targetId: "",
    data: { monitorTargetId: "monitor-spaceship" },
  },
  {
    elementId: "#lightspeed-btn",
    action: "TOGGLE_LIGHTSPEED",
    targetId: "monitor-lightspeed",
    data: { monitorTargetId: "monitor-spaceship" },
  },
];

export const PROJECT_CLICKABLES = [
  {
    elementId: "#li-swift-swatch",
    action: "PROJECT_INTERACTION",
    targetId: "swift-swatch-logo",
    data: {},
  },
  {
    elementId: "#li-cephadex",
    action: "PROJECT_INTERACTION",
    targetId: "cephadex-logo",
    data: {},
  },
  {
    elementId: "#li-cognaite",
    action: "PROJECT_INTERACTION",
    targetId: "cognaite-logo",
    data: {},
  },
  {
    elementId: "#li-chair-the-fed",
    action: "PROJECT_INTERACTION",
    targetId: "chair-the-fed-logo",
    data: {},
  },
  {
    elementId: "#li-ai-story-tellers",
    action: "PROJECT_INTERACTION",
    targetId: "ai-story-tellers-logo",
    data: {},
  },
  {
    elementId: "#li-acorn",
    action: "PROJECT_INTERACTION",
    targetId: "acorn-logo",
    data: {},
  },
  {
    elementId: "#li-blog",
    action: "PROJECT_INTERACTION",
    targetId: "blog-logo",
    data: {},
  },
];

export const ALIEN_SIDEKICK_CLICKABLES = [
  {
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: { message: "" },
  },
];

export const CLICKABLES = [
  ...DISPLAY_CLICKABLES,
  ...MONITOR_CLICKABLES,
  ...DELEGATED_CLICKABLES,
  ...SPACE_SCENE_CLICKABLES,
];
