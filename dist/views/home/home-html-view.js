"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeHtmlView = void 0;
class HomeHtmlView {
    constructor(properties) {
        this.properties = properties;
    }
    renderHomePage(username, notebooks, people) {
        return `<h1 data-testid='user-greeting'>hello ${username}!</h1>
      <form method='post' action='${this.properties.baseUrl}/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
      <a href='${this.properties.baseUrl}/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
      ${notebooks
            .map((x) => `<div><a href='${this.properties.baseUrl}/notebook/${x.id}' data-testid='notebook-name'>${x.name}</a></div>`)
            .join("")}

      <a href='${this.properties.baseUrl}/new-person' data-testid='create-new-person-link'>Add new person</a>
      ${people
            .map((x) => `<div><a href='${this.properties.baseUrl}/person/${x.id}' data-testid='person-name'>${x.name}</a></div>`)
            .join("")}
      `;
    }
}
exports.HomeHtmlView = HomeHtmlView;
//# sourceMappingURL=home-html-view.js.map