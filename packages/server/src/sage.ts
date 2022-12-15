import type { Query } from "../../shared/types"

function router<
  TContext,
  TRoutes extends Record<any, any>
>(context: TContext, routes: TRoutes) {
  return new Router(context, routes);
}

function route<
  TContext,
  TInput,
  TOutput,
  THandler extends (input: any, context: TContext) => TOutput
>(context: TContext, input: TInput, handler: THandler) {
  return { context, input, handler }
}

class Router<TContext, TRoutes extends Record<any, any>> {
  public context: TContext;
  public routes: TRoutes;

  constructor(context: TContext, routes: TRoutes) {
    this.context = context;
    this.routes = routes;
  }

  public async handle(context: () => TContext, queries: Record<string, Query>) {
    const results: Record<string, any> = {};
    const contexts: Record<string, any> = {};

    let shouldSkip = false;

    while (Object.keys(queries).length !== 0 && !shouldSkip) {
      for (const name in queries) {
        shouldSkip = true;

        const query = queries[name];
        if (!query) continue;

        // If no need to wait
        if (!query.opts?.wait) {
          results[name] = await this.handleQuery(contexts, context, query);
          delete queries[name];
          shouldSkip = false;
        }
        // If waiting part is done
        else if (results[query.opts.wait]) {
          results[name] = await this.handleQuery(contexts, context, query);
          delete queries[name];
          shouldSkip = false;
        }
      }
    }

    return results;
  }

  private async handleQuery(
    contexts: Record<string, any>,
    context: () => TContext,
    query: Query
  ): Promise<any> {
    if (!this.routes[query.name]) return {};
    if (query.opts?.ctx) {
      if (!contexts[query.opts.ctx]) contexts[query.opts.ctx] = await context();
      return await this.routes[query.name].handler(query.input, contexts[query.opts.ctx]);
    }
    return await this.routes[query.name].handler(query.input, await context());
  }
}

export default {
  router,
  route
}