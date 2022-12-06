export interface SearchResult {
  entityType: "notebook" | "note" | "person";
  text: string;
  owner?: string;
}
