import type { Query } from "../../shared/types"

function resource<
  TContext,
  TArg,
  TOutput,
  TExecutor extends (arg: any, context: TContext) => TOutput
>(context: TContext, arg: TArg, executor: TExecutor) {
  return { context, arg, executor }
}

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

  public async execute(context: () => TContext, document: Record<string, Query>) {
    const results: Record<string, any> = {};
    const contexts: Record<string, any> = {};

    let shouldSkip = false;

    while (Object.keys(document).length !== 0 && !shouldSkip) {
      for (const res in document) {
        shouldSkip = true;

        const query = document[res];
        if (!query) continue;

        // If no need to wait
        if (!query.opt?.wait) {
          results[res] = await this.handleQuery(contexts, context, query);
          delete document[res];
          shouldSkip = false;
        }
        // If waiting part is done
        else if (results[query.opt.wait]) {
          results[res] = await this.handleQuery(contexts, context, query);
          delete document[res];
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
    if (!this.resources[query.res]) return {};
    if (query.opt?.ctx) {
      if (!contexts[query.opt.ctx]) contexts[query.opt.ctx] = await context();
      return await this.resources[query.res].executor(query.arg, contexts[query.opt.ctx]);
    }
    return await this.resources[query.res].executor(query.arg, await context());
  }
}

export default {
  schema,
  resource,
}