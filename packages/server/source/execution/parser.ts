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

  response(result: SageExecutionResult, meta?: any): SageResponse {
    //? empty response
    let response: SageResponse = {};

    //? add errors to response
    if (
      result.errors !== undefined &&
      result.errors !== null &&
      Object.keys(result.errors).length > 0
    ) {
      response.errors = {};

      for (let [name, errors] of Object.entries(result.errors)) {
        // empty error output array
        let errorOutputs: SageErrorOutput[] = [];

        errors.forEach((e) => {
          errorOutputs.push(this.outputError(e));
        });

        // add error outputs to response
        response.errors[name] = errorOutputs;
      }
    }

    //? add meta to response
    if (meta != undefined && meta != null) response.meta = meta;

    //? add data to response
    if (result.data != undefined && result.data != null)
      response.data = result.data;

    return response;
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
