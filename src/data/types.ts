export type TElementId = `#${string}`;
type TElementClass = `.${string}`;
export type TIDOrClass = TElementId | TElementClass;
export interface IClickable {
  elementId: TElementId;
  action: string;
  targetId: TIDOrClass | null;
  data: {};
}
