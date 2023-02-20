import { Logger } from "../../logger/logger";
import { NotebookStore } from "../../stores/notebook/notebook-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";
interface DeleteNotebookActionProperties {
    logger: Logger;
    notebookStore: NotebookStore;
}
export declare class DeleteNotebookAction {
    private properties;
    constructor(properties: DeleteNotebookActionProperties);
    run(event: NotebookDeletionOutput): Promise<void>;
}
export declare function deleteNotebook({ Payload, }: {
    Payload: NotebookDeletionOutput;
}): Promise<void>;
export {};
