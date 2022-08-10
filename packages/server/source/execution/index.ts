import { SageSchema, SageDocument, SageExecutionResult } from "../type";

export const SageExecutor = {
  execute(schema: SageSchema, document: SageDocument): SageExecutionResult {
    //? by default return an empty result
    let result = this.emptyExecutionResult();

    //? if successful return a successful result
    //? if successful return a successful result

    return result;
  },

  emptyExecutionResult() {
    return {
      data: {},
      error: {},
      meta: {},
    };
  },
};
