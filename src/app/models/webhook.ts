export interface Webhook {
  body: string
  headers: Record<string, string>
  method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH",
  path: string
  url: string
  contentType?: "json" | "text" | "xml" | "html",
  queryParams: Record<string, string>,
  response: string,
  date: string,
}


