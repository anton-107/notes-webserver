import { FormBody } from "../../../http/body-parser";
import { Note } from "../../../model/note-model";
import { DateRangeNoteHandler } from "../../../registries/note-types/date-range-handler";
import { NoteController } from "../note-controller";

export class DateRangeController extends NoteController {
  private dateRangeHandler = new DateRangeNoteHandler();

  protected mapRequestToNewEntity(username: string, form: FormBody): Note {
    return this.dateRangeHandler.mapRequestToNewEntity(username, form);
  }
}
