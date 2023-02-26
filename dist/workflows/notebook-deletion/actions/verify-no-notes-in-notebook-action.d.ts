import { Logger } from "../../../logger/logger";
import { NoteStore } from "../../../stores/note/note-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";
interface VerifyNoNotesInNotebookActionProperties {
    logger: Logger;
    noteStore: NoteStore;
}
export declare class VerifyNoNotesInNotebookAction {
    private properties;
    constructor(properties: VerifyNoNotesInNotebookActionProperties);
    run(event: NotebookDeletionOutput): Promise<NotebookDeletionOutput>;
}
export declare function verifyNoNotesInNotebook({ Payload, }: {
    Payload: NotebookDeletionOutput;
}): Promise<NotebookDeletionOutput>;
export {};
