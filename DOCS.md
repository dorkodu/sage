# @dorkodu/sage

<p align="center">
  <a href="https://dorkodu.com/sage">
    <img alt="Sage" src="resources/sage-M-light.png" style="height: 200px !important; margin: 5px auto !important;" />
  </a>
</p>

<p align="center">
  The marvelous data exchange protocol for APIs
</p>

## Docs

The idea of the Sage is to be able to send multiple queries that depend on each other at once.

When using REST APIs, you have to send many requests to server.
Just think about this, you have a social network application,
when a user opens the app, you have to check their authentication status,
get their profile, notifications, friend requests, messages, feed (and profiles of those), and so on.

It's just a lot of queries, and throughout the use of the app, users are going to send tons of multiple requests.

That's where Sage comes in, and helps you mitigate this issue and improve your code on many other stuff.

<br>

### Creating Resources

When working with Sage on the server-side, you have to define your resources,
which act as endpoints, that have a context, arguments, and an executor function.

```ts
const getUser = sage.resource(
  {} as Context,
  {} as { userId: number },
  async (arg, ctx): Promise<{ data?: IUser, error?: {} }> => {
    // Validate "arg" (using zod, etc.), never trust the user input
    // Query database using "arg"
    await doSomething();

    // You can add/remove/change properties on "ctx" object
    ctx.something = somevalue;

    // Return the result
    return { data: user };
  }
)
```

First argument is the `context`, which is a storage where you can
store some variables and use them in other Sage resources. 
When using ExpressJS, you can store the `Request`, `Response`, 
and `Next` so you can read user's cookies, set user's cookies, etc.

Second argument is the `arg`, which specifies what input the Sage resource accepts.
It's used for auto-completion when sending queries from the client-side.

Third argument is the `executor`, which runs the Sage resource with given `arg` (second argument), and `ctx` (first argument).
You can perform input validation, query the database, set properties on `ctx` object, and return a result.

<br>

### Creating a Schema

After creating your resources, create a schema using the same context as the resources and the resources themselves.

```ts
// Export the schema type to get auto-completion on client-side
export type Schema = typeof schema;

export const schema = sage.schema(
  // Make sure you use the same Context as the resources
  {} as Context,

  // Include all your resources here
  {
    ...
    getUser,
    ...
  }
);
```

<br>

### Creating a Router

Now, on the client-side, import the `Schema` type and create a Sage router.
```ts
import type { Schema } from "@server/schema";

export const router = sage.use<Schema>();
```

<br>

### Sending Queries to Server Using the Router

When it comes to sending queries to the server, 
use `router.query` to create individual queries,
then use `router.get` with queries you created and the callback function.
A callback function is used because Sage gives you full authority over the communication protocol.
You can use HTTP, WebSockets, WebRTC, or whatever you want.

```ts
const result = await router.get(
  {
    a: router.query("getUser", { userId: 0 }),
    b: ...
  },
  async (queries) => sendToServer(queries)
)
```

`router.query` method has 3 parameters:
- res: The name of the Sage resource (it's auto-completed and type-checked)
- arg: The arguments of the Sage resource (it's auto-completed and type-checked depending on the `res`)
- opt: The options object for the query.

Now, `opt` parameter has 2 properties, `wait` and `ctx`.

`wait` is used to tell Sage, that the query will wait until the specified query is finished executing.

```ts
// In this example, query b will be executed after query a has completed executing on the server.
const result = await router.get(
  {
    a: router.query("...", ...),
    b: router.query("...", ..., { wait: "a" })
  },
  async (queries) => sendToServer(queries)
)
```

```ts
// In this example, query a will never get executed as it waits query "abc" which doesn't exist.
const result = await router.get(
  { a: router.query("...", ..., { wait: "abc" }) },
  async (queries) => sendToServer(queries)
)
```

`ctx` is used to tell Sage, any modifications to the `ctx` argument, it will be kept.
And if any other query use the same `ctx`, they will have the modified version.
If a query has no `ctx` specified, it's modifications will not be persisted.

```ts
// In this example, if query a modifies the ctx, query b will also have the modified version
const result = await router.get(
  {
    a: router.query("...", ..., { ctx: "ctx" }),
    b: router.query("...", ..., { ctx: "ctx", wait: "a" })
  },
  async (queries) => sendToServer(queries)
)
```

<br>

And that's all you need to know about Sage.

If you have still have questions, you can check the [examples](README.md#examples)

Or see ask a question [here](https://github.com/dorkodu/sage/issues).