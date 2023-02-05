import { ReactiveAction } from "./actions/interfaces";
import { Workflow } from "./workflows/interfaces";
export interface Route {
    method: "GET" | "POST";
    path: string;
    import: string;
    action: string;
}
export declare const routes: Route[];
export declare const actions: ReactiveAction[];
export declare const workflows: Workflow[];
