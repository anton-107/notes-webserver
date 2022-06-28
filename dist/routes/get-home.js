"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeHandler = exports.HomePage = void 0;
const configuration_1 = require("./../configuration/configuration");
const http_1 = require("../http/http");
const cookie_parser_1 = require("../http/cookie-parser");
class HomePage {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        const headers = {};
        headers["Content-Type"] = "text/html; charset=utf-8";
        const responseToAnonymous = `<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='${this.properties.baseUrl}/signin'>Sign in</a>`;
        const authToken = this.properties.authenticationToken;
        if (!authToken) {
            console.log("No auth token is present");
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.OK,
                headers,
                body: responseToAnonymous,
            };
        }
        const user = await this.properties.authenticator.authenticate(authToken);
        if (!user.isAuthenticated) {
            console.log("Not authenticated:", user.errorMessage);
            return {
                isBase64Encoded: false,
                statusCode: http_1.HttpStatus.OK,
                headers,
                body: responseToAnonymous,
            };
        }
        const notebooks = await this.properties.notebookStore.listAll(user.username);
        const body = `<h1 data-testid='user-greeting'>hello ${user.username}!</h1>
      <form method='post' action='${this.properties.baseUrl}/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>
      <a href='${this.properties.baseUrl}/new-notebook' data-testid='create-new-notebook-link'>Create new notebook</a>
      ${notebooks
            .map((x) => `<div><a href='${this.properties.baseUrl}/notebook/${x.id}' data-testid='notebook-name'>${x.name}</a></div>`)
            .join("")}
      `;
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers,
            body,
        };
    }
}
exports.HomePage = HomePage;
const getHomeHandler = async (request) => {
    return await new HomePage({
        authenticationToken: (0, cookie_parser_1.parseCookie)(request.headers, "Authentication"),
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.getHomeHandler = getHomeHandler;
//# sourceMappingURL=get-home.js.map