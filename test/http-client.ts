import { AxiosResponse, default as axios } from "axios";

interface HttpResponse {
  getHeader(headerName: string): string;
  getBody(): string;
}

class HttpResponseAxios implements HttpResponse {
  constructor(private response: AxiosResponse) {}
  getHeader(headerName: string): string {
    return this.response.headers[headerName];
  }
  getBody(): string {
    return this.response.data;
  }
}

export class HttpClient {
  private cookies: string[] = [];

  public addCookie(cookie: string) {
    this.cookies.push(cookie);
  }
  public async get(url: string): Promise<HttpResponse> {
    axios;
    const resp = await axios.get(url, {
      headers: {
        Cookie: this.cookies.join("; "),
      },
    });
    return new HttpResponseAxios(resp);
  }
}
