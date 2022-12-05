"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStoreOpensearchServerlessConfiguration = void 0;
const opensearch_1 = require("@opensearch-project/opensearch");
const opensearch_client_1 = require("opensearch-module/dist/opensearch-client");
const opensearch_serverless_connection_1 = require("opensearch-module/dist/opensearch-serverless-connection");
const search_store_opensearch_serverless_1 = require("../stores/search/search-store-opensearch-serverless");
const searchStoreOpensearchServerlessConfiguration = (logger, searchDomainEndpoint, indexName) => {
    const r = {};
    const openSearchClient = new opensearch_1.Client({
        node: `https://${searchDomainEndpoint}/`,
        Connection: opensearch_serverless_connection_1.OpenSearchServerlessConnection,
    });
    r.searchStore = new search_store_opensearch_serverless_1.SearchStoreOpensearchServerless({
        logger,
        openSearchClient: new opensearch_client_1.OpenSearchClient({
            openSearchClient,
            indexName,
        }),
    });
    return r;
};
exports.searchStoreOpensearchServerlessConfiguration = searchStoreOpensearchServerlessConfiguration;
//# sourceMappingURL=search-store-opensearch-serverless.js.map