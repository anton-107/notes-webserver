import { Notebook, NotebookTableColumn } from "notes-model/dist/notebook-model";
import { HttpResponse } from "../../http/http";
import { EntityView } from "../entity-view";
import { NotebookHtmlView } from "./notebook-html-view";
export declare class NotebookJsonView extends NotebookHtmlView implements EntityView<Notebook> {
    renderDetailsPageOneEntity(entity: Notebook): HttpResponse;
    renderSupportedTableColumns(columns: NotebookTableColumn[]): HttpResponse;
}
