import { type IClickable } from "./types.js";

export const MONITOR_CLICKABLES: IClickable[] = [
  {
    elementId: "#space-black-hole",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-black-hole",
    data: {
      monitorTargetId: "#monitor-black-hole",
    },
  },
  {
    elementId: "#space-station",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-space-station",
    data: {
      monitorTargetId: "#monitor-space-station",
    },
  },
  {
    elementId: "#star",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-star",
    data: {
      monitorTargetId: "#monitor-star",
    },
  },
  {
    elementId: "#satellite",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-satellite",
    data: {
      monitorTargetId: "#monitor-satellite",
    },
  },
  {
    elementId: "#space-whale",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-space-whale",
    data: {
      monitorTargetId: "#monitor-space-whale",
    },
  },
  {
    elementId: "#red-planet",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-red-planet",
    data: {
      monitorTargetId: "#monitor-red-planet",
    },
  },
  {
    elementId: "#asteroid",
    action: "VIEW_SPACE_ELEMENT",
    targetId: "#monitor-asteroid",
    data: {
      monitorTargetId: "#monitor-asteroid",
    },
  },
];

export const SPACE_SCENE_CLICKABLES: IClickable[] = [
  {
    elementId: "#proceed-btn",
    action: "SPACE_SCENE_INTERACTION",
    targetId: null,
    data: {},
  },
  {
    elementId: "#back-btn",
    action: "RETURN_TO_SPACESHIP",
    targetId: null,
    data: {},
  },
];

export const DELEGATED_CLICKABLES: IClickable[] = [
  {
    elementId: "#display-content-container",
    action: "DELEGATED_INTERACTION",
    targetId: null,
    data: {},
  },
];

export const DISPLAY_CLICKABLES: IClickable[] = [
  {
    elementId: "#control-projects",
    action: "DISPLAY_INTERACTION",
    targetId: null,
    data: {
      monitorTargetId: "#monitor-spaceship",
    },
  },
  {
    elementId: "#control-bio",
    action: "DISPLAY_INTERACTION",
    targetId: null,
    data: {
      monitorTargetId: "#headshot-image",
    },
  },
  {
    elementId: "#control-log",
    action: "DISPLAY_INTERACTION",
    targetId: null,
    data: { monitorTargetId: "#monitor-spaceship" },
  },
  {
    elementId: "#control-coming-soon",
    action: "DISPLAY_INTERACTION",
    targetId: null,
    data: { monitorTargetId: "#monitor-spaceship" },
  },
  {
    elementId: "#control-design",
    action: "DISPLAY_INTERACTION",
    targetId: null,
    data: { monitorTargetId: "#monitor-spaceship" },
  },
  {
    elementId: "#lightspeed-btn",
    action: "TOGGLE_LIGHTSPEED",
    targetId: "#monitor-lightspeed",
    data: { monitorTargetId: "#monitor-lightspeed" },
  },
  {
    elementId: "#display-close-btn",
    action: "CLOSE_DISPLAY",
    targetId: null,
    data: {},
  },
  {
    elementId: "#projects-back-button",
    action: "GO_TO_PROJECT_MAIN_MENU",
    targetId: null,
    data: {},
  },
];

export const PROJECT_CLICKABLES: IClickable[] = [
  {
    elementId: "#li-swift-swatch",
    action: "PROJECT_INTERACTION",
    targetId: "#swift-swatch-logo",
    data: {
      monitorTargetId: "#swift-swatch-logo",
    },
  },
  {
    elementId: "#li-cephadex",
    action: "PROJECT_INTERACTION",
    targetId: "#cephadex-logo",
    data: {
      monitorTargetId: "#cephadex-logo",
    },
  },
  {
    elementId: "#li-cognaite",
    action: "PROJECT_INTERACTION",
    targetId: "#cognaite-logo",
    data: {
      monitorTargetId: "#cognaite-logo",
    },
  },
  {
    elementId: "#li-chair-the-fed",
    action: "PROJECT_INTERACTION",
    targetId: "#chair-the-fed-logo",
    data: {
      monitorTargetId: "#chair-the-fed-logo",
    },
  },
  {
    elementId: "#li-ai-story-tellers",
    action: "PROJECT_INTERACTION",
    targetId: "#ai-story-tellers-logo",
    data: {
      monitorTargetId: "#ai-story-tellers-logo",
    },
  },
  {
    elementId: "#li-coming-soon",
    action: "PROJECT_INTERACTION",
    targetId: "#coming-soon-logo",
    data: {
      monitorTargetId: "#coming-soon-logo",
    },
  },
  {
    elementId: "#li-blog",
    action: "PROJECT_INTERACTION",
    targetId: "#blog-logo",
    data: { monitorTargetId: "#blog-logo" },
  },
  {
    elementId: "#li-space-portfolio",
    action: "PROJECT_INTERACTION",
    targetId: "#monitor-spaceship",
    data: { monitorTargetId: "#monitor-spaceship" },
  },
];

// export const ALIEN_SIDEKICK_CLICKABLES: IClickable[] = [
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null, monitorTargetId: "#monitor-black-hole" },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null, monitorTargetId: "#monitor-black-hole" },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
//   {
//     elementId: "#space-black-hole",
//     action: "VIEW_SPACE_ELEMENT",
//     targetId: "#monitor-black-hole",
//     data: { message: null },
//   },
// ];

export const CLICKABLES = [
  ...DISPLAY_CLICKABLES,
  ...MONITOR_CLICKABLES,
  ...DELEGATED_CLICKABLES,
  ...SPACE_SCENE_CLICKABLES,
];
