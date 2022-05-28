import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient } from "./http-client";
import { UserStore } from "authentication-module//src/authenticator";
import { mock, instance } from "ts-mockito";
import { parse } from "node-html-parser";

describe("Notes webserver", () => {
  const testPort = 8134;
  let server;

  beforeAll(() => {
    server = new NotesWebserver({
      userStore: instance(mock<UserStore>()),
      jwtSerializerSecretKey: "no-secret",
    });
    server.listen(testPort);
  });

  afterAll(() => {
    server && server.stop();
  });

  it("should render home page for an anonymous user in html", async () => {
    const testClient = new HttpClient();
    const response = await testClient.get(`http://localhost:${testPort}/home`);
    expect(response.getHeader("content-type")).toContain("text/html");

    const body = await response.getBody();
    expect(body).toContain("hello anonymous!");

    const root = parse(body);
    const signInLink = root.querySelector("*[data-testid=sign-in-link]");
    const signOutLink = root.querySelector("*[data-testid=sign-out-link]");
    expect(signInLink).toBeTruthy();
    expect(signOutLink).toBe(null);

    const signInHref = signInLink.getAttribute("href");
    expect(signInHref).toBe("/signin");
  });
  it("should render home page for an anonymous user if access token is incorrect", async () => {
    const testClient = new HttpClient();
    testClient.addCookie("Authentication=jwt some-invalid-jwt-token");
    const response = await testClient.get(`http://localhost:${testPort}/home`);
    expect(response.getHeader("content-type")).toContain("text/html");

    const body = await response.getBody();
    expect(body).toContain("hello anonymous!");

    const root = parse(body);
    const signInLink = root.querySelector("*[data-testid=sign-in-link]");
    const signOutLink = root.querySelector("*[data-testid=sign-out-link]");
    expect(signInLink).toBeTruthy();
    expect(signOutLink).toBe(null);
  });
});
