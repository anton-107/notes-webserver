import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { EntityView } from "../entity-view";
import { HtmlViewProperties } from "../interfaces";
export interface NotebookViewProperties extends HtmlViewProperties {
    corsHeaders: CORSHeaders;
}
export declare class NotebookHtmlView implements EntityView<Notebook> {
    protected properties: NotebookViewProperties;
    constructor(properties: NotebookViewProperties);
    renderEditingFormOneEntity(notebook: Notebook): HttpResponse;
    renderCreationFormOneEntity(): HttpResponse;
    renderDetailsPageOneEntity(notebook: Notebook): HttpResponse;
    renderListPageAllEntities(entities: Notebook[]): HttpResponse;
}
