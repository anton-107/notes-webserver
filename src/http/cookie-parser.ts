import { parse } from "cookie";
import { HttpHeaders } from "./http";

export function parseCookie(
  headers: HttpHeaders,
  cookieName: string
): string | null {
  const cookieHeader = String(headers["Cookie"] || headers["cookie"]);
  const parts = parse(cookieHeader);
  console.log("parts", parts);
  if (!parts || !parts[cookieName]) {
    return null;
  }
  return String(parts[cookieName]);
}
