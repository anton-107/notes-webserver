"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewNotebookHandler = exports.NewNotebookPage = void 0;
const http_1 = require("../http");
class NewNotebookPage {
    async render() {
        return {
            isBase64Encoded: false,
            statusCode: http_1.HttpStatus.OK,
            headers: {},
            body: `<form method='post' action='/notebook'>
        <input name='notebook-name' data-testid='notebook-name-input' />
        <input type='submit' />
      </form>`,
        };
    }
}
exports.NewNotebookPage = NewNotebookPage;
const getNewNotebookHandler = async () => {
    return await new NewNotebookPage().render();
};
exports.getNewNotebookHandler = getNewNotebookHandler;
//# sourceMappingURL=get-new-notebook.js.map