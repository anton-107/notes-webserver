import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";

import { notebookControllerConfiguration } from "../../src/configuration/configuration";
import { NotebookController } from "../../src/controller/notebook/notebook-controller";
import { HttpStatus } from "../../src/http/http";
import { ResponseType } from "../../src/http/response-type-parser";
import { NotebookStore } from "../../src/stores/notebook/notebook-store";

describe("Route POST /notebook", () => {
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
    const resp = await h.performCreateSingleEntityAction({});
    expect(resp.statusCode).toBe(HttpStatus.FORBIDDEN);
  });
});
