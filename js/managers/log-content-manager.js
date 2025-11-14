export class LogContentManager {
  constructor() {
    this.rssFeed = "https://blog.cognaite.com/feed/";
    this.testRssFeed = "../templates/log-test-feed.html";
    this.logEntries = [];
    this.logIndex = [0];
    this.initialize();
  }

  async initialize() {
    await this.fetchLog();
  }
  async fetchLog() {
    console.log("fetching log");
    const log = await fetch(this.testRssFeed).then((res) => res.text());
    await this.parseLogIntoArrayOfItems(log);
  }
  async parseLogIntoArrayOfItems(log) {
    if (log === null) {
      console.error("No log received");
      return;
    }
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(log, "application/xml");
    const items = xmlDoc.querySelectorAll("item");
    const contentNamespace = "http://purl.org/rss/1.0/modules/content/";
    items.forEach((item) => {
      const titleNode = item.querySelector("title");
      const linkNode = item.querySelector("link");
      const categoryNode = item.querySelector("category");
      const descriptionNode = item.querySelector("description");

      const contentNode = item.getElementsByTagNameNS(
        contentNamespace,
        "encoded"
      )[0];

      const fullHtmlContent = contentNode ? contentNode.textContent : "";
      const imageStrippedHtml = fullHtmlContent.replaceAll(/<img[^>]*>/g, "");

      this.logEntries.push({
        title: titleNode ? titleNode.textContent : "No Title",
        link: linkNode ? linkNode.textContent : null,
        category: categoryNode ? categoryNode.textContent : null,
        description: descriptionNode ? descriptionNode.textContent : null,
        htmlContent: this.sanitizeHTML(imageStrippedHtml),
      });
    });

    console.log(this.logEntries[0]);
  }
  sanitizeHTML(htmlContent) {
    return DOMPurify.sanitize(htmlContent);
  }
  show() {
    console.log("revealing innitial inner html");
    console.log(this.logEntries[0]);
    const contentContainer = document.querySelector("#log-content");
    // 1. Join the array items into a single string, separated by newlines

    // 2. Remove all newline characters (using regex 'g' for global replacement)
    console.log(this.logEntries[0].htmlContent);
    // 3. Use the correct property: innerHTML
    contentContainer.innerHTML = this.logEntries[0].htmlContent;
  }
}
