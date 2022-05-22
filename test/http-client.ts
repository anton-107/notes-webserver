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
  public async get(url: string): Promise<HttpResponse> {
    axios;
    const resp = await axios.get(url);
    return new HttpResponseAxios(resp);
  }
}
