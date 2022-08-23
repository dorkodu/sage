import { SageProblem } from "../problem";

import {
  SageSimplifiedDocument,
  SageSimplifiedQuery,
  SageDocument,
  SageQuery,
  SageExecutionResult,
} from "../type";

export interface ParseResult {
  document: SageDocument;
  errors: Error[];
}

export const SageParser = {
  parse(source: SageSimplifiedDocument): ParseResult {
    // empty parse result
    let result: ParseResult = {
      document: {},
      errors: [],
    };

    //? iterate all queries
    for (let [name, simplifiedQuery] of Object.entries(source)) {
      let query: SageQuery = this.unsimplifyQuery(simplifiedQuery);
      result.document[name] = query; // place back each $query with extracted/renamed keys to $document
    }

    return result;
  },

  },

  unsimplifyQuery(simplifiedQuery: SageSimplifiedQuery): SageQuery {
    let query: SageQuery = { resource: simplifiedQuery.res };

    //? iterate all query keys and rename
    for (const [key, value] of Object.entries(simplifiedQuery)) {
      switch (key) {
        case "atr":
          query.attributes = value;
          break;
        case "act":
          query.act = value;
          break;
        case "arg":
          query.arguments = value;
          break;
      }
    }

    return query;
  },
};
