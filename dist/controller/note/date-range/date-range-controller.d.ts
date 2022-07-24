import { FormBody } from "../../../http/body-parser";
import { Note } from "../../../model/note-model";
import { NoteController } from "../note-controller";
export declare class DateRangeController extends NoteController {
    private dateRangeHandler;
    protected mapRequestToNewEntity(username: string, form: FormBody): Note;
}
