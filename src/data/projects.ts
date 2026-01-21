import aiEchoesScreenshot from "../assets/images/screenshots/ai-echoes-screenshot.webp";
import blogScreenshot from "../assets/images/screenshots/blog-screenshot.webp";
import cephadexScreenshot from "../assets/images/screenshots/cephadex-screenshot.webp";
import chairTheFedScreenshot from "../assets/images/screenshots/chair-the-fed-screenshot.webp";
import spacePortfolioScreenshot from "../assets/images/screenshots/space-portfolio-screenshot.webp";
import starterRepoScreenshot from "../assets/images/screenshots/starter-repo-screenshot.webp";
import swiftSwatchScreenshot from "../assets/images/screenshots/swift-swatch-screenshot.webp";
import type { IProjectList } from "./types";
const PROJECTS: IProjectList = {
  cephadex: {
    id: "cephadex",
    name: "Cephadex",
    description:
      "An educational platform allowing for the creation of flashcards, quizzes, games, & tests",
    screenshotUrl: cephadexScreenshot,
    status: "Online",
    link: "https://cephadex.com",
    featureContainer: {
      tech: [
        "Python (FastAPI)",
        "TypeScript",
        "React",
        "Redux",
        "VPS",
        "Docker",
        "Redis",
        "Postgres",
      ],
      features: [
        "Flashcard Creation",
        "Interactive Quizzes",
        "Educational Games",
        "Test Generation",
      ],
      notes: [
        "High performance FastAPI backend",
        "Scalable Docker architecture",
        "Real-time state with Redux",
      ],
    },
  },
  "swift-swatch": {
    id: "swift-swatch",
    name: "Swift Swatch",
    description: "A UI designer allowing for the quick development of mock ups",
    screenshotUrl: swiftSwatchScreenshot,
    status: "Online",
    link: "https://swiftswatch.com",
    featureContainer: {
      tech: [
        "Python (FastAPI)",
        "TypeScript",
        "React",
        "Redux",
        "VPS",
        "Docker",
        "Redis",
        "Postgres",
      ],
      features: [
        "Drag & Drop UI components",
        "Instant color swatches",
        "Exportable mockups",
      ],
      notes: ["Optimized for rapid prototyping"],
    },
  },
  cognaite: {
    id: "cognaite",
    name: "Cognaite",
    description: "A starter template on which to build projects",
    screenshotUrl: starterRepoScreenshot,
    status: "Online",
    link: "https://cognaite.com",
    github: "https://github.com/Entername1983/Starter",
    featureContainer: {
      tech: [
        "Python (FastAPI)",
        "TypeScript",
        "React",
        "Redux",
        "Docker",
        "Postgres",
      ],
      features: [
        "Pre-configured Auth",
        "Database Migrations",
        "API documentation boilerplate",
      ],
      notes: ["Created to speed up the 'Zero to One' phase of development"],
    },
  },
  "chair-the-fed": {
    id: "chair-the-fed",
    name: "Chair the Fed",
    description: "A monetary policy simulation game",
    screenshotUrl: chairTheFedScreenshot,
    status: "Online",
    link: "https://entername1983.github.io/Chair-the-Fed/",
    github: "https://github.com/Entername1983/Chair-the-Fed",
    featureContainer: {
      tech: ["Javascript", "CSS", "HTML"],
      features: [
        "Economic algorithm simulation",
        "Dynamic chart rendering",
        "Scenario-based gameplay",
      ],
      notes: ["Educational tool for understanding macroeconomics"],
    },
  },
  "space-portfolio": {
    id: "space-portfolio",
    name: "Space Themed Portfolio",
    description:
      "This doubles as my portfolio as well as my attempt to go back to basics and build something from scratch. It strengthened my knowledge of webdev since I was previously using React.",
    screenshotUrl: spacePortfolioScreenshot,
    status: "Online",
    link: "https://space-portfolio.cognaite.com",
    featureContainer: {
      tech: ["Typescript", "HTML", "CSS", "Vite"],
      features: [
        "Custom dynamic template engine",
        "Event delegation architecture",
        "Zero-dependency animations",
      ],
      notes: ["Focus on performance and core DOM manipulation knowledge"],
    },
  },
  "ai-story-tellers": {
    id: "ai-story-tellers",
    name: "Neverending AI Story",
    description:
      "A never ending story in the form of the game of exquisite cadavre told by many different AIs",
    screenshotUrl: aiEchoesScreenshot,
    status: "Offline",
    github: "https://github.com/Entername1983/aiechoes",
    featureContainer: {
      tech: ["Python (FastAPI)", "TypeScript", "React", "OpenAI API", "Redis"],
      features: [
        "Multi-agent collaboration",
        "Persistent story state",
        "Procedural narrative generation",
      ],
      notes: ["Experimenting with LLM context chaining"],
    },
  },
  blog: {
    id: "blog",
    name: "Personal Blog",
    description: "My personal blog, where I write about various topics.",
    screenshotUrl: blogScreenshot,
    status: "Online",
    link: "https://blog.cognaite.com",
    featureContainer: {
      tech: ["WordPress", "HTML", "CSS", "PHP"],
      features: [
        "Custom theme elements",
        "SEO optimization",
        "Content management",
      ],
      notes: ["Used as a brain-dump for technical and personal interests"],
    },
  },
};

export type TProjectKey = keyof typeof PROJECTS;
export default PROJECTS;
