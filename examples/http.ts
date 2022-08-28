import {
  SageDataSource,
  SageDocument,
  SageResponse,
  SageSimplifiedDocument,
} from "@dorkodu/sage.client";

import { SageParser } from "@dorkodu/sage.server";

export class SageHTTPSource implements SageDataSource {
  url: string;
  headers: { [key: string]: string } = {};

  constructor(opts: { url: string; headers?: { [key: string]: string } }) {
    this.url = opts.url;
    this.headers = opts.headers ?? {};
  }

  async retrieve(document: SageDocument) {
    const simplifiedDocument: SageSimplifiedDocument = {};

    const request: RequestInit = {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(simplifiedDocument),
    };

    const response = await fetch(this.url, request);
    const json = await response.json();

    const result: SageResponse = {
      data: json.data,
      errors: json.errors,
      meta: json.meta,
    };

    return result;
  }
}
