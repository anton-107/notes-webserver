import { Authenticator } from "authentication-module/dist/authenticator";
import { anything, instance, mock, when } from "ts-mockito";
import { HttpStatus } from "../../src/http/http";
import { ResponseType } from "../../src/http/response-type-parser";
import { SigninController } from "./../../src/controller/auth/signin-controller";

describe("SigninController", () => {
  it("should return forbidden in json response if authentication fails", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.signIn(anything(), anything())).thenResolve({
      isAuthenticated: false,
    });
    const c = new SigninController({
      authenticationToken: "fake-token",
      authenticator: instance(authenticatorMock),
      baseUrl: "",
      responseType: ResponseType.JSON,
    });
    const r = await c.render({});
    const json = JSON.parse(r.body);
    expect(r.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(json.isAuthenticated).toBe(false);
  });
  it("should return ok and in json response and a cors header if authentication succeeds", async () => {
    const authenticatorMock = mock<Authenticator>();
    when(authenticatorMock.signIn(anything(), anything())).thenResolve({
      isAuthenticated: true,
    });
    const c = new SigninController({
      authenticationToken: "fake-token",
      authenticator: instance(authenticatorMock),
      baseUrl: "",
      responseType: ResponseType.JSON,
    });
    const r = await c.render({});
    const json = JSON.parse(r.body);
    expect(r.statusCode).toBe(HttpStatus.OK);
    expect(r.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(json.isAuthenticated).toBe(true);
  });
});
