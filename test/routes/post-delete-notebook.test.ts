import { DeleteNotebookAction } from "./../../src/routes/post-delete-notebook";
import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import {
  InMemoryNotebookStore,
  NotebookStore,
} from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";

describe("Route POST /delete-notebook", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new DeleteNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return bad request if notebook id is not passed", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new DeleteNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return 5xx if notebook store throws an error", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
      username: "testuser",
    });
    const h = new DeleteNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: new InMemoryNotebookStore(),
    });
    const resp = await h.render({ notebookID: "test-id" });
    expect(resp.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
