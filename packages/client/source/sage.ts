interface SageOptions {
  url: string;
  headers?: { [key: string]: string };
}

interface SageQuery {
  type: string;
  attributes?: string[];
  arguments?: { [key: string | number]: any };
  links?: { [key: string]: SageQuery };
  act?: string;
}

interface SageQueryObject {
  [key: string]: SageQueryProperties;
}

interface SageQueryProperties {
  typ: string;
  atr: string[];
  arg: { [key: string | number]: any };
}

interface SageQueryOptions {
  url?: string;
  headers?: { [key: string]: string };
}

export class Sage {
  private options: SageOptions;

  constructor(options: SageOptions) {
    this.options = options;
  }

  public want(name: string, query: SageQuery) {

  }

  public async query(query: any, options?: SageQueryOptions) {
    const url = options?.url || this.options.url;
    const req: RequestInit = {
      method: "POST",
      headers: options?.headers || this.options.headers,
      body: JSON.stringify(query)
    }

    const res = await fetch(url, req);
    const json = await res.json();

    return { data: json.data, error: json.error };
  }
}