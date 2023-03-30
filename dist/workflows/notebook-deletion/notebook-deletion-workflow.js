"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookDeletionWorkflow = void 0;
const path_1 = require("path");
const delete_all_notes_in_notebook_action_1 = require("./actions/delete-all-notes-in-notebook-action");
const delete_notebook_action_1 = require("./actions/delete-notebook-action");
const mark_as_deletion_failed_action_1 = require("./actions/mark-as-deletion-failed-action");
const verify_no_notes_in_notebook_action_1 = require("./actions/verify-no-notes-in-notebook-action");
exports.notebookDeletionWorkflow = [
    {
        type: "catch",
        action: {
            actionName: "mark-as-deletion-failed",
            import: (0, path_1.join)(__dirname, "./actions/mark-as-deletion-failed-action"),
            action: mark_as_deletion_failed_action_1.markAsDeletionFailed.name,
        },
    },
    {
        type: "action",
        action: {
            actionName: "delete-all-notes-in-notebook",
            import: (0, path_1.join)(__dirname, "./actions/delete-all-notes-in-notebook-action"),
            action: delete_all_notes_in_notebook_action_1.deleteAllNotesInNotebook.name,
        },
        catch: "mark-as-deletion-failed",
    },
    {
        type: "action",
        action: {
            actionName: "verify-no-notes-in-notebook",
            import: (0, path_1.join)(__dirname, "./actions/verify-no-notes-in-notebook-action"),
            action: verify_no_notes_in_notebook_action_1.verifyNoNotesInNotebook.name,
        },
        catch: "mark-as-deletion-failed",
    },
    {
        type: "action",
        action: {
            actionName: "delete-notebook",
            import: (0, path_1.join)(__dirname, "./actions/delete-notebook-action"),
            action: delete_notebook_action_1.deleteNotebook.name,
        },
        catch: "mark-as-deletion-failed",
    },
];
//# sourceMappingURL=notebook-deletion-workflow.js.map