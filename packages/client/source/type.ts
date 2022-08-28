export * from "../../server/source/type";

import {
  SageDocument,
  SageQuery,
  SageResponse,
} from "../../server/source/type";

export interface SageDataRequirement {
  query: SageQuery;
  source: SageDataSource;
  get: () => SageResponse;
}

export interface SageDataSource {
  retrieve: (document: SageDocument) => Promise<SageResponse>;
}
