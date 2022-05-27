import { AxiosResponse, default as axios } from "axios";

export interface HttpResponse {
  getHeader(headerName: string): string;
  getBody(): string;
  getResponsePath(): string;
}

class HttpResponseAxios implements HttpResponse {
  constructor(private response: AxiosResponse) {}
  getHeader(headerName: string): string {
    return this.response.headers[headerName];
  }
  getBody(): string {
    return this.response.data;
  }
  getResponsePath(): string {
    return this.response.request.path;
  }
}

export class HttpClient {
  private cookies: string[] = [];

  public addCookie(cookie: string) {
    this.cookies.push(cookie);
  }
  public async get(url: string): Promise<HttpResponse> {
    const resp = await axios.get(url, {
      headers: {
        Cookie: this.cookies.join("; "),
      },
    });
    return new HttpResponseAxios(resp);
  }
  public async postForm(
    url: string,
    formData: { [key: string]: string }
  ): Promise<HttpResponse> {
    const resp = await axios.postForm(url, formData, {
      headers: {
        Cookie: this.cookies.join("; "),
      },
    });
    return new HttpResponseAxios(resp);
  }
}
