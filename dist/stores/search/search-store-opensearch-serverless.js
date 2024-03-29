"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchStoreOpensearchServerless = void 0;
class SearchStoreOpensearchServerless {
    constructor(properties) {
        this.properties = properties;
    }
    async search(user, keyword) {
        this.properties.logger.info("SearchStoreOpensearchServerless search initiated", {
            username: user,
            data: { keyword },
        });
        const results = await this.properties.openSearchClient.search(keyword, user);
        return results.filter((x) => x.owner && x.owner === user);
    }
}
exports.SearchStoreOpensearchServerless = SearchStoreOpensearchServerless;
//# sourceMappingURL=search-store-opensearch-serverless.js.map