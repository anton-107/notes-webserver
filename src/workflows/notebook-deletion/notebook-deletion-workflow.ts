import { join } from "path";

import { WorkflowTask } from "../interfaces";
import { deleteAllNotesInNotebook } from "./actions/delete-all-notes-in-notebook-action";
import { deleteNotebook } from "./actions/delete-notebook-action";
import { markAsDeletionFailed } from "./actions/mark-as-deletion-failed-action";
import { verifyNoNotesInNotebook } from "./actions/verify-no-notes-in-notebook-action";

export const notebookDeletionWorkflow: WorkflowTask[] = [
  {
    type: "catch",
    action: {
      actionName: "mark-as-deletion-failed",
      import: join(__dirname, "./actions/mark-as-deletion-failed-action"),
      action: markAsDeletionFailed.name,
    },
  }
  {
    type: "action",
    action: {
      actionName: "delete-all-notes-in-notebook",
      import: join(__dirname, "./actions/delete-all-notes-in-notebook-action"),
      action: deleteAllNotesInNotebook.name,
    },
    catch: "mark-as-deletion-failed",
  },
  {
    type: "action",
    action: {
      actionName: "verify-no-notes-in-notebook",
      import: join(__dirname, "./actions/verify-no-notes-in-notebook-action"),
      action: verifyNoNotesInNotebook.name,
    },
    catch: "mark-as-deletion-failed",
  },
  {
    type: "action",
    action: {
      actionName: "delete-notebook",
      import: join(__dirname, "./actions/delete-notebook-action"),
      action: deleteNotebook.name,
    },
    catch: "mark-as-deletion-failed",
  },
];
