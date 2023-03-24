import { FormBody } from "../../../http/body-parser";
import { Note, NoteExtensionProperties } from "../../../model/note-model";
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
    this.populateExtensionPropertiesFromForm(note.extensionProperties, form);
    return note;
  }
  public mapRequestToNewEntity(username: string, form: FormBody): Note {
    const note = super.mapRequestToNewEntity(username, form);
    this.populateExtensionPropertiesFromForm(note.extensionProperties, form);
    return note;
  }
  public listSupportedColumns(): NotebookTableColumn[] {
    return [
      {
        name: "Number of lines",
        columnType: "numberOfLines",
        valueType: "number",
        valueSource: "extensionProperties",
      },
      {
        name: "Number of changes",
        columnType: "numberOfChanges",
        valueType: "number",
        valueSource: "extensionProperties",
      },
      {
        name: "Number of contributors",
        columnType: "numberOfContributors",
        valueType: "number",
        valueSource: "extensionProperties",
      },
    ];
  }
  private populateExtensionPropertiesFromForm(
    extensionProperties: NoteExtensionProperties,
    form: FormBody
  ) {
    extensionProperties.numberOfLines = form["number-of-lines"];
    extensionProperties.numberOfChanges = form["number-of-changes"];
    extensionProperties.numberOfContributors = form["number-of-contributors"];
  }
}
