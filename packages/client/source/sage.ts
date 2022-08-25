import {
  SageDataRequirement,
  SageDataSource,
  SageDocument,
  SageQuery,
} from "./type";

export class Sage<SageSchema> {
  private remote: SageDataSource;

  constructor(options: { remote: SageDataSource }) {
    this.remote = options.remote;
  }

  public want(query: SageQuery): SageDataRequirement {
    return { query, fetch() {} };
  }

  public request(document: SageDocument, source?: SageDataSource) {
    const url = source?.url || this.remote.url;

    const request: RequestInit = {
      method: "POST",
      headers: source?.headers || this.remote.headers,
      body: JSON.stringify(document),
    };

    const response = await fetch(url, request);
    const json = await response.json();

    return { data: json.data, error: json.error, meta: json.meta };
  }
}
