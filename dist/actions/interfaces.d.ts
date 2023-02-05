export interface Action {
    actionName: string;
    import: string;
    action: string;
}
export interface ReactiveAction extends Action {
    eventSource: "notebook-entries" | "note-entries";
}
