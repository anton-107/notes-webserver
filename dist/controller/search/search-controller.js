"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const http_1 = require("../../http/http");
class SearchController {
    constructor(properties) {
        this.properties = properties;
    }
    async search(keyword) {
        const user = await this.properties.authenticator.authenticate(this.properties.authenticationToken);
        const results = await this.properties.searchStore.search(user.username, keyword);
        return {
            isBase64Encoded: false,
            headers: {
                "Content-Type": "application/json",
                ...this.properties.corsHeaders,
            },
            statusCode: http_1.HttpStatus.OK,
            body: JSON.stringify({
                results,
            }),
        };
    }
}
exports.SearchController = SearchController;
//# sourceMappingURL=search-controller.js.map