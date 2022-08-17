export interface CORSHeaders {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Credentials": "true" | "false";
}
export declare function corsHeaders(allowedOrigins: string): CORSHeaders;
