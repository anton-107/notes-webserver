import { FormBody } from "../../../http/body-parser";
import { Note } from "../../../model/note-model";
import { NotebookTableColumn } from "../../../model/notebook-model";
import { NoteTypeHandler } from "../../note-types-registry";
import { PlaintextNoteHandler } from "../plaintext-handler";

export class SourceFileHandler
  extends PlaintextNoteHandler
  implements NoteTypeHandler
{
  public typeName(): string {
    return "source-file";
  }
  public typeDisplayName(): string {
    return "Source file";
  }
  public mapRequestToExistingEntity(
    username: string,
    existingNote: Note,
    form: FormBody
  ): Note {
    const note = super.mapRequestToExistingEntity(username, existingNote, form);
    if (!note.extensionProperties) {
      note.extensionProperties = {};
    }
    note.extensionProperties.numberOfLines = form["number-of-lines"];
    note.extensionProperties.numberOfChanges = form["number-of-changes"];
    note.extensionProperties.numberOfContributors =
      form["number-of-contributors"];
    return note;
  }
  public mapRequestToNewEntity(username: string, form: FormBody): Note {
    const note = super.mapRequestToNewEntity(username, form);
    note.extensionProperties.numberOfLines = form["number-of-lines"];
    note.extensionProperties.numberOfChanges = form["number-of-changes"];
    note.extensionProperties.numberOfContributors =
      form["number-of-contributors"];
    return note;
  }
  public listSupportedColumns(): NotebookTableColumn[] {
    return [
      {
        name: "Number of lines",
        columnType: "number-of-lines",
        valueType: "number",
        valueSource: "extensionProperties",
      },
      {
        name: "Number of changes",
        columnType: "number-of-changes",
        valueType: "number",
        valueSource: "extensionProperties",
      },
      {
        name: "Number of contributors",
        columnType: "number-of-contributors",
        valueType: "number",
        valueSource: "extensionProperties",
      },
    ];
  }
}
