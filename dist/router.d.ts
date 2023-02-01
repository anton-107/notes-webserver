export interface Route {
    method: "GET" | "POST";
    path: string;
    import: string;
    action: string;
}
export declare const routes: Route[];
export interface Action {
    actionName: string;
    import: string;
    action: string;
}
export interface ReactiveAction extends Action {
    eventSource: "notebook-entries" | "note-entries";
}
export declare const actions: ReactiveAction[];
export interface WorkflowRecord {
    type: string;
    action: Action | undefined;
}
export interface Workflow {
    workflow: WorkflowRecord[];
}
export declare const workflows: Workflow[];
