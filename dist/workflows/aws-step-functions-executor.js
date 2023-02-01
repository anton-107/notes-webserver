"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSStepFunctionsExecutor = void 0;
class AWSStepFunctionsExecutor {
    constructor(properties) {
        this.properties = properties;
    }
    async startExecution(executionName, input) {
        await this.properties.stepFunctions
            .startExecution({
            stateMachineArn: this.properties.stateMachineARN,
            name: executionName,
            input,
        })
            .promise();
        return true;
    }
}
exports.AWSStepFunctionsExecutor = AWSStepFunctionsExecutor;
//# sourceMappingURL=aws-step-functions-executor.js.map