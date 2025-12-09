import { default as gsap, default as SplitText } from "gsap";
export class IntroManager {
    static instance = null;
    welcomeContent;
    welcomeHeading;
    fadeOverlay;
    introTl;
    constructor() {
        if (IntroManager.instance) {
            return IntroManager.instance;
        }
        this.welcomeContent = document.querySelector("#welcome-content");
        this.welcomeHeading = document.querySelector("#welcome-heading");
        this.fadeOverlay = document.querySelector("#fade-overlay");
        this.introTl = this.createIntroTl();
    }
    createIntroTl() {
        const tl = gsap.timeline({ paused: true });
        const split = SplitText.create("#welcome-heading", { type: "chars" });
        tl.to(this.fadeOverlay, {
            autoAlpha: 0,
            duration: 1,
            ease: "power2.inOut",
        }).from(split.chars, {
            y: 20,
            autoAlpha: 0,
            stagger: 0.1,
            onComplete: () => gsap.to("h1", { duration: 3, opacity: 0 }),
        }, "<");
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
        if (!satellite)
            return;
        gsap.to("#satellite", {
            y: -1200,
            x: -2000,
            autoAlpha: 1,
            duration: 60,
            repeat: -1,
        });
    }
    initPlanetAnimation() {
        const planet = document.querySelector("#red-planet");
        if (!planet)
            return;
        gsap.to("#red-planet", {
            y: -20,
            autoAlpha: 1,
            duration: 5,
        });
    }
    initAsteroidAnimation() {
        const asteroid = document.querySelector("#asteroid");
        const wrapper = document.querySelector("#wrapper");
        if (!asteroid || !wrapper)
            return;
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
