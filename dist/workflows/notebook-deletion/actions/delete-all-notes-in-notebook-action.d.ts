import { Logger } from "../../../logger/logger";
import { NoteStore } from "../../../stores/note/note-store";
export interface NotebookDeletionInput {
    owner: string;
    notebookID: string;
}
export interface NotebookDeletionOutput {
    owner: string;
    notebookID: string;
}
interface DeleteAllNotesInNotebookActionProperties {
    logger: Logger;
    noteStore: NoteStore;
}
export declare class DeleteAllNotesInNotebookAction {
    private properties;
    constructor(properties: DeleteAllNotesInNotebookActionProperties);
    run(event: NotebookDeletionInput): Promise<NotebookDeletionOutput>;
}
export declare function deleteAllNotesInNotebook(event: NotebookDeletionInput): Promise<NotebookDeletionOutput>;
export {};
