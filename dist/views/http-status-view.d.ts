import { HttpResponse } from "../http/http";
export declare class HttpStatusView {
    showJSONCreated(): HttpResponse;
    showNotFound(): HttpResponse;
    showForbidden(): HttpResponse;
    showInternalServerError(): HttpResponse;
}
