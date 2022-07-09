import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";
import { notebookControllerConfiguration } from "../../src/configuration/configuration";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { HttpStatus } from "../../src/http/http";
import { NotebookStore } from "../../src/stores/notebook/notebook-store";

describe("Route GET /notebook/:notebookID", () => {
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
    const resp = await h.showSingleEntityDetailsPage("");
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return not found if user does not own the requested notebook", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
      username: "testuser1",
    });
    const notebookStoreMock = mock<NotebookStore>();
    when(notebookStoreMock.getOne("testuser1", "user2-notebook")).thenResolve(
      undefined
    );
    const h = new NotebookController({
      ...controllerConfiguration,
      authenticationToken: "user1-token",
      authenticator: instance(authenticatorMock),
      entityStore: instance(notebookStoreMock),
    });
    const resp = await h.showSingleEntityDetailsPage("user2-notebook");
    expect(resp.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
