import { EntityView } from "../../controller/entity-controller";
import { HttpResponse } from "../../http/http";
import { Notebook } from "../../model/notebook-model";
import { NotebookHtmlView } from "./notebook-html-view";
export declare class NotebookJsonView extends NotebookHtmlView implements EntityView<Notebook> {
    renderDetailsPageOneEntity(entity: Notebook): HttpResponse;
}
