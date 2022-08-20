import { invert } from "./utils";

export class SageProblem extends Error {
  public readonly cause?;
  public readonly code;

  constructor(opts: {
    message?: string;
    code: SageErrorCodeKey;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore This will be `Error` in next major version
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
    this.name = "Sage::Problem";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function Premise(test: any, message: string = "", cause?: Error) {
  //? create sage problem
  //* (just that same old error, but rebranded!)
  let problem = new SageProblem({
    message:
      `Sage: [Problem] ` +
      message +
      (cause
        ? ` \n[Reason] ${cause.name + cause.message + " \n" + cause?.stack}`
        : ""),
    code: "INTERNAL_SERVER_ERROR",
    cause,
  });

  //? log problem to console
  //! report only if test fails
  if (!test) console.error(problem.message);

  //? return the problem for future use
  return problem;
}

export function getMessageFromUnkownError(
  error: unknown,
  fallback: string = "An unknown error occured. No information found."
): string {
  if (typeof error === "string") return error;
  if (error instanceof Error && typeof error.message === "string")
    return error.message;

  return fallback;
}

export function getErrorFromUnknown(cause: unknown): SageProblem {
  // this should ideally be an `instanceof SageProblem` but tRPC source code says that isn't working for some reason :/
  // ref https://github.com/trpc/trpc/issues/331
  if (cause instanceof SageProblem && cause.name === "Sage::Problem")
    return cause as SageProblem;

  const problem = new SageProblem({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unresolved error occured."
  });

  // take error info from cause
  if (cause instanceof Error) {
    problem.stack = cause.stack;
    problem.message = cause.message;
    problem.name = cause.name;
  }

  return problem;
}

/**
 * JSON-RPC 2.0 Error codes
 * Reference: https://www.jsonrpc.org/specification
 * `-32000` to `-32099` are reserved for implementation-defined server-errors.
 * For Sage we're copying the last digits of HTTP 4XX errors.
 */
export const SageErrorCodesByKey = {
  /**
   * Invalid JSON was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR: -32700,

  /**
   * The JSON sent is not a valid Sage.Document object.
   */
  BAD_REQUEST: -32600, // 400

  /**
   * Internal error type for user-safe prompting.
   */
  INTERNAL_SERVER_ERROR: -32603,

  //? Implementation specific errors

  UNAUTHORIZED: -32001, // 401
  FORBIDDEN: -32003, // 403
  NOT_FOUND: -32004, // 404
  METHOD_NOT_SUPPORTED: -32005, // 405
  TIMEOUT: -32008, // 408
  CONFLICT: -32009, // 409
  PRECONDITION_FAILED: -32012, // 412
  PAYLOAD_TOO_LARGE: -32013, // 413
  CLIENT_CLOSED_REQUEST: -32099, // 499
} as const;

export const SageErrorCodesByNumber = invert(SageErrorCodesByKey);
type ValueOf<T> = T[keyof T];

export type SageErrorCodeNumber = ValueOf<typeof SageErrorCodesByKey>;
export type SageErrorCodeKey = keyof typeof SageErrorCodesByKey;
