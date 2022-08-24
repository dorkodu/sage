import { SageProblem, SageStatusCode } from "../problem";

import {
  SageSimplifiedDocument,
  SageSimplifiedQuery,
  SageDocument,
  SageQuery,
  SageExecutionResult,
  SageResponse,
  SageErrorOutput,
} from "../type";

export interface SageParseResult {
  document: SageDocument;
  errors: Error[];
}

export const SageParser = {
  parse(source: SageSimplifiedDocument): SageParseResult {
    // empty parse result
    let result: SageParseResult = {
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

  outputError(error: Error): SageErrorOutput {
    let errorOutput: SageErrorOutput = {
      message: error.message,
      code: SageStatusCode.INTERNAL_SERVER_ERROR,
    };

    if (error instanceof SageProblem) errorOutput.code = error.code;

    return errorOutput;
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
