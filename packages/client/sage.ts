export type Query = { name: string, input: any, opts?: QueryOpts }
type QueryOpts = { ctx?: string, wait?: string }

function router<TRouter extends { routes: any }>() {
  return new Router<TRouter>();
}

class Router<TRouter extends { routes: any }> {
  public get<
    TQueries extends Record<any, { name: any }>,
    TCallback extends (query: TQueries) => any
  >(queries: TQueries, callback: TCallback) {
    const result = callback(queries);
    return result as { [T in keyof typeof queries]: ReturnType<TRouter["routes"][(typeof queries)[T]["name"]]["handler"]> | undefined }
  }

  public query<
    TName extends keyof TRouter["routes"],
    TInput extends TRouter["routes"][TName]["input"]
  >(name: TName, input?: TInput, opts?: QueryOpts) {
    const out = { name, input, opts }
    if (!input || Object.keys(input).length === 0) delete out["input"];
    if (!opts || Object.keys(opts).length === 0) delete out["opts"];
    return out;
  }
}

export default { router }