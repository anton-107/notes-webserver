import { PostFormRequest } from "./http";
import { parse } from "querystring";

export type FormBody = { [key: string]: string };

export function parseBody(request: PostFormRequest): FormBody {
  const r: FormBody = {};

  const parsedForm = parse(request.body);
  Object.keys(parsedForm).forEach((x) => {
    r[x] = String(parsedForm[x]);
  });

  return r;
}
