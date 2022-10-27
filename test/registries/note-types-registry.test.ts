import { NoteTypesRegistry } from "../../src/registries/note-types-registry";
import { PlaintextNoteHandler } from "../../src/registries/note-types/plaintext-handler";
import { MarkdownHandler } from "../../src/registries/note-types/markdown-handler";
import { DateRangeNoteHandler } from "../../src/registries/note-types/date-range-handler";
import { NotebookTableColumnsRegistry } from "../../src/registries/notebook-table-columns-registry";

describe("Note types registry", () => {
  it("should collect and display available note types", () => {
    const r = new NoteTypesRegistry();
    r.addNoteTypeHandler(
      new PlaintextNoteHandler({
        notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
      })
    );
    r.addNoteTypeHandler(
      new MarkdownHandler({
        notebookTableColumnsRegistry: new NotebookTableColumnsRegistry(),
      })
    );
    r.addNoteTypeHandler(new DateRangeNoteHandler());
    expect(r.listNoteTypeHandlers().length).toBe(3);
  });
});
