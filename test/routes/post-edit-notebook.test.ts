import { EditNotebookAction } from "../../src/routes/post-edit-notebook";
import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import {
  InMemoryNotebookStore,
  NotebookStore,
} from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";

describe("Route POST /notebook/:notebookID/edit", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new EditNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
  it("should return 5xx if the notebook store throws an error", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: true,
    });
    const h = new EditNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: new InMemoryNotebookStore(),
    });
    const resp = await h.render({
      user: "user1",
      id: "non-existent-id",
      name: "test notebook",
    });
    expect(resp.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
