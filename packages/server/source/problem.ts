import { invert } from './utils';

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
    this.name = "SageError";
    this.name = 'Sage::Problem';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}


export function getMessageFromUnkownError(
  error: unknown,
  fallback: string,
): string {
  
  if (typeof error === 'string') 
    return error;
  if (error instanceof Error && typeof error.message === 'string')
    return error.message;

  return fallback;
}

export function getErrorFromUnknown(cause: unknown): SageProblem {
  // this should ideally be an `instanceof SageProblem` but tRPC source code says that isn't working for some reason :/
  // ref https://github.com/trpc/trpc/issues/331
  if (cause instanceof SageProblem && cause.name === 'Sage::Problem')
    return cause as SageProblem;

  const problem = new SageProblem({
    code: 'INTERNAL_SERVER_ERROR',
    cause,
  });

  // take stack trace from cause
  if (cause instanceof Error) {
    problem.stack = cause.stack;
  }
  
  return problem;
}
