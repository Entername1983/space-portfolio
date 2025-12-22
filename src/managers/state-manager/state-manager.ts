import type { TElementId } from "../../data/types";

class StateManager {
  public isLightSpeed: boolean = false;
  public clickList: TElementId[] = [];
  public activeClick: TElementId | null = null;
  public orientation: "portrait" | "landscape" | null = null;
  public silencedAlien: boolean = false;
  public seenProjects: string[] = [];
}

export const state = new StateManager();
