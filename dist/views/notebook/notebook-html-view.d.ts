import { EntityView } from "../../controller/entity-controller";
import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { HtmlViewProperties } from "../interfaces";
interface NotebookHtmlViewProperties extends HtmlViewProperties {
    corsHeaders: CORSHeaders;
}
export declare class NotebookHtmlView implements EntityView<Notebook> {
    private properties;
    constructor(properties: NotebookHtmlViewProperties);
    renderEditingFormOneEntity(notebook: Notebook): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(notebook: Notebook): HttpResponse;
    renderListPageAllEntities(entities: Notebook[]): HttpResponse;
}
export {};
