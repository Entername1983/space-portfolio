import {} from "./types.js";
export const MONITOR_CLICKABLES = [
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
export const SPACE_SCENE_CLICKABLES = [
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
export const DELEGATED_CLICKABLES = [
    {
        elementId: "#display-content-container",
        action: "DELEGATED_INTERACTION",
        targetId: null,
        data: {},
    },
];
export const DISPLAY_CLICKABLES = [
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
        elementId: "#control-acorn",
        action: "DISPLAY_INTERACTION",
        targetId: null,
        data: { monitorTargetId: "#monitor-spaceship" },
    },
    {
        elementId: "#control-one",
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
];
export const PROJECT_CLICKABLES = [
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
        elementId: "#li-acorn",
        action: "PROJECT_INTERACTION",
        targetId: "#acorn-logo",
        data: {
            monitorTargetId: "#acorn-logo",
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
