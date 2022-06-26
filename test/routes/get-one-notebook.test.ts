import { NotebookDetailsPage } from "./../../src/routes/get-one-notebook";
import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";

describe("Route GET /notebook/:notebookID", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new NotebookDetailsPage({
      authenticationToken: "",
      notebookID: "",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render();
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
    const h = new NotebookDetailsPage({
      authenticationToken: "user1-token",
      notebookID: "user2-notebook",
      baseUrl: "",
      authenticator: instance(authenticatorMock),
      notebookStore: instance(notebookStoreMock),
    });
    const resp = await h.render();
    expect(resp.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
