"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexForSearch = void 0;
class IndexForSearch {
    constructor(properties) {
        this.properties = properties;
    }
    async run(actionTrigger) {
        //eslint-disable-next-line no-console
        console.log("actionTrigger", actionTrigger, this.properties.openSearchClient);
        return;
    }
}
exports.IndexForSearch = IndexForSearch;
//# sourceMappingURL=index-for-search.js.map