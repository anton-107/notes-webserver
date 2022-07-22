import { HttpResponse } from "../../../http/http";
import { NoteHtmlViewProperties } from "../note-html-view";
export declare class DateRangeHtmlView {
    private properties;
    constructor(properties: NoteHtmlViewProperties);
    renderCreationFormOneEntity(): HttpResponse;
}
