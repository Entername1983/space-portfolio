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
  status: "Online" | "Offline" | "In Progress";
  link?: string;
  github?: string;
  featureContainer: IProjectFeatures;
}

export interface IInteractionResult {
  action: string;
  targetId: string | undefined;
}

export type IProjectList = Record<string, IProject>;
