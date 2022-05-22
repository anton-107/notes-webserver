import { NotesWebserver } from "../src/notes-webserver";
import { HttpClient } from "./http-client";

describe("Notes webserver", () => {
  const testPort = 8134;
  let server;

  beforeAll(() => {
    server = new NotesWebserver();
    server.listen(testPort);
  });

  afterAll(() => {
    server && server.stop();
  });

  it("should render home page in html", async () => {
    const testClient = new HttpClient();
    const response = await testClient.get(`http://localhost:${testPort}/home`);
    expect(response.getHeader("content-type")).toContain("text/html");
    expect(response.getBody()).toContain("hello anonymous!");
    expect(response.getBody()).toContain("Sign in");
    expect(response.getBody()).not.toContain("Sign out");
  });
});
