import { join } from "path";

import { WorkflowTask } from "../interfaces";
import { deleteAllNotesInNotebook } from "./delete-all-notes-in-notebook-action";
import { deleteNotebook } from "./delete-notebook-action";
import { verifyNoNotesInNotebook } from "./verify-no-notes-in-notebook-action";

export const notebookDeletionWorkflow: WorkflowTask[] = [
  {
    type: "action",
    action: {
      actionName: "delete-all-notes-in-notebook",
      import: join(__dirname, "./delete-all-notes-in-notebook-action"),
      action: deleteAllNotesInNotebook.name,
    },
  },
  {
    type: "action",
    action: {
      actionName: "verify-no-notes-in-notebook",
      import: join(__dirname, "./verify-no-notes-in-notebook-action"),
      action: verifyNoNotesInNotebook.name,
    },
  },
  {
    type: "action",
    action: {
      actionName: "delete-notebook",
      import: join(__dirname, "./delete-notebook-action"),
      action: deleteNotebook.name,
    },
  },
];
