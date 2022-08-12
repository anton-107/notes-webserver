import { HttpHeaders } from "./http";

export enum ResponseType {
  JSON = "json",
  HTML = "html",
}

export function parseResponseType(headers: HttpHeaders): ResponseType {
  if (
    headers["content-type"] &&
    headers["content-type"] === "application/json"
  ) {
    return ResponseType.JSON;
  }
  return ResponseType.HTML;
}
