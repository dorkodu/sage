import {
  SageDataRequirement,
  SageDataSource,
  SageDocument,
  SageQuery,
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
      fetch() {
        return this.source.retrieve({ "0": this.query });
      },
    };
  }

  public async request(document: SageDocument, source?: SageDataSource) {
    source = source ?? this.source;

    return await source.retrieve(document);
  }
}
