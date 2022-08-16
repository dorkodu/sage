import { SageProblem } from "../problem";
import {
  SageCompressedDocument,
  SageCompressedQuery,
  SageDocument,
  SageQuery,
} from "../type";

export const SageParser = {
  parse(source: SageCompressedDocument): {
    document: SageDocument;
    problems: Array<SageProblem>;
  } {
    let problems: Array<SageProblem> = [];
    /**
     *? iterate all properties and do rename:
     **   typ -> type
     **   atr -> attributes
     **   act -> act
     **   arg -> arguments
     **   lnk -> links
     */
    let document: SageDocument = {};

    //? iterate all queries
    for (let [name, compressedQuery] of Object.entries(source)) {
      // TODO: $query should be SageQuery, but it has readonly properties -> necessary but creates error here
      let query = this.decompressQuery(compressedQuery);
      document[name] = query; // place back each $query with extracted/renamed keys to $document
    }

    document = this.replaceLinkReferencesWithQueries(document);

    return { document, problems };
  },

  decompressQuery(compressedQuery: SageCompressedQuery): SageQuery {
    let query: any = {};

    //? iterate all query keys and rename
    for (const [key, value] of Object.entries(compressedQuery)) {
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

  replaceLinkReferencesWithQueries(document: SageDocument): SageDocument {
    for (let [queryName, query] of Object.entries(document)) {
      //? replace link name with a reference of that link query, if "links" exists
      if (query.links) {
        for (const [linkName, linkReference] of Object.entries(query.links)) {
          document[queryName].links[linkName] = document[linkReference];
        }
      }
    }

    return document;
  },
};
