import { dependenciesConfiguration } from "../../src/configuration/configuration";
import { HomePage } from "../../src/routes/get-home";

describe("Route GET /home", () => {
  it("should render link containing base url", async () => {
    const h = new HomePage({
      authenticationToken: "test-token",
      ...dependenciesConfiguration({
        baseUrl: "/test-base",
      }),
    });
    const output = await h.render();
    expect(output.body).toContain("/test-base/signin");
  });
});
