export const sage = {
  /* Used by server */

  /**
   * Creates resources to be used by schemas.
   */
  resource,

  /**
   * Create schemas that when executed return results, using the resources. 
   */
  schema,

  /* Used by client */

  /**
   * Creates a router using the schema type from server, to send queries to server.
   */
  use,
}

type Query = { res: string, arg: any, opt?: QueryOptions }
type QueryOptions = {
  /**
   * Name of the context.
   * If not specified, a new context is generated for that query.
   * If specified, the same context will be used for that query and can be used by other queries.
   */
  ctx?: string,

  /**
   * Name of the query to wait for.
   * If not specified, the query is run asynchronously.
   * If specified, wait's until that query is finished executing.
   */
  wait?: string
}

/**
 * Creates a sage resource that can be used by sage schema.
 * @param context Context for the resouce, must be the same as schema's context.
 * @param arg Arguments that are accepted by the sage resource.
 * @param executor Executor function that uses context and argument to generate a result.
 * @returns Result of the executor function.
 */
function resource<
  TContext,
  TArg,
  TOutput,
>(context: TContext, arg: TArg, executor: (arg: any, ctx: TContext) => TOutput) {
  return { context, arg, executor }
}

/**
 * Creates a sage schema that can be used to execute queries.
 * @param context Context for the resouce, must be the same as resources context.
 * @param resources Resources that will be used by the schema.
 * @returns Sage schema that can execute queries.
 */
function schema<
  TContext,
  TResources extends Record<any, any>
>(context: TContext, resources: TResources) {
  return new Schema(context, resources);
}

class Schema<TContext, TResources extends Record<any, any>> {
  public context: TContext;
  public resources: TResources;

  constructor(context: TContext, resources: TResources) {
    this.context = context;
    this.resources = resources;
  }

  /**
   * Executes the given queries using the context function.
   * @param context Function that creates the context object.
   * @param queries Queries to be executed.
   * @returns Result of the executed queries.
   */
  public async execute(context: () => TContext, queries: Record<string, Query>) {
    const contexts: Record<string, any> = {};
    const results: Record<string, any> = {};
    let promises: any[] = [];

    let shouldSkip = false;

    while (Object.keys(queries).length !== 0 && !shouldSkip) {
      for (const key in queries) {
        shouldSkip = true;

        const query = queries[key];
        if (!query) continue;

        // If no need to wait or the waiting part is done
        if (!query.opt?.wait || results[query.opt.wait]) {
          const promise = new Promise(async (resolve) => {
            results[key] = await this.executeQuery(contexts, context, query);
            delete queries[key];
            shouldSkip = false;
            resolve(0);
          })

          promises.push(promise);
        }
      }

      await Promise.all(promises);
      promises = [];
    }

    return results;
  }

  private async executeQuery(
    contexts: Record<string, any>,
    context: () => TContext,
    query: Query
  ): Promise<any> {
    if (!this.resources[query.res]) return {};

    if (query.opt?.ctx) {
      if (!contexts[query.opt.ctx]) contexts[query.opt.ctx] = await context();
      return await this.resources[query.res].executor(query.arg, contexts[query.opt.ctx]);
    }

    return await this.resources[query.res].executor(query.arg, await context());
  }
}

/**
 * Used to create queries with auto-complete, using the schema type from the server.
 * @returns Sage router that can create queries.
 */
function use<TSchema extends { resources: any }>() {
  return new Router<TSchema>();
}

class Router<TSchema extends { resources: any }> {
  /**
   * Gets the result of the sage query.
   * As sage is a suitable library for any type of communication protocol,
   * the user is required to pass a callback function,
   * that handles the communication of the queries to the server.
   * It can be HTTP, WebSockets, WebRTC, or anything else. 
   * @param queries Queries to get their results.
   * @param callback A callback function to send the queries to the server (with any protocol/way user wants).
   * @returns Result of the sage query.
   */
  public async get<
    TQueries extends Record<any, { res: any }>,
  >(queries: TQueries, callback: (queries: TQueries) => Promise<any>) {
    const result = await callback(queries);
    return result as { [T in keyof typeof queries]: Awaited<ReturnType<TSchema["resources"][(typeof queries)[T]["res"]]["executor"]>> } | undefined
  }

  /**
   * Creates a sage query.
   * @param res Name of the sage resource. 
   * @param arg Arguments for the sage resource.
   * @param opt Options of the query.
   * @returns Sage query object.
   */
  public query<
    TRes extends keyof TSchema["resources"],
  >(res: TRes, arg: TSchema["resources"][TRes]["arg"], opt?: QueryOptions) {
    return { res, arg, opt };
  }
}