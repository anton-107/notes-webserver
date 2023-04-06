import { Note } from "notes-model/dist/note-model";
import {
  SourceFileContributor,
  SourceFileHandlerExtensionProperties,
  SourceFileNoteCreateUpdateRequest,
} from "notes-model/dist/note-types/codebase/source-file";
import { NotebookTableColumn } from "notes-model/dist/notebook-model";

import { FormBody } from "../../../http/body-parser";
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
      {
        name: "Contributors",
        columnType: "contributors",
        valueType: "list-of-objects",
        valueSource: "extensionProperties",
      },
    ];
  }
  private populateExtensionPropertiesFromForm(
    extensionProperties: Partial<SourceFileHandlerExtensionProperties>,
    form: Partial<SourceFileNoteCreateUpdateRequest>
  ) {
    extensionProperties.numberOfLines = form["number-of-lines"];
    extensionProperties.numberOfChanges = form["number-of-changes"];
    extensionProperties.numberOfContributors = form["number-of-contributors"];

    if ("contributors" in form) {
      const contributors: SourceFileContributor[] = JSON.parse(
        form["contributors"]
      );
      extensionProperties.contributors = contributors.map((c) => {
        return {
          name: String(c.name),
          numberOfChanges: parseInt(String(c.numberOfChanges)),
          firstChangeTimestamp: parseInt(String(c.firstChangeTimestamp)),
          lastChangeTimestamp: parseInt(String(c.lastChangeTimestamp)),
        };
      });
    }
  }
}
