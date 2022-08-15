const getMessageFromProblemCause = (cause) => {

}

export class SageProblem extends Error {
  public readonly cause?;
  public readonly code;

  constructor(opts: {
    message?: string;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    cause?: Error;
  }) {
    const cause = opts.cause;
    const code = opts.code;
    const message = opts.message ??;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore https://github.com/tc39/proposal-error-cause
    super(message, { cause });

    this.code = code;
    this.cause = cause;
    this.name = "SageError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
