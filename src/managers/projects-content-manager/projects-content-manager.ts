import PROJECTS, { type TProjectKey } from "../../data/projects";
import type { IProject, IProjectList } from "../../data/types";
import { fetchElementByID } from "../../util/utility";
import { MonitorManager } from "../monitor-manager/monitor-manager";
type TValidElements = Element[];
export class ProjectsContentManager {
  private PROJECTS: IProjectList;
  constructor() {
    this.PROJECTS = PROJECTS;
  }
  private get monitorManager() {
    return MonitorManager.instance;
  }
  hideMainMenu() {
    const mainMenu = fetchElementByID("#projects-main-menu");
    gsap.to(mainMenu, {
      autoAlpha: 0,
      display: "none",
      duration: 0,
    });
  }

  revealMainMenu() {
    const mainMenu = fetchElementByID("#projects-main-menu");
    gsap.to(mainMenu, {
      autoAlpha: 1,
      display: "flex",
    });
  }
  show(targetId: TProjectKey) {
    /** Load project content based on project ID.
     *  Take info from PROJECTS object in src/data/projects.ts
     * data-id will correspond to the project ID (the key) in the PROJECTS object
     * Load data to appropriate elements in the project content container
     * **/
    const projectToLoad = this.PROJECTS[targetId];

    this.hideTitleAndProjectContent();
    if (projectToLoad == null) {
      console.error(
        `project not found for projects content manager: ${targetId}`
      );
      return;
    }
    console.log("Showing project content:", targetId);
    this.hideMainMenu();
    this.loadProjectContent(projectToLoad);
    this.revealTitleAndProjectContent();
    this.showBackButton();
    this.showArrowButtons();
  }
  loadProjectContent(project: IProject) {
    console.log("Loading project content for:", project.id);
    const projectContentContainer = fetchElementByID(
      "#projects-content-container"
    );
    const projectName = fetchElementByID("#display-title");
    const projectDescription = fetchElementByID("#project-description");
    const projectScreenshot = fetchElementByID("#project-screenshot");
    const projectStatus = fetchElementByID("#project-status");
    const projectLink = fetchElementByID("#project-link");
    const projectGithub = fetchElementByID("#project-repo");
    const projectTechContent = fetchElementByID("#project-tech-content");
    const projectFeaturesContent = fetchElementByID(
      "#project-features-content"
    );
    const projectNotesContent = fetchElementByID("#project-notes-content");
    this.changeMainTitleTo(project.name, project.id);
    projectDescription.textContent = project.description;
    (projectScreenshot as HTMLImageElement).src = project.screenshotUrl;
    projectStatus.textContent = project.status;
    (projectLink as HTMLAnchorElement).href = project.link ?? "#";
    (projectGithub as HTMLAnchorElement).href = project.github ?? "#";
    const maxLength = 30;
    let projectLinkText = "Unavailable";

    if (project.link != null) {
      if (project.link.length > maxLength) {
        projectLinkText = `${project.link.slice(0, maxLength)}...`;
      } else {
        projectLinkText = project.link;
      }
      projectLinkText = projectLinkText.replace(/^https?:\/\//, "");
    }
    projectLink.textContent = projectLinkText;
    projectGithub.textContent =
      project.github != null ? "Access here" : "Private";
    // Clear existing content
    projectTechContent.innerHTML = project.featureContainer.tech
      .map((tech) => `<li>${tech}</li>`)
      .join("");
    projectFeaturesContent.innerHTML = project.featureContainer.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");
    projectNotesContent.innerHTML = project.featureContainer.notes
      .map((note) => `<li>${note}</li>`)
      .join("");

    projectContentContainer.classList.add("active");
  }

  getNextProjectId(currentProjectId: TProjectKey): TProjectKey {
    const currentIndex = Object.keys(this.PROJECTS).indexOf(currentProjectId);
    const nextIndex = (currentIndex + 1) % Object.keys(this.PROJECTS).length;
    return Object.keys(this.PROJECTS)[nextIndex] as TProjectKey;
  }

  getPreviousProjectId(currentProjectId: TProjectKey): TProjectKey {
    const currentIndex = Object.keys(this.PROJECTS).indexOf(currentProjectId);
    const previousIndex =
      (currentIndex - 1 + Object.keys(this.PROJECTS).length) %
      Object.keys(this.PROJECTS).length;
    return Object.keys(this.PROJECTS)[previousIndex] as TProjectKey;
  }

  showArrowButtons() {
    const leftArrow = fetchElementByID("#project-left-arrow");
    const rightArrow = fetchElementByID("#project-right-arrow");
    [leftArrow, rightArrow].forEach((arrow) => {
      arrow.classList.add("active");
    });
  }
  handleProjectNavigation(targetId: string | undefined) {
    // if (actionTargetId.targetId == null) {
    //   console.error(`missing targetId for project navigation`);
    //   return;
    // }
    console.log("Handling project navigation:", targetId);
    this.hideTitleAndProjectContent();
    setTimeout(() => {
      if (targetId === "next") {
        this.navigateToNextProject();
      } else if (targetId === "previous") {
        this.navigateToPreviousProject();
      } else {
        console.error(`invalid targetId for project navigation: ${targetId}`);
      }

      this.revealTitleAndProjectContent();
    }, 400);
  }
  navigateToNextProject() {
    console.log("navigating to next project");
    const displayTitleData = this.getDisplayTitleData();
    if (displayTitleData == null) {
      console.log("no display title data, cannot navigate to next project");
      return;
    }
    const nextProjectToLoad =
      this.PROJECTS[this.getNextProjectId(displayTitleData)];
    if (nextProjectToLoad == null) {
      console.error(
        `previous project not found, currnet one: ${displayTitleData}`
      );
      return;
    }
    this.loadProjectContent(nextProjectToLoad);
    this.monitorManager?.show(`#${nextProjectToLoad.id}-logo`);
  }
  navigateToPreviousProject() {
    const displayTitleData = this.getDisplayTitleData();
    if (displayTitleData == null) {
      return;
    }
    const previousProjectToLoad =
      this.PROJECTS[this.getPreviousProjectId(displayTitleData)];
    if (previousProjectToLoad == null) {
      console.error(
        `previous project not found, currnet one: ${displayTitleData}`
      );
      return;
    }
    this.loadProjectContent(previousProjectToLoad);
    console.log("Monitor Manager", this.monitorManager);
    this.monitorManager?.show(`#${previousProjectToLoad.id}-logo`);
  }
  getDisplayTitleData(): string | undefined {
    /** Returns the data-title attribute of the display title element **/
    const displayTitle = fetchElementByID("#display-title");
    const displayTitleData = displayTitle.getAttribute("data-title");
    if (displayTitleData === "Projects") {
      return;
    }
    if (displayTitleData == null) {
      console.error(`display title data attribute missing`);
      return;
    }

    return displayTitleData;
  }
  hideArrowButtons() {
    const leftArrow = fetchElementByID("#project-left-arrow");
    const rightArrow = fetchElementByID("#project-right-arrow");
    [leftArrow, rightArrow].forEach((arrow) => {
      arrow.classList.remove("active");
    });
  }
  showBackButton() {
    const backBtn = fetchElementByID("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 1,
      display: "block",
    });
  }
  hideBackBtn() {
    const backBtn = fetchElementByID("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 0,
      display: "none",
    });
  }
  clearContent() {
    const mainMenu = fetchElementByID("#projects-content-container");
    for (const child of mainMenu.children) {
      child.classList.remove("active");
      if (!(child instanceof HTMLElement)) continue;
      // child.style.display = "none";
      // child.style.opacity = "0";
    }
  }
  // Goes back to the projects main menu

  changeMainTitleTo(newTitle: string, titleData: string = "display-title") {
    const displayTitle = fetchElementByID("#display-title");
    displayTitle.textContent = newTitle;
    displayTitle.setAttribute("data-title", titleData);
  }
  hideTitleAndProjectContent() {
    const titleElement = fetchElementByID("#display-title");
    const projectContentElement = fetchElementByID("#project-content");
    titleElement.classList.remove("active");
    projectContentElement.classList.remove("active");
  }
  revealTitleAndProjectContent() {
    const titleElement = fetchElementByID("#display-title");
    const projectContentElement = fetchElementByID("#project-content");
    titleElement.classList.add("active");
    projectContentElement.classList.add("active");
  }
  returnToMainScreen() {
    this.changeMainTitleTo("Projects");
    this.clearContent();
    this.hideBackBtn();
    this.revealMainMenu();
    this.hideArrowButtons();
  }
}
