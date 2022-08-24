export class SageProblem extends Error {
  public readonly cause?;
  public readonly code;

  constructor(opts: { message?: string; code: SageStatusCode; cause?: Error }) {
    const cause = opts.cause;
    const code = opts.code;
    const message = opts.message ?? getMessageFromUnkownError(cause);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.code = code;
    this.cause = cause;
    this.name = "Sage::Problem";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Test if a premise condition yields true.
 * Otherwise a SageProblem will be created and returned.
 *
 * @param test A statement which must be/yield true.
 * @param info Context information about the problem.
 * @returns SageProblem
 */
export function Premise(
  test: boolean,
  info: {
    message: string;
    code?: SageStatusCode;
    cause?: Error;
  },
): SageProblem | true {
  //? return the problem for future use
  if (!test) {
    //? create sage problem with the information provided
    //* (just that same old error, but rebranded!)

    let errorlog =
      `Sage: [Problem] ` +
      (info.code ?? "") +
      info.message +
      (info.cause
        ? ` \n[Reason] ${
            info.cause.name + info.cause.message + " \n " + info.cause?.stack
          }`
        : "");

    let problem = new SageProblem({
      message: errorlog,
      code: info.code ?? SageStatusCode.INTERNAL_SERVER_ERROR,
      cause: info.cause ?? new Error(errorlog),
    });

    return problem;
  }

  return true;
}

export function getMessageFromUnkownError(
  error: unknown,
  fallback: string = "An unknown error occured. No information found.",
): string {
  if (typeof error === "string") return error;
  if (error instanceof Error && typeof error.message === "string")
    return error.message;

  return fallback;
}

export function getErrorFromUnknown(cause: unknown): SageProblem {
  if (cause instanceof SageProblem && cause.name === "Sage::Problem")
    return cause as SageProblem;

  const problem = new SageProblem({
    code: SageStatusCode.INTERNAL_SERVER_ERROR,
    message: "An unresolved error occured.",
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
  Informational <100>
  Successful    <200>
  Data          <300>
  User          <400>
  Node (Server) <500>
  Application   <600>
  Transport     <700>
  Protocol      <800>
  Custom        <900>
 */

/**
 * Sage's own protocol status codes, mimicking HTTP's.
 * Note: Unstable! Subject to change, don't depend on.
 */
export enum SageStatusCode {
  /**
   * Invalid request was received by the server.
   * An error occurred on the server while parsing the JSON text.
   */
  PARSE_ERROR = 700,

  OK = 200, // Request was successful, but no detail
  CREATED = 202,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,

  MULTIPLE_CHOICES = 300,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,

  /**
   * The JSON sent is not a valid Sage.Document object.
   */
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403, // resource exists but cannot access
  NOT_FOUND = 404, // resource not found
  UNDEFINED = 405, // requested artifact is not defined on resource
  NOT_ACCEPTABLE = 406,
  TIMEOUT = 408,
  CONFLICT = 409,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413, //
  TEAPOT = 418,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  UPGRADE_REQUIRED = 426,
  TOO_MANY_REQUESTS = 429, // max query limit per request,
  LEGAL = 451,
  CLIENT_CLOSED_REQUEST = 499,

  INTERNAL_SERVER_ERROR = 500, // unknown or secrets hidden
  INVALID_VALUE = 501, // attribute value is invalid
  SERVICE_UNAVAILABLE = 503, // sage error, nothing to hide

  PROTOCOL_VIOLATION = 800, // general protocol error, no detail
  NAMING = 801, // name for a given definition was invalid
}
