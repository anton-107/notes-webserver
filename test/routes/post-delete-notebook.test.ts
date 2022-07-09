import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";
import { notebookControllerConfiguration } from "../../src/configuration/configuration";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { HttpStatus } from "../../src/http/http";
import {
  InMemoryNotebookStore,
  NotebookStore,
} from "../../src/stores/notebook/notebook-store";

describe("Route POST /delete-notebook", () => {
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
    });
    const resp = await h.performDeleteSingleEntityAction("");
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return bad request if notebook id is not passed", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: instance(notebookStoreMock),
    });
    const resp = await h.performDeleteSingleEntityAction("");
    expect(resp.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should return 5xx if notebook store throws an error", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
      username: "testuser",
    });
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: new InMemoryNotebookStore(),
    });
    const resp = await h.performDeleteSingleEntityAction("test-id");
    expect(resp.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
