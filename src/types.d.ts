// Augment the global DocumentEventMap interface
interface LayoutChangedEventDetail {
  orientation: "portrait" | "landscape";
}

declare global {
  interface DocumentEventMap {
    layoutChanged: CustomEvent<LayoutChangedEventDetail>;
  }
}

export {};
