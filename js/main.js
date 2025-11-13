import { Clickables } from "./clickables.js";
import { CLICKABLES } from "./data/clickables-data.js";
import { Engine } from "./engine.js";

// GSAP plugins are loaded via CDN in HTML, register them
gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger, ScrollToPlugin, DrawSVGPlugin, MorphSVGPlugin);

document.addEventListener("DOMContentLoaded", () => {
  console.log("initializing");
  new Engine();
  const clickableInstances = {};
  CLICKABLES.forEach((item, index) => {
    const key = `monitor-clickable${index}`;
    const instance = new Clickables(
      item.elementId,
      item.action,
      item.targetId,
      item.data
    );
    clickableInstances[key] = instance;
  });
});

// // Initialize everything when DOM is ready
// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize canvas and starfield
//   const interiorImgPath = window.ferengi_theme_vars?.interior_image_url || "";

//   initCanvas(interiorImgPath);

//   // Initialize page load animations
//   initPageLoadAnimations();

//   // Initialize hover interactions for space elements
//   initHoverInteractions(spaceElements);

//   // Setup event listeners
//   setupEventListeners(elements, appState);

//   // Init complex hover interactiosn

//   initComplexHoverInteractions(complexSpaceElements, appState);
// });

// /**
//  * Setup all event listeners for interactive elements
//  */
// function setupEventListeners(elements, appState) {
//   setupProjectInteractions(elements, appState);
//   setupLightSpeedButton(elements, appState);
//   setupSpaceshipClick(elements, appState);
//   setupSpaceStationClick(elements, appState);
//   setupClickBackButton(elements, appState);
//   setupBlackholeClick(elements, appState);
//   setupStarClick(elements, appState);
//   setupSpaceWhaleClick(elements, appState);
//   setupInfectedStationClick(elements, appState);
//   setupRedPlanetClick(elements, appState);
//   setupRedPlanetCraterClick(elements, appState);
//   setupInfoCloseButton(elements, appState);
//   setupProjectsButton(elements, appState);
//   setupBioButton(elements, appState);
// }

// function setupBioButton(elements, appState) {
//   if (!elements.controlPannel.bioBtn) {
//     console.log("no bio btn");
//     return;
//   }
//   elements.controlPannel.bioBtn.addEventListener("click", () => {
//     appState.setCurrentFrontScreenContent(
//       appState.currentFrontScreenContent == "bio" ? "none" : "bio"
//     );
//     toggleBio(elements);

//     killTextTween();
//   });
// }

// function toggleBio(elements) {
//   console.log("toggling bio");
//   clearAllFrontScreenContent(elements, appState);

//   const timeline = gsap.timeline({ paused: true });
//   // const elementsToHide = [elements.spaceship];
//   const elementsToReveal = [elements.frontScreenBio];
//   elements.monitorContent.spaceship.classList.remove("active");

//   elements.monitorContent.bodyScan.classList.add("active");
//   elements.frontScreenBio.style.display = "block";
//   timeline
//     .to(elementsToReveal, {
//       display: "block",
//     })
//     .set(".info-content-text", { text: "" }, "<");

//   gsap.to(
//     elements.frontScreenBio,
//     {
//       autoAlpha: 1,
//       duration: 1,
//       display: "block",
//     },
//     "<"
//   );

//   toggleFrontScreen(elements, appState);

//   return timeline;
// }

// /**
//  * Setup lightspeed button functionality
//  */
// function setupLightSpeedButton(elements, appState) {
//   if (!elements.lightSpeedButton) return;

//   const timeline = revealLightspeed(elements);

//   elements.lightSpeedButton.addEventListener("click", () => {
//     killTextTween();
//     revealLightspeed(elements).restart();
//     toggleLightSpeed(appState);
//   });
// }

// function revealLightspeed(elements) {
//   const timeline = gsap.timeline({ paused: true });
//   const elementsToHide = [
//     elements.spaceship,
//     elements.satellite,
//     elements.spacewhale,
//     elements.star,
//     elements.spacestation,
//     elements.planet,
//     elements.asteroid,
//     elements.blackhole,
//   ];
//   const elementsToReveal = [];
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     // Clear the info text content on transition
//     .set(".info-content-text", { text: "" }, "<");

//   return timeline;
// }

// /**
//  * Setup spaceship click to reveal interior
//  */
// function setupSpaceshipClick(elements, appState) {
//   if (!elements.spaceship) return;

//   const timeline = revealSpaceship(elements);
//   elements.spaceship.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.SPACESHIP);
//     timeline.restart();
//   });
// }

// /**
//  * Create GSAP timeline for spaceship interior reveal
//  * @returns {gsap.timeline} Paused GSAP timeline
//  */
// function revealSpaceship(elements) {
//   const timeline = gsap.timeline({ paused: true });
//   const elementsToHide = [elements.spaceship, elements.satellite];
//   const elementsToReveal = [
//     elements.backButton,
//     elements.lightSpeedButton,
//     elements.spaceshipInteriorSection,
//     elements.spaceshipInterior,
//   ];

//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     // Clear the info text content on transition
//     .set(".info-content-text", { text: "" }, "<");

//   return timeline;
// }

// function setupRedPlanetClick(elements, appState) {
//   if (!elements.planet) return;

//   elements.planet.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.PLANET);
//     revealSpaceship(elements).restart();

//     revealRedPlanet(elements).restart();
//   });
// }
// function revealRedPlanet(elements) {
//   const elementsToHide = [
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//     elements.spaceship,
//     elements.asteroid,
//   ];
//   const elementsToReveal = [elements.backButton, elements.redPlanet];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }
// function setupRedPlanetCraterClick(elements, appState) {
//   if (!elements.asteroid) return;

