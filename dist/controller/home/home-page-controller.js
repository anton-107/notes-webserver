"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageController = void 0;
const http_1 = require("../../http/http");
const home_html_view_1 = require("../../views/home/home-html-view");
class HomePageController {
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
        const people = await this.properties.personStore.listAll(user.username);
        const homeView = new home_html_view_1.HomeHtmlView({ baseUrl: this.properties.baseUrl });
        const body = homeView.renderHomePage(user.username, notebooks, people);
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers,
            body,
        };
    }
}
exports.HomePageController = HomePageController;
//# sourceMappingURL=home-page-controller.js.map