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
