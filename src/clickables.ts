import type { IClickable } from "./data/types.js";
import { Engine } from "./engine.js";

export class Clickables {
  private element: IClickable;
  private domElement: HTMLElement | null;

  constructor(element: IClickable) {
    this.element = element;
    this.domElement = document.querySelector(element.elementId);
    if (this.domElement != null) {
      this.domElement.addEventListener("click", this.interact.bind(this));
    } else {
      console.error(`Cannot find Dom Element with id ${element.elementId}`);
    }
  }
  async interact(event: MouseEvent): Promise<void> {
    if (Engine.instance == null) return;
    await Engine.instance.handleInteraction(this.element, event);
  }
}

export class Hoverables {
  private element: IClickable;
  private domElement: HTMLElement | null;
  private handleEvent: (event: MouseEvent) => void | Promise<void>;

  /**
   * Initializes the Hoverables class, finds the DOM element,
   * and attaches mouseenter and mouseleave event listeners.
   * @param element The configuration object containing elementId, action, etc.
   */
  constructor(element: IClickable) {
    this.element = element;
    this.domElement = document.querySelector(element.elementId);

    this.handleEvent = this.interact.bind(this);

    if (this.domElement) {
      this.domElement.addEventListener(
        "mouseenter",
        this.handleEvent as EventListener
      );
      this.domElement.addEventListener(
        "mouseleave",
        this.handleEvent as EventListener
      );
    } else {
      console.warn(
        `Hoverables: Could not find DOM element with selector: ${element.elementId}`
      );
    }
  }

  /**
   * Handles the hover interaction asynchronously.
   * @param event The native MouseEvent (or Event) object from the browser.
   */
  public async interact(event: MouseEvent): Promise<void> {
    if (Engine.instance == null) return;
    await Engine.instance.handleInteraction(this.element, event);
  }

  /**
   * Removes the event listeners to clean up the object.
   */
  public disconnect(): void {
    if (this.domElement) {
      this.domElement.removeEventListener(
        "mouseenter",
        this.handleEvent as EventListener
      );
      this.domElement.removeEventListener(
        "mouseleave",
        this.handleEvent as EventListener
      );
    }
  }
}
