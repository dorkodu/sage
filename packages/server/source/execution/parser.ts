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
    return { document, problems };
  },
};
