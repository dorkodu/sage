import { SageProblem } from "../problem";
import {
  SageSimplifiedDocument,
  SageSimplifiedQuery,
  SageDocument,
  SageQuery,
} from "../type";

export const SageParser = {
  parse(source: SageSimplifiedDocument): {
    document: SageDocument;
    problems: Array<SageProblem>;
  } {
    let problems: Array<SageProblem> = [];
    /**
     *? iterate all properties and rename:
     **   typ -> type
     **   atr -> attributes
     **   act -> act
     **   arg -> arguments
     **   lnk -> links
     */
    let document: SageDocument = {};

    //? iterate all queries
    for (let [name, simplifiedQuery] of Object.entries(source)) {
      // TODO: $query should be SageQuery, but it has readonly properties -> necessary but creates error here
      let query: SageQuery = this.unsimplifyQuery(simplifiedQuery);
      document[name] = query; // place back each $query with extracted/renamed keys to $document
    }

    document = this.replaceLinkReferencesWithQueries(document);

    return { document, problems };
  },

  unsimplifyQuery(simplifiedQuery: SageSimplifiedQuery): SageQuery {
    let query: any = {};

    //? iterate all query keys and rename
    for (const [key, value] of Object.entries(simplifiedQuery)) {
      switch (key) {
        case "typ":
          query.type = value;
          break;
        case "atr":
          query.attributes = value;
          break;
        case "act":
          query.act = value;
          break;
        case "arg":
          query.arguments = value;
          break;
        case "lnk":
          query.links = value;
          break;
      }
    }

    return query;
  },

  /**
   *? replace each link's reference with its original query.
   *! only if 'links' exists.
   *
   *? example:
   ** 1) query.links.favoriteSong -> "user:favoriteSong" <string>
   ** 2) query.links.favoriteSong -> anotherQuery <SageQuery>
   */
  replaceLinkReferencesWithQueries(document: SageDocument): SageDocument {
    for (let [queryName, query] of Object.entries(document)) {
      if (query.links) {
        for (const [linkName, linkReference] of Object.entries(query.links)) {
          // @ts-ignore
          //! typescript HOTFIX: 'links' may be undefined, but we already checked this two lines above.
          document[queryName].links[linkName] = document[linkReference];
        }
      }
    }

    return document;
  },
};
