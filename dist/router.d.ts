export interface Route {
    method: "GET" | "POST";
    path: string;
    import: string;
    action: string;
}
export declare const routes: Route[];
