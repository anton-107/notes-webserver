import fetch, { Headers, Response } from "node-fetch";

export interface HttpResponse {
  getHeader(headerName: string): string;
  getBody(): Promise<string>;
  getResponsePath(): string;
}

class FetchResponse implements HttpResponse {
  constructor(private response: Response) {}
  getHeader(headerName: string): string {
    return this.response.headers.get(headerName);
  }
  async getBody(): Promise<string> {
    return await this.response.text();
  }
  getResponsePath(): string {
    return new URL(this.response.url).pathname;
  }
}

export class HttpClient {
  private cookies: string[] = [];

  public addCookie(cookie: string) {
    this.cookies.push(cookie);
  }
  public async get(url: string): Promise<FetchResponse> {
    const headers = new Headers({
      Cookie: this.cookies.join("; "),
    });

    const resp = await fetch(url, {
      method: "get",
      headers,
    });
    return new FetchResponse(resp);
  }
  public async postForm(
    url: string,
    formData: { [key: string]: string }
  ): Promise<HttpResponse> {
    const headers = new Headers({
      Cookie: this.cookies.join("; "),
    });

    let resp = await fetch(url, {
      method: "post",
      headers,
      body: JSON.stringify(formData),
      redirect: "manual",
    });

    if (resp.status >= 300 && resp.status < 400) {
      const cookieHeader = resp.headers.get("set-cookie");
      const cookie = cookieHeader.split(";");
      this.addCookie(cookie[0]);
      resp = await fetch(resp.headers.get("location"), {
        method: "get",
        headers: new Headers({
          Cookie: this.cookies.join("; "),
        }),
      });
    }

    return new FetchResponse(resp);
  }
}
