# @dorkodu/sage

<p align="center">
  <a href="https://dorkodu.com/sage">
    <img alt="Sage" src="resources/sage-M-light.png" style="height: 200px !important; margin: 5px auto !important;" />
  </a>
</p>

<p align="center">
  The marvelous data exchange protocol for APIs
</p>

## About The Project

Sage allows you to easily build & consume fully typesafe APIs, without a query language, or code generation.

### Features

- ✅&nbsp; Describe your data requirements as resources.
- 🔐&nbsp; Static type safety & auto-completion on the client for queries.
- ❌&nbsp; No query/schema definition language, code generation, run-time bloat, or build pipeline.
- 🍃&nbsp; Lightweight – Sage has zero dependencies and a tiny client-side footprint.
- 🔗&nbsp; Work easily with any data source, a remote API, local cache.
- 📨 Infinite resources with one request.
- 🔋&nbsp; Reference library in Typescript.
- 🗽&nbsp; Liberating developer experience.
- ⏳&nbsp; Fast, thanks to simplicity :)

## Quickstart

With NPM:
```console
$ npm install @dorkodu/sage
```

With Yarn:
```console
$ yarn add @dorkodu/sage
```

With PNPM:
```console
$ pnpm add @dorkodu/sage
```

<br>

Import Sage:
```ts
import { sage } from "@dorkodu/sage";
```

<br>

Create a schema (in server):
```ts
interface Context {
  /* Constant context variables (eg. req, res, next from ExpressJS) */
  readonly req: Req;
  readonly res: Res;
  readonly next: Next;

  /* Non-constant context variables that are useful */
  userId?: number;
}

const auth = sage.resource(
  {} as Context,
  {} as { token: string },
  async (arg, ctx) => {
    // Validate "arg" (using zod, etc.), never trust the user input
    // Query database using "arg"
    return authStatus;
  }
)

const getUser = sage.resource(
  {} as Context,
  {} as { userId: number },
  async (arg, ctx) => {
    // Validate "arg" (using zod, etc.), never trust the user input
    // Query database using "arg"
    return user;
  }
)

export type Schema = typeof schema;
export const schema = sage.schema({} as Context, { auth, getUser });
```

<br>

Create a router using schema from server (in client):
```ts
export const router = sage.use<Schema>();
```

<br>

Send queries to server and get results:
```ts
const result = await router.get(
  {
    a: router.query("auth", { token: "..." }, { ctx: "ctx" }),
    b: router.query("getUser", { userId: 0 }, { ctx: "ctx", wait: "a" }),
  },
  async (queries) => {
    const result = await mockFetch(queries);
    return result;
  }
)
```

<br>

Result:
```json
{
  "a": {
    "status": true,
    ...
  },
  "b": {
    "id": 0,
    "name": "Sage",
    ...
  }
}
```

## Docs

Check out the full docs here: [Docs](DOCS.md)

## Examples

For more comprehensive use-cases of Sage, you can check the examples:
- [Blog Example](examples/blog)

## Authors

<table>
  <tr>
    <td align="center">
      <a href="https://berk.dorkodu.com">
        <img src="https://avatars.githubusercontent.com/u/50113500?v=4" width="100px;" style="border-radius:100px;" alt="Berk Cambaz"/>
        <br />
      </a>
    </td>
    <td>
			<b>Berk Cambaz</b>
      <br>
      Creator of Sage
			<br>
      Co-Founder & Chief Technologist @ <b><a href="https://dorkodu.com">Dorkodu</a></b>
			<br>
      <a href="https://github.com/berkcambaz">
      	<img alt="GitHub Followers" src="https://img.shields.io/github/followers/berkcambaz?label=%40berkcambaz&style=social">
			</a>
      <a href="https://twitter.com/bercrobat">
				<img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bercrobat?style=social">
			</a>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center">
      <a href="https://doruk.dorkodu.com">
        <img src="https://avatars.githubusercontent.com/u/68155490?v=4" width="100px;" style="border-radius:100px;" alt="Doruk Eray"/>
        <br />
      </a>
    </td>
    <td>
			<b>Doruk Eray</b>
      <br>
      Creator of Sage
			<br>
      Founder & Chief @ <b><a href="https://dorkodu.com">Dorkodu</a></b>
			<br>
      <a href="https://github.com/dorukeray">
      	<img alt="GitHub Followers" src="https://img.shields.io/github/followers/dorukeray?label=%40dorukeray&style=social">
			</a>
      <a href="https://twitter.com/d0rukeray">
				<img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/d0rukeray?style=social">
			</a>
    </td>
  </tr>
</table>

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.
