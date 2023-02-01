"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookDeletionWorkflow = void 0;
const path_1 = require("path");
const delete_all_notes_in_notebook_action_1 = require("./delete-all-notes-in-notebook-action");
exports.notebookDeletionWorkflow = [
    {
        type: "action",
        action: {
            actionName: "delete-all-notes-in-notebook",
            import: (0, path_1.join)(__dirname, "./delete-all-notes-in-notebook"),
            action: delete_all_notes_in_notebook_action_1.deleteAllNotesInNotebook.name,
        },
    },
];
//# sourceMappingURL=notebook-deletion-workflow.js.map