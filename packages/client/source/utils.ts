function combine<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
  return Object.assign(object(), obj1, obj2);
}

function schema<T1 extends string, T2 extends object>(
  name: T1,
  schema: T2,
): Record<T1, T2> {
  return { [name]: schema } as Record<T1, T2>;
}

const a = { a: 1 };
const b = { b: 1 };
const c = combine(a, b);

const myschema = schema("test", { id: 123 });

export const SageClient = { schema: () => new SageRouter() };

type SageSchemaRecord<T> = Record<string, SageSchema<T>>;

interface SageSchema<T> {
  rule: T;
  do: (arg: (keyof T)[], atr: Partial<T>) => any;
}

class SageRouter<TSchema extends SageSchemaRecord<T>, T> {
  public schemas: TSchema = {} as TSchema;

  constructor(schemas?: TSchema) {
    if (schemas !== undefined) this.schemas = schemas;
  }

  public schema<T1 extends string, T2 extends SageSchema<T>, T>(
    name: T1,
    schema: T2,
  ): SageRouter<TSchema & Record<T1, T2>, T> {
    const router = new SageRouter({ [name]: schema });

    return merge(this, router);
  }
}

function merge<T1, T2>(obj1: T1, obj2: T2): T1 & T2 {
  return Object.assign(object(), obj1, obj2);
}

function object() {
  return Object.create(null);
}
