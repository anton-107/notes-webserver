export interface NotebookDeletionInput {
    notebookID: string;
}
export interface NotebookDeletionOutput {
    notebookID: string;
}
export declare function deleteAllNotesInNotebook(event: NotebookDeletionInput): Promise<NotebookDeletionOutput>;
