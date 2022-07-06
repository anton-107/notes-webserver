import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../stores/notebook-store";
export interface HtmlViewProperties {
    baseUrl: string;
}
export declare class NotebookHtmlView implements EntityView<Notebook> {
    private properties;
    constructor(properties: HtmlViewProperties);
    renderEditingFormOneEntity(notebook: Notebook): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
}
