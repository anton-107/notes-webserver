import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { NotebookHtmlView } from "../../src/views/notebook/notebook-html-view";
import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";
import { HttpRedirectView } from "../../src/views/http-redirect-view";

describe("Route GET /notebook/:notebookID/edit", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new NotebookController({
      authenticationToken: "",
      authenticator: instance(authenticatorMock),
      entityView: new NotebookHtmlView({ baseUrl: "" }),
      httpRedirectView: new HttpRedirectView({ baseUrl: "" }),
      entityStore: instance(notebookStoreMock),
    });
    const resp = await h.showEditSingleEntityPage("");
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
      authenticationToken: "user1-token",
      authenticator: instance(authenticatorMock),
      entityView: new NotebookHtmlView({ baseUrl: "" }),
      httpRedirectView: new HttpRedirectView({ baseUrl: "" }),
      entityStore: instance(notebookStoreMock),
    });
    const resp = await h.showEditSingleEntityPage("user2-notebook");
    expect(resp.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});