import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
import { Logger } from "../../logger/logger";
import { SearchResult } from "../../model/search-result-model";
import { SearchStore } from "./search-store";
interface SearchStoreOpensearchServerlessProperties {
    logger: Logger;
    openSearchClient: OpenSearchClient;
}
export declare class SearchStoreOpensearchServerless implements SearchStore {
    private properties;
    constructor(properties: SearchStoreOpensearchServerlessProperties);
    search(user: string, keyword: string): Promise<SearchResult[]>;
}
export {};
