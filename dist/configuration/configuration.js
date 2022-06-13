"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependenciesConfiguration = void 0;
const common_1 = require("./common");
const user_store_dynamo_1 = require("./user-store-dynamo");
const dependenciesConfiguration = (overrides) => {
    const contextConfiguration = {};
    if (process.env["USER_STORE_TYPE"] === "dynamodb") {
        Object.assign(contextConfiguration, (0, user_store_dynamo_1.userStoreDynamoConfiguration)());
    }
    contextConfiguration.baseUrl = process.env["BASE_URL"] || "";
    return (0, common_1.commonConfiguration)({
        ...contextConfiguration,
        ...overrides,
    });
};
exports.dependenciesConfiguration = dependenciesConfiguration;
//# sourceMappingURL=configuration.js.map