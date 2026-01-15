import PROJECTS, { type TProjectKey } from "../../data/projects";
import type { IProject, IProjectList } from "../../data/types";
type TValidElements = Element[];
export class ProjectsContentManager {
  private PROJECTS: IProjectList;

  constructor() {
    this.PROJECTS = PROJECTS;
  }
  hideMainMenu() {
    const mainMenu = document.querySelector("#projects-main-menu");
    gsap.to(mainMenu, {
      autoAlpha: 0,
      display: "none",
      duration: 0,
    });
  }

  revealMainMenu() {
    const mainMenu = document.querySelector("#projects-main-menu");
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
    if (projectToLoad == null) {
      console.error(
        `project not found for projects content manager: ${targetId}`
      );
      return;
    }
    console.log("Showing project content:", targetId);
    this.hideMainMenu();
    this.loadProjectContent(projectToLoad);

    // const element = document.querySelector(targetId);
    // console.log("ELEMENT HERE", element);
    // if (element == null) {
    //   console.error(
    //     `element not found for projects content manager: ${targetId}`
    //   );
    //   return;
    // }
    // element.classList.add("active");
    // progressiveTextDisplayAnimation(element);
    this.showBackButton();
    this.showArrowButtons();
  }
  loadProjectContent(project: IProject) {
    console.log("Loading project content for:", project.id);
    const projectContentContainer = document.querySelector(
      "#projects-content-container"
    );
    if (projectContentContainer == null) {
      console.error(
        `projectContentContainer not found for projects content manager`
      );
      return;
    }
    const projectName = document.querySelector("#display-title");
    const projectDescription = projectContentContainer.querySelector(
      "#project-description"
    );
    const projectScreenshot = projectContentContainer.querySelector(
      "#project-screenshot"
    );
    const projectStatus =
      projectContentContainer.querySelector("#project-status");
    const projectLink = projectContentContainer.querySelector("#project-link");
    const projectGithub =
      projectContentContainer.querySelector("#project-repo");
    const projectTechContent = projectContentContainer.querySelector(
      "#project-tech-content"
    );
    const projectFeaturesContent = projectContentContainer.querySelector(
      "#project-features-content"
    );
    const projectNotesContent = projectContentContainer.querySelector(
      "#project-notes-content"
    );
    if (
      projectName == null ||
      projectDescription == null ||
      projectScreenshot == null ||
      projectStatus == null ||
      projectLink == null ||
      projectGithub == null ||
      projectTechContent == null ||
      projectFeaturesContent == null ||
      projectNotesContent == null
    ) {
      console.error(`one or more project content elements missing`);
      return;
    }
    this.changeMainTitleTo(project.name, project.id);
    projectDescription.textContent = project.description;
    (projectScreenshot as HTMLImageElement).src = project.screenshotUrl;
    projectStatus.textContent = project.status;
    (projectLink as HTMLAnchorElement).href = project.link ?? "#";
    (projectGithub as HTMLAnchorElement).href = project.github ?? "#";
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
    const leftArrow = document.querySelector("#project-left-arrow");
    const rightArrow = document.querySelector("#project-right-arrow");
    [leftArrow, rightArrow].forEach((arrow) => {
      if (arrow == null) {
        return;
      }
      arrow.classList.add("active");
    });
  }
  handleProjectNavigation(actionTargetId: {
    action: string;
    targetId: string | null;
  }) {
    // if (actionTargetId.targetId == null) {
    //   console.error(`missing targetId for project navigation`);
    //   return;
    // }
    console.log("Handling project navigation:", actionTargetId);
    if (actionTargetId.targetId === "next") {
      this.navigateToNextProject();
    } else if (actionTargetId.targetId === "previous") {
      this.navigateToPreviousProject();
    } else {
      console.error(
        `invalid targetId for project navigation: ${actionTargetId.targetId}`
      );
    }
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
  }
  getDisplayTitleData(): string | undefined {
    /** Returns the data-title attribute of the display title element **/
    const displayTitle = document.querySelector("#display-title");
    if (displayTitle == null) {
      console.error(`display title not found`);
      return;
    }
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
    const leftArrow = document.querySelector("#project-left-arrow");
    const rightArrow = document.querySelector("#project-right-arrow");
    [leftArrow, rightArrow].forEach((arrow) => {
      if (arrow == null) {
        return;
      }
      arrow.classList.remove("active");
    });
  }
  showBackButton() {
    const backBtn = document.querySelector("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 1,
      display: "block",
    });
  }
  hideBackBtn() {
    const backBtn = document.querySelector("#projects-back-button");
    gsap.to(backBtn, {
      autoAlpha: 0,
      display: "none",
    });
  }
  clearContent() {
    const mainMenu = document.querySelector("#projects-content-container");
    if (mainMenu == null) {
      console.error(`mainMenu not found for projects content manager`);
      return;
    }
    for (const child of mainMenu.children) {
      child.classList.remove("active");
      if (!(child instanceof HTMLElement)) continue;
      // child.style.display = "none";
      // child.style.opacity = "0";
    }
  }
  // Goes back to the projects main menu

  changeMainTitleTo(newTitle: string, titleData: string = "display-title") {
    const displayTitle = document.querySelector("#display-title");
    if (displayTitle == null) {
      console.error(`display title not found`);
      return;
    }
    displayTitle.textContent = newTitle;
    displayTitle.setAttribute("data-title", titleData);
  }

  returnToMainScreen() {
    this.changeMainTitleTo("Projects");
    this.clearContent();
    this.hideBackBtn();
    this.revealMainMenu();
    this.hideArrowButtons();
  }
}
