import { dependenciesConfiguration } from "../../src/configuration/configuration";
import { HomePageController } from "../../src/controller/home/home-page-controller";

describe("HomePageController", () => {
  it("should render link containing base url", async () => {
    const h = new HomePageController({
      authenticationToken: "test-token",
      ...dependenciesConfiguration({
        baseUrl: "/test-base",
      }),
    });
    const output = await h.render();
    expect(output.body).toContain("/test-base/signin");
  });
});
