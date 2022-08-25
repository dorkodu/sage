export * from "../../server/source/type";
import { SageQuery, SageResponse } from "../../server/source/type";

export interface SageDataRequirement {
  query: SageQuery;
  fetch: () => Promise<SageResponse>;
}

export interface SageDataSource {
  url: string;
  headers?: { [key: string]: string };
}
