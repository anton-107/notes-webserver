import { CreateNotebookAction } from "./../../src/routes/post-notebook";
import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";

describe("Route POST /notebook", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new CreateNotebookAction({
      authenticationToken: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
});
