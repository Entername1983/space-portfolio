import { AnimationManager } from "./animation-manager.js";

export class LogContentManager {
  constructor() {
    this.rssFeed = "https://blog.cognaite.com/feed/";
    this.testRssFeed = "../templates/log-test-feed.xml";
    this.logEntries = [];
    this.logIndex = [0];
    this.initialize();
    this.animationManager = new AnimationManager();
  }

  async initialize() {
    await this.fetchLog();
  }
  async fetchLog() {
    const captainsLog = await fetch(this.testRssFeed).then((res) => res.text());
    await this.parseLogIntoArrayOfItems(captainsLog);
  }

  async parseLogIntoArrayOfItems(captainsLog) {
    if (captainsLog == null) {
      console.error("No log received");
      return;
    }
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(captainsLog, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    const contentNamespace = "http://purl.org/rss/1.0/modules/content/";
    items.forEach((item) => {
      const titleNode = item.querySelector("title");
      const linkNode = item.querySelector("link");
      const categoryNode = item.querySelector("category");
      const descriptionNode = item.querySelector("description");
      const pubDateNode = item.querySelector("pubDate");
      const contentNode = item.getElementsByTagNameNS(
        contentNamespace,
        "encoded"
      )[0];
      const fullHtmlContent = contentNode ? contentNode.textContent : "";

      const imageStrippedHtml = fullHtmlContent.replaceAll(/<img[^>]*>/g, "");

      const rawDateString = pubDateNode.textContent;
      const dateObject = new Date(rawDateString);
      const cleanDateString = dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      this.logEntries.push({
        title: titleNode ? titleNode.textContent : "No Title",
        link: linkNode ? linkNode.textContent : null,
        category: categoryNode ? categoryNode.textContent : null,
        description: descriptionNode ? descriptionNode.textContent : null,
        htmlContent: this.sanitizeHTML(imageStrippedHtml),
        date: cleanDateString ? cleanDateString : "unknown",
      });
    });
  }

  getCurrentEntry() {
    return this.logEntries[this.logIndex];
  }

  show() {
    const title = document.querySelector("#log-entry-title");
    const contentContainer = document.querySelector("#log-content");
    const starDate = document.querySelector("#stardate");
    const link = document.querySelector("#log-link");
    link.href = this.logEntries[this.logIndex].link;
    contentContainer.innerHTML = this.logEntries[this.logIndex].htmlContent;
    starDate.textContent = this.logEntries[this.logIndex].date;
    title.textContent = this.logEntries[this.logIndex].title;
  }

  navigateTo(direction) {
    if (direction === "next" && this.logIndex < this.logEntries.length - 1) {
      this.logIndex++;
    } else if (direction === "prev" && this.logIndex > 0) {
      this.logIndex--;
    }
    this.show();

    this.renderNavigation();
  }

  renderNavigation() {
    const prevBtn = document.querySelector("#log-prev");
    const nextBtn = document.querySelector("#log-next");

    if (this.logIndex === 0) {
      prevBtn.classList.remove("active");
    } else {
      prevBtn.classList.add("active");
    }
    if (this.logIndex === this.logEntries.length - 1) {
      nextBtn.classList.remove("active");
    } else {
      nextBtn.classList.add("active");
    }
  }

  sanitizeHTML(htmlContent) {
    return DOMPurify.sanitize(htmlContent);
  }

  handleDelegatedInteraction(actionTargetId) {
    switch (actionTargetId.targetId) {
      case "log-next":
        this.navigateTo("next");
        break;
      case "log-prev":
        this.navigateTo("prev");

        break;
    }
  }
}
