import { join } from "path";

import { deleteAllNotesInNotebook } from "./delete-all-notes-in-notebook-action";

export const notebookDeletionWorkflow = [
  {
    type: "action",
    action: {
      actionName: "delete-all-notes-in-notebook",
      import: join(__dirname, "./delete-all-notes-in-notebook"),
      action: deleteAllNotesInNotebook.name,
    },
  },
];