//   elements.asteroid.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.CRATER);
//     revealSpaceship(elements).restart();

//     revealRedPlanetCrater(elements).restart();
//   });
// }

// function revealRedPlanetCrater(elements) {
//   const elementsToHide = [
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//     elements.spaceship,
//     elements.asteroid,
//   ];
//   const elementsToReveal = [elements.backButton, elements.redPlanetCrater];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }

// function setupSpaceStationClick(elements, appState) {
//   if (!elements.spacestation) return;

//   const timeline = revealSpaceStation(elements);
//   elements.spacestation.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.SPACESTATION);
//     timeline.restart();
//   });
// }
// function revealSpaceStation(elements) {
//   let doorsInitialized = false;

//   const timeline = gsap.timeline({
//     paused: true,
//     onComplete: () => {
//       if (!doorsInitialized) {
//         setupDoorTimelines();
//         doorsInitialized = true;
//       }
//     },
//   });
//   const elementsToReveal = [
//     elements.backButton,
//     elements.spacestationInterior,
//     elements.spacestationInteriorSection,
//   ];
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }
// function setupInfectedStationClick(elements, appState) {
//   if (!elements.satellite) return;

//   elements.satellite.addEventListener("click", () => {
//     console.log("click");
//     killTextTween();

//     appState.setCurrentScene(appState.SCENES.SATELLITE);
//     revealSpaceship(elements).restart();
//     revealInfectedStationVideo(elements).restart();
//   });
// }
// function revealInfectedStationVideo(elements) {
//   const elementsToHide = [
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//     elements.blackholeVideoSection,
//     elements.asteroid,
//     elements.redPlanet,
//   ];
//   const elementsToReveal = [
//     elements.backButton,
//     elements.lightSpeedButton,
//     elements.spaceship,
//     elements.infectedStationVideoSection,
//   ];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 0,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }

// function revealBlackHoleVideo(elements) {
//   const elementsToHide = [
//     elements.spaceship,
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//     elements.asteroid,
//   ];
//   const elementsToReveal = [
//     elements.backButton,
//     elements.lightSpeedButton,
//     elements.blackholeVideoSection,
//   ];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }

// function setupSpaceWhaleClick(elements, appState) {
//   if (!elements.spacewhale) return;

//   elements.spacewhale.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.SPACEWHALE);

//     revealSpaceship(elements).restart();
//     reavealSpaceWhale(elements).restart();
//   });
// }

// function reavealSpaceWhale(elements) {
//   const elementsToHide = [
//     elements.spaceship,
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//   ];
//   const elementsToReveal = [
//     elements.backButton,
//     elements.lightSpeedButton,
//     elements.spacewhaleVideoSection,
//   ];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(
//       elementsToReveal,
//       { autoAlpha: 1, duration: 0.2, display: "block" },
//       "<"
//     )
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 0.2,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }

// function revealStarVideo(elements) {
//   const elementsToHide = [
//     elements.spaceship,
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.spacestation,
//   ];
//   const elementsToReveal = [
//     elements.backButton,
//     elements.lightSpeedButton,
//     elements.starVideo,
//   ];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" }, "<")
//     .to(
//       elementsToHide,
//       {
//         autoAlpha: 0,
//         duration: 1,
//         display: "none",
//       },
//       "<"
//     )
//     .set(".info-content-text", { text: "" }, "<");
//   return timeline;
// }
// function setupStarClick(elements, appState) {
//   if (!elements.star) return;

//   elements.star.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.STAR);

//     revealSpaceship(elements).restart();
//     revealStarVideo(elements).restart();
//   });
// }
// function setupBlackholeClick(elements, appState) {
//   if (!elements.blackhole) return;

//   elements.blackhole.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.BLACKHOLE);

//     revealSpaceship(elements).restart();
//     revealBlackHoleVideo(elements).restart();
//   });
// }

// function setupClickBackButton(elements, appState) {
//   if (!elements.backButton) return;

//   const timeline = resetScene(elements);
//   elements.backButton.addEventListener("click", () => {
//     killTextTween();
//     appState.setCurrentScene(appState.SCENES.DEFAULT);

//     timeline.restart();
//     exitLightSpeed();
//   });
// }

// function resetScene(elements) {
//   const elementsToHide = [
//     elements.spacestationInterior,
//     elements.spacestationInteriorSection,
//     elements.blackholeVideoSection,
//     elements.starVideo,
//     elements.backButton,
//     elements.spacewhaleVideoSection,
//     elements.redPlanet,
//     elements.infectedStationVideoSection,
//     elements.redPlanetCrater,
//   ];
//   const elementsToReveal = [
//     elements.spaceship,
//     elements.satellite,
//     elements.star,
//     elements.planet,
//     elements.blackhole,
//     elements.spacewhale,
//     elements.lightSpeedButton,
//     elements.spacestation,
//     elements.asteroid,
//   ];

//   const timeline = gsap.timeline({
//     paused: true,
//   });
//   timeline
//     .set(elementsToHide, {
//       autoAlpha: 0,
//       display: "none",
//     })
//     .to(elementsToReveal, { autoAlpha: 1, duration: 1, display: "block" });
//   return timeline;
// }

// /**
//  * Setup info close button functionality
//  */
// function setupInfoCloseButton(elements, appState) {
//   if (!elements.infoCloseButton) return;

//   elements.infoCloseButton.addEventListener("click", () => {
//     // Kill the text tween animation and reverse the container animation
//     killTextTween();
//   });
// }
