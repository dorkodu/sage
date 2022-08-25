import {
  SageDataRequirement,
  SageDataSource,
  SageDocument,
  SageQuery,
} from "./type";


  constructor(options: SageOptions) {
    this.options = options;
  }

  public want(name: string, query: SageQuery) {}

  public async query(query: any, options?: SageQueryOptions) {
    const url = options?.url || this.options.url;
    const req: RequestInit = {
      method: "POST",
      headers: options?.headers || this.options.headers,
      body: JSON.stringify(query),
    };

    const res = await fetch(url, req);
    const json = await res.json();

    return { data: json.data, error: json.error };
  }
}
