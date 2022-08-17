export interface CORSHeaders {
  "Access-Control-Allow-Origin": string;
  "Access-Control-Allow-Credentials": "true" | "false";
}

export function corsHeaders(allowedOrigins: string): CORSHeaders {
  return {
    "Access-Control-Allow-Origin": allowedOrigins,
    "Access-Control-Allow-Credentials": "true",
  };
}
