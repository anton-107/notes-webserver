"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notebookDeletionStateMachineConfiguration = void 0;
const aws_sdk_1 = require("aws-sdk");
const aws_step_functions_executor_1 = require("../workflows/aws-step-functions-executor");
const notebookDeletionStateMachineConfiguration = (logger, notebookDeletionStateMachineARN) => {
    const r = {};
    r.notebookDeletionStateMachine = new aws_step_functions_executor_1.AWSStepFunctionsExecutor({
        logger,
        stepFunctions: new aws_sdk_1.StepFunctions(),
        notebookDeletionStateMachineARN,
    });
    return r;
};
exports.notebookDeletionStateMachineConfiguration = notebookDeletionStateMachineConfiguration;
//# sourceMappingURL=state-machines.js.map