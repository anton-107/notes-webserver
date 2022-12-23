import { HttpResponse } from "../http/http";
export declare class HttpStatusView {
    showNotFound(): HttpResponse;
    showForbidden(): HttpResponse;
    showInternalServerError(): HttpResponse;
}
