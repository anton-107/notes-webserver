import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../stores/notebook-store";
import { HtmlViewProperties } from "../interfaces";
export declare class NotebookHtmlView implements EntityView<Notebook> {
    private properties;
    constructor(properties: HtmlViewProperties);
    renderEditingFormOneEntity(notebook: Notebook): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(notebook: Notebook): HttpResponse;
}
