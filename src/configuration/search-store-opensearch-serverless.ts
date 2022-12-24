import { Client } from "@opensearch-project/opensearch";
import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
import { OpenSearchServerlessConnection } from "opensearch-module/dist/opensearch-serverless-connection";

import { Logger } from "../logger/logger";
import { SearchStoreOpensearchServerless } from "../stores/search/search-store-opensearch-serverless";
import { ServiceConfigurationOverrides } from "./interfaces";

export const searchStoreOpensearchServerlessConfiguration = (
  logger: Logger,
  searchDomainEndpoint: string,
  indexName: string
): ServiceConfigurationOverrides => {
  const r: ServiceConfigurationOverrides = {};
  const openSearchClient = new Client({
    node: `https://${searchDomainEndpoint}/`,
    Connection: OpenSearchServerlessConnection,
  });
  r.searchStore = new SearchStoreOpensearchServerless({
    logger,
    openSearchClient: new OpenSearchClient({
      openSearchClient,
      indexName,
    }),
  });
  return r;
};
