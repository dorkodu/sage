import {
  SageDataRequirement,
  SageDataSource,
  SageDocument,
  SageQuery,
  SageSimplifiedDocument,
  SageResponse,
} from "./type";

export class Sage<SageSchema> {
  private source: SageDataSource;

  constructor(options: { source: SageDataSource }) {
    this.source = options.source;
  }

  public want(query: SageQuery): SageDataRequirement {
    let source = this.source;

    return {
      query,
      source,
      async get() {
        return await this.source.retrieve({ "0": this.query });
      },
    };
  }

  public simplify(document: SageDocument): SageSimplifiedDocument {
    const simple: SageSimplifiedDocument = {};

    for (const [name, query] of Object.entries(document)) {
    }

    return simple;
  }

  public async request(document: SageDocument, source?: SageDataSource) {
    source = source ?? this.source;
    return await source.retrieve(document);
  }
}
