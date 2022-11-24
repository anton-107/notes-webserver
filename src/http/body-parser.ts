import { parse } from "querystring";

import { PostFormRequest } from "./http";

export type FormBody = { [key: string]: string };

export function parseBody(request: PostFormRequest): FormBody {
  if (
    request.headers["content-type"] &&
    request.headers["content-type"] === "application/json"
  ) {
    return JSON.parse(request.body);
  }

  const r: FormBody = {};
  const parsedForm = parse(request.body);
  Object.keys(parsedForm).forEach((x) => {
    r[x] = String(parsedForm[x]);
  });

  return r;
}
