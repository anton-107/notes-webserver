"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProcessorRegistry = void 0;
class PostProcessorRegistry {
    constructor() {
        this.postProcessors = [];
    }
    addPostProcessor(postProcessor) {
        this.postProcessors.push(postProcessor);
    }
    async processResponse(username, response) {
        let body = response.body;
        for (const postProcessor of this.postProcessors) {
            const regexp = postProcessor.getRegularExpressionForMacro();
            const match = body.match(regexp);
            if (match) {
                const renderedMacro = await postProcessor.renderMacro(username, match);
                body = body.replace(regexp, renderedMacro);
            }
        }
        return { ...response, body };
    }
}
exports.PostProcessorRegistry = PostProcessorRegistry;
//# sourceMappingURL=post-processor.js.map