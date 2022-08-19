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

type KeyFromValue<V, T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T]: V extends T[K] ? K : never;
}[keyof T];

type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [V in T[keyof T]]: KeyFromValue<V, T>;
};

export function invert<T extends Record<PropertyKey, PropertyKey>>(
  obj: T,
): Invert<T> {
  const newObj = Object.create(null) as any;
  for (const key in obj) {
    const v = obj[key];
    newObj[v] = key;
  }
  return newObj;
}

/**
 * @internal
 */
export type Prefix<K extends string, T extends string> = `${K}${T}`;

export type Nullable<Type> = Type | null;
export type OneOrMany<Type> = Type | Type[];
export type OneOrManyOrNull<Type> = Nullable<OneOrMany<Type>>;

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
