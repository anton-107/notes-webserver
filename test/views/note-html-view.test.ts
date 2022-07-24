import { instance, mock, when } from "ts-mockito";
import { Note } from "../../src/model/note-model";
import { NoteTypesRegistry } from "../../src/registries/note-types-registry";
import { NoteHtmlView } from "../../src/views/note/note-html-view";

describe("Note HTML view", () => {
  it("should renderEditingFormOneEntity", () => {
    const noteMock = mock<Note>();
    const noteTypesRegistryMock = mock<NoteTypesRegistry>();
    const v = new NoteHtmlView({
      baseUrl: "",
      noteTypesRegistry: instance(noteTypesRegistryMock),
    });
    const resp = v.renderEditingFormOneEntity(instance(noteMock));
    expect(resp.body).toContain("<h1>Edit note</h1>");
  });
  it("should renderDetailsPageOneEntity", () => {
    const noteMock = mock<Note>();
    const noteTypesRegistryMock = mock<NoteTypesRegistry>();
    when(noteMock.id).thenReturn("some-id");
    const v = new NoteHtmlView({
      baseUrl: "",
      noteTypesRegistry: instance(noteTypesRegistryMock),
    });
    const resp = v.renderDetailsPageOneEntity(instance(noteMock));
    expect(resp.body).toContain("some-id");
  });
});
