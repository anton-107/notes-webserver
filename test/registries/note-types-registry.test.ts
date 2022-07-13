import { NoteTypesRegistry } from "../../src/registries/note-types-registry";
import { PlaintextHandler } from "../../src/registries/note-types/plaintext-handler";
import { MarkdownHandler } from "../../src/registries/note-types/markdown-handler";

describe("Note types registry", () => {
  it("should collect and display available note types", () => {
    const r = new NoteTypesRegistry();
    r.addNoteTypeHandler(new PlaintextHandler());
    r.addNoteTypeHandler(new MarkdownHandler());
    expect(r.listNoteTypeHandlers().length).toBe(2);
  });
});
