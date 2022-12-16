import type { QueryOpts } from "../../shared/types"

function router<TRouter extends { routes: any }>() {
  return new Router<TRouter>();
}

class Router<TRouter extends { routes: any }> {
  public async get<
    TQueries extends Record<any, { name: any }>,
    TCallback extends (query: TQueries) => any
  >(queries: TQueries, callback: TCallback) {
    const result = callback(queries);
    return result as { [T in keyof typeof queries]: Awaited<ReturnType<TRouter["routes"][(typeof queries)[T]["name"]]["handler"]>> } | undefined
  }

  public query<
    TName extends keyof TRouter["routes"],
    TInput extends TRouter["routes"][TName]["input"]
  >(name: TName, input: TInput, opts?: QueryOpts) {
    return { name, input, opts };
  }
}

export default { router }