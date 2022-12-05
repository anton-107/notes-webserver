import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";

import { Logger } from "../../logger/logger";
import { SearchResult } from "../../model/search-result-model";
import { SearchStore } from "./search-store";

interface SearchStoreOpensearchServerlessProperties {
  logger: Logger;
  openSearchClient: OpenSearchClient;
}

export class SearchStoreOpensearchServerless implements SearchStore {
  constructor(private properties: SearchStoreOpensearchServerlessProperties) {}
  public async search(user: string, keyword: string): Promise<SearchResult[]> {
    this.properties.logger.info(
      "SearchStoreOpensearchServerless search initiated",
      {
        username: user,
        data: { keyword },
      }
    );
    return [];
  }
}
