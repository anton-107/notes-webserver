"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookDeletionWorkflow = void 0;
const path_1 = require("path");
const delete_all_notes_in_notebook_action_1 = require("./actions/delete-all-notes-in-notebook-action");
const delete_notebook_action_1 = require("./actions/delete-notebook-action");
const verify_no_notes_in_notebook_action_1 = require("./actions/verify-no-notes-in-notebook-action");
exports.notebookDeletionWorkflow = [
    {
        type: "action",
        action: {
            actionName: "delete-all-notes-in-notebook",
            import: (0, path_1.join)(__dirname, "./delete-all-notes-in-notebook-action"),
            action: delete_all_notes_in_notebook_action_1.deleteAllNotesInNotebook.name,
        },
    },
    {
        type: "action",
        action: {
            actionName: "verify-no-notes-in-notebook",
            import: (0, path_1.join)(__dirname, "./verify-no-notes-in-notebook-action"),
            action: verify_no_notes_in_notebook_action_1.verifyNoNotesInNotebook.name,
        },
    },
    {
        type: "action",
        action: {
            actionName: "delete-notebook",
            import: (0, path_1.join)(__dirname, "./delete-notebook-action"),
            action: delete_notebook_action_1.deleteNotebook.name,
        },
    },
];
//# sourceMappingURL=notebook-deletion-workflow.js.map