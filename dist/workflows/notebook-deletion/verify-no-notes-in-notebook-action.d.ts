import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";
export declare function verifyNoNotesInNotebook({ Payload, }: {
    Payload: NotebookDeletionOutput;
}): Promise<NotebookDeletionOutput>;
