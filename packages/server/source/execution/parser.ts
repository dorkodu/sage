import { SageProblem, Premise } from "../problem";

import {
  SageSimplifiedDocument,
  SageSimplifiedQuery,
  SageDocument,
  SageQuery,
} from "../type";

export const SageParser = {
  parse(source: SageSimplifiedDocument): {
    document: SageDocument;
    problems: SageProblem[];
  } {
    let problems: SageProblem[] = [];
    /**
     *? iterate all properties and rename:
     **   res -> resource
     **   atr -> attributes
     **   act -> act
     **   arg -> arguments
     */
    let document: SageDocument = {};

    //? iterate all queries
    for (let [name, simplifiedQuery] of Object.entries(source)) {
      let query: SageQuery = this.unsimplifyQuery(simplifiedQuery);
      document[name] = query; // place back each $query with extracted/renamed keys to $document
    }

    return { document, problems };
  },

  unsimplifyQuery(simplifiedQuery: SageSimplifiedQuery): SageQuery {
    let query: SageQuery = { resource: simplifiedQuery.res};

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
}