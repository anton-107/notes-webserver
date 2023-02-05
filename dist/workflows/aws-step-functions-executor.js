"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSStepFunctionsExecutor = void 0;
class AWSStepFunctionsExecutor {
    constructor(properties) {
        this.properties = properties;
    }
    async startExecution(workflowName, executionName, input) {
        let stateMachineArn = undefined;
        switch (workflowName) {
            case "notebook-deletion":
                stateMachineArn = this.properties.notebookDeletionStateMachineARN;
                break;
        }
        await this.properties.stepFunctions
            .startExecution({
            stateMachineArn,
            name: executionName,
            input,
        })
            .promise();
        return true;
    }
}
exports.AWSStepFunctionsExecutor = AWSStepFunctionsExecutor;
//# sourceMappingURL=aws-step-functions-executor.js.map