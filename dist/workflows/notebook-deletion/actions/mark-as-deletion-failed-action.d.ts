import { Logger } from "../../../logger/logger";
import { NotebookStore } from "../../../stores/notebook/notebook-store";
import { NotebookDeletionOutput } from "./delete-all-notes-in-notebook-action";
interface MarkAsDeletionFailedActionProperties {
    logger: Logger;
    notebookStore: NotebookStore;
}
export declare class MarkAsDeletionFailedAction {
    private properties;
    constructor(properties: MarkAsDeletionFailedActionProperties);
    run(event: NotebookDeletionOutput): Promise<void>;
}
export declare function markAsDeletionFailed({ Payload, }: {
    Payload: NotebookDeletionOutput;
}): Promise<void>;
export {};
