import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";
import { notebookControllerConfiguration } from "../../src/configuration/configuration";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { HttpStatus } from "../../src/http/http";
import { ResponseType } from "../../src/http/response-type-parser";
import {
  InMemoryNotebookStore,
  NotebookStore,
} from "../../src/stores/notebook/notebook-store";

describe("Route POST /notebook/:notebookID/edit", () => {
  const controllerConfiguration = notebookControllerConfiguration({});

  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: instance(notebookStoreMock),
      responseType: ResponseType.HTML,
    });
    const resp = await h.performUpdateSingleEntityAction({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return 4xx if the notebook is not found in notebook store", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: new InMemoryNotebookStore(),
      responseType: ResponseType.HTML,
    });
    const resp = await h.performUpdateSingleEntityAction({
      user: "user1",
      id: "non-existent-id",
      name: "test notebook",
    });
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return 5xx if the notebook store throws an error", async () => {
    const authenticatorMock = mock<Authenticator>();
    const notebookStoreMock = mock<NotebookStore>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    when(notebookStoreMock.getOne(anything(), "test-id")).thenResolve({
      id: "",
      name: "",
      owner: "",
      sections: [],
      tableColumns: [],
      createdAt: "",
      updatedAt: "",
    });
    when(notebookStoreMock.editOne(anything())).thenReject(
      Error("this is a test error")
    );
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: instance(notebookStoreMock),
      responseType: ResponseType.HTML,
    });
    const resp = await h.performUpdateSingleEntityAction({
      user: "user1",
      "notebook-id": "test-id",
      name: "test notebook",
    });
    expect(resp.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
