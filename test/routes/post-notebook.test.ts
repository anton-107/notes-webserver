import { anything, instance, mock, when } from "ts-mockito";
import { Authenticator } from "authentication-module/dist/authenticator";
import { NotebookStore } from "../../src/stores/notebook-store";
import { HttpStatus } from "../../src/http/http";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { NotebookHtmlView } from "../../src/views/notebook/notebook-html-view";
import { HttpRedirectView } from "../../src/views/http-redirect-view";

describe("Route POST /notebook", () => {
  it("should return forbidden if user is not authenticated", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.authenticate(anything())).thenResolve({
      isAuthenticated: false,
    });
    const notebookStoreMock = mock<NotebookStore>();
    const h = new NotebookController({
      authenticationToken: "",
      entityView: new NotebookHtmlView({ baseUrl: "" }),
      httpRedirectView: new HttpRedirectView({ baseUrl: "" }),
      authenticator: instance(authenticatorMock),
      entityStore: instance(notebookStoreMock),
    });
    const resp = await h.performCreateSingleEntityAction({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
});
