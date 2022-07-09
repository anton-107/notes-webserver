import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";
import { notebookControllerConfiguration } from "../../src/configuration/configuration";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { HttpStatus } from "../../src/http/http";
import {
  InMemoryNotebookStore,
  NotebookStore,
} from "../../src/stores/notebook-store";

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
    });
    const resp = await h.performUpdateSingleEntityAction({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return 5xx if the notebook store throws an error", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityStore: new InMemoryNotebookStore(),
    });
    const resp = await h.performUpdateSingleEntityAction({
      user: "user1",
      id: "non-existent-id",
      name: "test notebook",
    });
    expect(resp.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
