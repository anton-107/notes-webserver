export interface NotebookDeletionInput {
    notebookID: string;
}
export declare function deleteAllNotesInNotebook(event: NotebookDeletionInput): Promise<void>;
