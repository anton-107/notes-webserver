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
export interface WorkflowTask {
    type: string;
    action: Action | undefined;
}
export interface Workflow {
    name: string;
    tasks: WorkflowTask[];
}
export declare const workflows: Workflow[];
