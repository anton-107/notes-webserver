"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewNotebookHandler = exports.NewNotebookPage = void 0;
const configuration_1 = require("../configuration/configuration");
const http_1 = require("../http");
class NewNotebookPage {
    constructor(properties) {
        this.properties = properties;
    }
    async render() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
            body: `<form method='post' action='${this.properties.baseUrl}/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
        };
    }
}
exports.NewNotebookPage = NewNotebookPage;
const getNewNotebookHandler = async () => {
    return await new NewNotebookPage({
        ...(0, configuration_1.dependenciesConfiguration)({}),
    }).render();
};
exports.getNewNotebookHandler = getNewNotebookHandler;
//# sourceMappingURL=get-new-notebook.js.map