import type { QueryOptions } from "../../shared/types"

function use<TSchema extends { resources: any }>() {
  return new Schema<TSchema>();
}

class Schema<TSchema extends { resources: any }> {
  public async get<
    TDocument extends Record<any, { res: any }>,
    TCallback extends (document: TDocument) => Promise<any>
  >(document: TDocument, callback: TCallback) {
    const result = await callback(document);
    return result as { [T in keyof typeof document]: Awaited<ReturnType<TSchema["resources"][(typeof document)[T]["res"]]["executor"]>> } | undefined
  }

  public query<
    TRes extends keyof TSchema["resources"],
    TArg extends TSchema["resources"][TRes]["arg"]
  >(res: TRes, arg: TArg, opt?: QueryOptions) {
    return { res, arg, opt };
  }
}

export default { use }