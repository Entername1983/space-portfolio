import { gsap } from "gsap";
import SplitText from "gsap/dist/SplitText";
export class IntroManager {
  public static instance: IntroManager | null = null;

  private welcomeContent!: HTMLElement | null;
  private welcomeHeading!: HTMLElement | null;
  private fadeOverlay!: HTMLElement | null;
  private introTl!: gsap.core.Timeline;
  private closeDialogButtons!: NodeListOf<Element> | null;
  private dialog!: HTMLDialogElement | null;

  constructor() {
    if (IntroManager.instance) {
      return IntroManager.instance;
    }
    this.welcomeContent = document.querySelector("#welcome-content");
    this.welcomeHeading = document.querySelector("#welcome-heading");
    this.fadeOverlay = document.querySelector("#fade-overlay");
    this.closeDialogButtons = document.querySelectorAll(".close-dialog");
    this.dialog = document.querySelector("#welcome-dialog");
    this.attachCloseDialogListeners();
    // this.openWelcomeModal();
    this.introTl = this.createIntroTl();
  }
  attachCloseDialogListeners() {
    if (!this.closeDialogButtons?.length) return;

    this.closeDialogButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const exitTl = gsap.timeline({
          onComplete: () => {
            this.dialog?.close();
            this.introTl?.play();
          },
        });

        exitTl.to(
          this.dialog,
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );

        exitTl.to(
          "#welcome-dialog::backdrop",
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0,
        );
      });
    });
  }
  openWelcomeModal() {
    if (!this.dialog) return;

    this.dialog.showModal();

    gsap.fromTo(
      this.dialog,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
    );

    gsap.fromTo(
      "#welcome-dialog::backdrop",
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
    );
  }
  createIntroTl() {
    const tl = gsap.timeline({ paused: true });
    const split = SplitText.create("#welcome-heading", { type: "chars" });

    tl.to(this.fadeOverlay, {
      autoAlpha: 0,
      duration: 1,
      ease: "power2.inOut",
    }).from(
      split.chars,
      {
        y: 20,
        autoAlpha: 0,
        stagger: 0.1,
        onComplete: () => gsap.to("h1", { duration: 3, opacity: 0 }),
      },
      "<",
    );
    return tl;
  }

  startIntro() {
    this.initSatelliteAnimation();
    this.initPlanetAnimation();
    this.initAsteroidAnimation();
    return new Promise((resolve) => {
      this.introTl.play().then(resolve);
    });
  }
  initSatelliteAnimation() {
    const satellite = document.querySelector("#satellite");
    if (!satellite) return;

    gsap.to("#satellite", {
      y: -1200,
      x: -2000,
      autoAlpha: 1,
      duration: 120,
      repeat: -1,
    });
  }
  initPlanetAnimation() {
    const planet = document.querySelector("#red-planet");
    if (!planet) return;

    gsap.to("#red-planet", {
      y: -20,
      autoAlpha: 1,
      duration: 5,
    });
  }

  initAsteroidAnimation() {
    const asteroid = document.querySelector("#asteroid");
    const wrapper: HTMLElement | null = document.querySelector("#wrapper");
    if (!asteroid || !wrapper) return;

    gsap.to(asteroid, {
      x: () => {
        const wrapperWidth = wrapper.offsetWidth;
        return -0.9 * wrapperWidth;
      },
      y: () => {
        const wrapperHeight = wrapper.offsetHeight;
        return 0.8 * wrapperHeight;
      },
      autoAlpha: 1,
      ease: "expoScale(0.5,7,none)",
      delay: 5,
      duration: 6,
      onComplete: () => {
        gsap.set("#asteroid .initial", { display: "none" });
        gsap.set("#asteroid .end", { display: "block" });
      },
    });
  }
}
