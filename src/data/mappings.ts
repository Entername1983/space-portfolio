import type { TElementId } from "./types";

interface ISceneDetails {
  scene: string;
  backdrop: TElementId;
}

export const SPACE_SCENE_MAPPINGS: Record<TElementId, ISceneDetails> = {
  "#space-black-hole": {
    scene: "spaceship",
    backdrop: "#black-hole-space-scene",
  },
  "#star": {
    scene: "spaceship",
    backdrop: "#star-space-scene",
  },
  "#space-whale": {
    scene: "spaceship",
    backdrop: "#space-whale-space-scene",
  },
  "#infected-station": {
    scene: "spaceship",
    backdrop: "#infected-station-space-scene",
  },
  "#red-planet": {
    scene: "spaceship",
    backdrop: "#red-planet-space-scene",
  },
  "#asteroid": {
    scene: "spaceship",
    backdrop: "#red-planet-crater-space-scene",
  },
  "#satellite": {
    scene: "spaceship",
    backdrop: "#infected-satellite-space-scene",
  },
  "#space-station": {
    scene: "space-station",
    backdrop: "#spacestation-interior-section",
  },
};

export type TSpaceSceneMappings = typeof SPACE_SCENE_MAPPINGS;
