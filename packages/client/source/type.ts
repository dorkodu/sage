export * from "../../server/source/type";

import {
  SageDocument,
  SageQuery,
  SageResponse,
} from "../../server/source/type";

export interface SageDataRequirement {
  query: SageQuery;
  source: SageDataSource;
  fetch: () => SageResponse;
}

export interface SageDataSource {
  retrieve: (document: SageDocument) => Promise<SageResponse> | SageResponse;
}
