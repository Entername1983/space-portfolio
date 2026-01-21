// Augment the global DocumentEventMap interface
interface LayoutChangedEventDetail {
  orientation: "portrait" | "landscape";
}

declare global {
  interface DocumentEventMap {
    layoutChanged: CustomEvent<LayoutChangedEventDetail>;
  }
}
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
export {};
