import {} from "./types";
import { DELEGATED_CLICKABLES } from "./clickables-data";
const CONTROL_HOVERABLES = [
    {
        elementId: "#control-projects",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#control-log",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#control-design",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#control-coming-soon",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#control-bio",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#home-btn",
        action: "HOVER",
        targetId: "#home-btn",
        data: {},
    },
    {
        elementId: "#back-btn",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#lightspeed-btn",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#back-btn",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#email-me-btn",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#mode-switcher",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#scene-control-silence-btn",
        action: "HOVER",
        targetId: null,
        data: {},
    },
    {
        elementId: "#spaceship-monitor",
        action: "HOVER",
        targetId: null,
        data: {},
    },
];
export const HOVERABLES = [...CONTROL_HOVERABLES, ...DELEGATED_CLICKABLES];
