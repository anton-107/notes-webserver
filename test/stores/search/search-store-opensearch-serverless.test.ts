import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
import { instance, mock, when } from "ts-mockito";

import { LoggerBunyan } from "../../../src/logger/logger-bunyan";
import { SearchStoreOpensearchServerless } from "../../../src/stores/search/search-store-opensearch-serverless";

describe("SearchStoreOpensearchServerless", () => {
  it("should return an empty list on search", async () => {
    const openSearchClientMock = mock<OpenSearchClient>();
    when(openSearchClientMock.search("my-keyword", "user1")).thenResolve([
      {
        owner: "user1",
      },
      {
        owner: "user2",
      },
    ]);
    const store = new SearchStoreOpensearchServerless({
      logger: new LoggerBunyan(),
      openSearchClient: instance(openSearchClientMock),
    });
    const results = await store.search("user1", "my-keyword");
    expect(results.length).toBe(1);
  });
});
