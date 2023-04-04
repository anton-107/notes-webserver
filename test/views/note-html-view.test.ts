import { Note } from "notes-model/dist/note-model";
import { instance, mock, when } from "ts-mockito";

import { NoteTypesRegistry } from "../../src/registries/note-types-registry";
import { NoteHtmlView } from "../../src/views/note/note-html-view";

describe("Note HTML view", () => {
  it("should renderEditingFormOneEntity", () => {
    const noteMock = mock<Note>();
    const noteTypesRegistryMock = mock<NoteTypesRegistry>();
    const v = new NoteHtmlView({
      baseUrl: "",
      noteTypesRegistry: instance(noteTypesRegistryMock),
      corsHeaders: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Credentials": "false",
      },
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
      corsHeaders: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Credentials": "false",
      },
    });
    const resp = v.renderDetailsPageOneEntity(instance(noteMock));
    expect(resp.body).toContain("some-id");
  });
  it("should renderCreationFormOneEntity", () => {
    const noteMock = mock<Note>();
    const noteTypesRegistryMock = mock<NoteTypesRegistry>();
    when(noteMock.id).thenReturn("some-id");
    const v = new NoteHtmlView({
      baseUrl: "",
      noteTypesRegistry: instance(noteTypesRegistryMock),
      corsHeaders: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Credentials": "false",
      },
    });
    const resp = v.renderCreationFormOneEntity({});
    expect(resp.body).toContain("<textarea name='note-content'");
  });
  it("should renderListPageAllEntities", () => {
    const noteTypesRegistryMock = mock<NoteTypesRegistry>();
    const v = new NoteHtmlView({
      baseUrl: "",
      noteTypesRegistry: instance(noteTypesRegistryMock),
      corsHeaders: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Credentials": "false",
      },
    });
    const resp = v.renderListPageAllEntities([]);
    const json = JSON.parse(resp.body);
    expect(Array.isArray(json.notes)).toBe(true);
  });
});
