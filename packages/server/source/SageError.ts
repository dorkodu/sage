import { getMessageFromUnkownError } from "./internals/errors";
import { SAGE_ERROR_CODE_KEY } from "./rpc/codes";

export class SageError extends Error {
  public readonly cause?;
  public readonly code;

  constructor(opts: {
    message?: string;
    code: SAGE_ERROR_CODE_KEY;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    cause?: Error;
  }) {
    const cause = opts.cause;
    const code = opts.code;
    const message = opts.message ?? getMessageFromUnkownError(cause, code);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.code = code;
    this.cause = cause;
    this.name = "SageError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
