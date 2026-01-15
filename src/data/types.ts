export type TElementId = `#${string}`;
type TElementClass = `.${string}`;
export type TIDOrClass = TElementId | TElementClass;

interface IRecord {
  [key: string]: any;
}

interface IOptionalData extends IRecord {
  monitorTargetId?: TIDOrClass;
}

export interface IClickable {
  elementId: TElementId;
  action: string;
  targetId: TIDOrClass | null;
  data: IOptionalData;
}

interface IProjectFeatures {
  tech: string[];
  features: string[];
  notes: string[];
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  screenshotUrl: string;
  status: "Online" | "Offline" | "In Progress"; // Union type for stricter status checks
  link?: string; // Optional, as some projects might be offline
  github?: string; // Optional link to source code
  featureContainer: IProjectFeatures;
}

// This Record type ensures every key is a string and every value is a Project
export type IProjectList = Record<string, IProject>;
