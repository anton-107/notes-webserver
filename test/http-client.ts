import fetch, { Headers, Response } from "node-fetch";

export interface HttpResponse {
  getHeader(headerName: string): string;
  getBody(): Promise<string>;
  getStatus(): number;
  getResponsePath(): string;
}

class FetchResponse implements HttpResponse {
  constructor(private response: Response) {}
  getStatus(): number {
    return this.response.status;
  }
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
  private removeCookie(cookieName: string) {
    this.cookies = this.cookies.filter((c) => {
      return !c.startsWith(`${cookieName}=`);
    });
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
    formObject: { [key: string]: string }
  ): Promise<HttpResponse> {
    const headers = new Headers({
      Cookie: this.cookies.join("; "),
    });

    let resp = await fetch(url, {
      method: "post",
      headers,
      body: new URLSearchParams(formObject),
      redirect: "manual",
    });

    this.processCookies(resp.headers.raw()["set-cookie"]);

    if (resp.status >= 300 && resp.status < 400) {
      resp = await fetch(resp.headers.get("location"), {
        method: "get",
        headers: new Headers({
          Cookie: this.cookies.join("; "),
        }),
      });
      this.processCookies(resp.headers.raw()["set-cookie"]);
    }

    return new FetchResponse(resp);
  }

  private processCookies(cookies: string[]) {
    if (!cookies) {
      return;
    }
    cookies.forEach((c) => {
      const parts = c.split(";");
      let cookieName,
        cookieValue,
        hasExpired = false;
      parts.forEach((p, index) => {
        const parts = p.trim().split("=");
        if (index === 0) {
          cookieName = parts[0];
          cookieValue = parts[1];
          return;
        }
        if (parts[0] === "Expires") {
          const expirationDate = new Date(parts[1]);
          hasExpired = new Date() > expirationDate;
        }
      });
      if (hasExpired) {
        this.removeCookie(cookieName);
      } else {
        this.addCookie(`${cookieName}=${cookieValue}`);
      }
    });
  }
}
