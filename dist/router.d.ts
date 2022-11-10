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
    eventSource: "note-entries";
}
export declare const actions: Action[];
