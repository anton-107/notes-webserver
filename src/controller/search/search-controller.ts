import { Authenticator } from "authentication-module/dist/authenticator";

import { CORSHeaders } from "../../http/cors-headers";
import { HttpResponse, HttpStatus } from "../../http/http";
import { Logger } from "../../logger/logger";
import { SearchStore } from "../../stores/search/search-store";

interface SearchControllerProperties {
  logger: Logger;
  authenticationToken: string;
  authenticator: Authenticator;
  searchStore: SearchStore;
  corsHeaders: CORSHeaders;
}

export class SearchController {
  constructor(private properties: SearchControllerProperties) {}
  public async search(keyword: string): Promise<HttpResponse> {
    const user = await this.properties.authenticator.authenticate(
      this.properties.authenticationToken
    );

    const results = await this.properties.searchStore.search(
      user.username,
      keyword
    );
    return {
      isBase64Encoded: false,
      headers: {
        "Content-Type": "application/json",
        ...this.properties.corsHeaders,
      },
      statusCode: HttpStatus.OK,
      body: JSON.stringify({
        results,
      }),
    };
  }
}
