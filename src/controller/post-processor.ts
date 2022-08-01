import { HttpResponse } from "../http/http";

export interface PostProcessor {
  getRegularExpressionForMacro(): RegExp;
  renderMacro(username: string, match: RegExpMatchArray): Promise<string>;
}

export class PostProcessorRegistry {
  private postProcessors: PostProcessor[] = [];

  public addPostProcessor(postProcessor: PostProcessor): void {
    this.postProcessors.push(postProcessor);
  }
  public async processResponse(
    username: string,
    response: HttpResponse
  ): Promise<HttpResponse> {
    let body = response.body;
    for (const postProcessor of this.postProcessors) {
      const regexp = postProcessor.getRegularExpressionForMacro();
      const match = body.match(regexp);
      if (match) {
        console.log("MATCH: ", regexp);
        const renderedMacro = await postProcessor.renderMacro(username, match);
        body = body.replace(regexp, renderedMacro);
      }
    }
    return { ...response, body };
  }
}
