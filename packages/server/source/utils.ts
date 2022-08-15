/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function assertNotBrowser() {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV !== "test" &&
    process.env.JEST_WORKER_ID === undefined
  ) {
    throw new Error("Imported server-only code in the browser");
  }
}

/**
 * @internal
 */
export type Prefix<K extends string, T extends string> = `${K}${T}`;

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

/**
 * @internal
 */
export type identity<T> = T;

/**
 * @internal
 */
export type flatten<T, Q> = identity<{
  [k in keyof T | keyof Q]: k extends keyof T
    ? T[k]
    : k extends keyof Q
    ? Q[k]
    : never;
}>;

/**
 * @internal
 */
export type Prefixer<
  TObj extends Record<string, any>,
  TPrefix extends string
> = {
  [P in keyof TObj as Prefix<TPrefix, string & P>]: TObj[P];
};

/**
 * @public
 */
export type Maybe<T> = T | undefined | null;

/**
 * @internal
 */
export type ThenArg<T> = T extends PromiseLike<infer U> ? ThenArg<U> : T;

/**
 * @public
 */
export type Dict<T> = Record<string, T | undefined>;

/**
 * @internal
 * Creates a "lower-priority" type inference.
 * https://github.com/microsoft/TypeScript/issues/14829#issuecomment-322267089
 */
export type InferLast<T> = T & { [K in keyof T]: T[K] };
