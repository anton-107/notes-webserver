import { HttpResponse } from "../http/http";

export interface PostProcessor {
  getRegularExpressionForMacro(): RegExp;
  renderMacro(match: RegExpMatchArray): Promise<string>;
}

export class PostProcessorRegistry {
  private postProcessors: PostProcessor[] = [];

  public addPostProcessor(postProcessor: PostProcessor): void {
    this.postProcessors.push(postProcessor);
  }
  public async processResponse(response: HttpResponse): Promise<HttpResponse> {
    let body = response.body;
    for (const postProcessor of this.postProcessors) {
      const regexp = postProcessor.getRegularExpressionForMacro();
      const match = body.match(regexp);
      if (match) {
        const renderedMacro = await postProcessor.renderMacro(match);
        body = body.replace(regexp, renderedMacro);
      }
    }
    return { ...response, body };
  }
}
