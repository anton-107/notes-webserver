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
    expect(response.getBody()).toContain("hello anonymous!");

    const root = parse(response.getBody());
    const signInLink = root.querySelector("*[data-testid=sign-in-link]");
    const signOutLink = root.querySelector("*[data-testid=sign-out-link]");
    expect(signInLink).toBeTruthy();
    expect(signOutLink).toBe(null);

    const signInHref = signInLink.getAttribute("href");
    expect(signInHref).toBe("/signin");
  });
  it("should render home page for a signed in user", async () => {
    const userToken = "sample-user-token:user1";
    const testClient = new HttpClient();
    testClient.addCookie(`Authentication=usertoken ${userToken}`);
    const response = await testClient.get(`http://localhost:${testPort}/home`);
    expect(response.getHeader("content-type")).toContain("text/html");

    expect(response.getBody()).toContain("hello user1!");
    expect(response.getBody()).not.toContain("Sign in");
    expect(response.getBody()).toContain("Sign out");
  });
});
