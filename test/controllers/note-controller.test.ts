import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";

import { noteControllerConfiguration } from "../../src/configuration/configuration";
import { NoteController } from "../../src/controller/note/note-controller";
import { HttpStatus } from "../../src/http/http";
import { ResponseType } from "../../src/http/response-type-parser";
import { NotebookStore } from "../../src/stores/notebook/notebook-store";
import { NoteHtmlView } from "../../src/views/note/note-html-view";

describe("Note controller", () => {
  it("should return forbidden if user is not the owner of the notebook", async () => {
    const authenticatorMock = mock<Authenticator>();
    const notebookStoreMock = mock<NotebookStore>();
    const viewMock = mock<NoteHtmlView>();

    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
      username: "testuser",
    });
    when(notebookStoreMock.getOne(anything(), anything())).thenResolve(null);

    const c = new NoteController({
      ...noteControllerConfiguration({}),
      authenticator: instance(authenticatorMock),
      authenticationToken: "",
      notebookStore: instance(notebookStoreMock),
      entityView: instance(viewMock),
      notebookID: null,
      noteType: "",
      responseType: ResponseType.HTML,
    });
    const resp = await c.performCreateSingleEntityAction({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return forbidden on showListEntitiesPage if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    const notebookStoreMock = mock<NotebookStore>();
    const viewMock = mock<NoteHtmlView>();

    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const c = new NoteController({
      ...noteControllerConfiguration({}),
      authenticator: instance(authenticatorMock),
      authenticationToken: "",
      notebookStore: instance(notebookStoreMock),
      entityView: instance(viewMock),
      notebookID: null,
      noteType: "",
      responseType: ResponseType.HTML,
    });
    const resp = await c.showListEntitiesPage();
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
});
