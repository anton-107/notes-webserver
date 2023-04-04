import { SearchResult } from "notes-model/dist/search-result-model";
import { OpenSearchClient } from "opensearch-module/dist/opensearch-client";
import { Logger } from "../../logger/logger";
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
