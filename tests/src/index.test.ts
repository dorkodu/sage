import { describe, expect, it } from "vitest";

import server from "../../packages/server/src/sage";
import client from "../../packages/client/src/sage";

interface Context {
  userId?: number;
}

interface IAuth {
  token: string;
  userId: number;
}

interface IUser {
  id: number;
  username: string;
}

interface IBlog {
  id: number;
  userId: number;
  content: string;
}

const auths: Array<IAuth> = [
  { userId: 0, token: "token_of_berk" },
  { userId: 1, token: "token_of_doruk" },
]

const users: Array<IUser> = [
  { id: 0, username: "berk" },
  { id: 1, username: "doruk" },
]

const blogs: Array<IBlog> = [
  { id: 0, userId: 0, content: "hello world" },
  { id: 1, userId: 0, content: "goodbye world" },
  { id: 2, userId: 1, content: "testing" },
  { id: 3, userId: 1, content: "attention please" },
  { id: 4, userId: 1, content: "ceo of dorkodu" },
]

function getUserIdByAuthToken(token: string | undefined) {
  if (token === undefined) return undefined;

  for (let i = 0; i < auths.length; ++i) {
    const auth = auths[i];
    if (auth?.token === token) return auth.userId;
  }

  return undefined;
}

function getUserById(id: number | undefined) {
  if (id === undefined) return undefined;

  for (let i = 0; i < users.length; ++i) {
    const user = users[i];
    if (user?.id === id) return user;
  }

  return undefined;
}

function getBlogsByUserId(id: number | undefined) {
  const out: IBlog[] = [];
  if (id === undefined) return out;

  for (let i = 0; i < blogs.length; ++i) {
    const blog = blogs[i];
    if (blog?.userId === id) out.push(blog);
  }

  return out;
}

const auth = server.resource(
  {} as Context,
  {} as { token: string },
  (arg, ctx) => {
    let userId: number | undefined = getUserIdByAuthToken(arg.token);
    if (userId !== undefined) ctx.userId = userId;
    return { userId }
  }
)

const getUser = server.resource(
  {} as Context,
  {} as { userId?: number },
  (arg, ctx): IUser | undefined => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getUserById(userId)
  }
)

const getUserBlogs = server.resource(
  {} as Context,
  {} as { userId?: number },
  (arg, ctx): IBlog[] | undefined => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getBlogsByUserId(userId);
  }
)

type Schema = typeof schema
const schema = server.schema(
  {} as Context,
  { auth, getUser, getUserBlogs }
)
const sage = client.use<Schema>();

describe("blog example", () => {

  it("query normally", async () => {
    const res = await sage.get({
      a: sage.query("auth", { token: "token_of_berk" }, { ctx: "ctx" }),
      b: sage.query("getUser", {}, { wait: "a", ctx: "ctx" }),
      c: sage.query("getUserBlogs", {}, { wait: "a", ctx: "ctx" })
    }, (query) => schema.execute(() => ({}), query));

    expect(res?.a?.userId).toBeTypeOf("number");
    expect(res?.a?.userId).toBe(0);

    expect(res?.b?.id).toBeTypeOf("number");
    expect(res?.b?.username).toBeTypeOf("string");
    expect(res?.b?.id).toBe(0);
    expect(res?.b?.username).toBe("berk");

    expect(res?.c?.length).toBe(2);
  })

  it("query one by one", async () => {
    const res1 = await sage.get({
      a: sage.query("auth", { token: "token_of_doruk" }),
    }, (query) => schema.execute(() => ({}), query));

    expect(res1?.a?.userId).toBeTypeOf("number");
    expect(res1?.a?.userId).toBe(1);

    const res2 = await sage.get({
      b: sage.query("getUser", { userId: res1?.a?.userId }),
    }, (query) => schema.execute(() => ({}), query));

    expect(res2?.b?.id).toBeTypeOf("number");
    expect(res2?.b?.username).toBeTypeOf("string");
    expect(res2?.b?.id).toBe(1);
    expect(res2?.b?.username).toBe("doruk");

    const res3 = await sage.get({
      c: sage.query("getUserBlogs", { userId: res1?.a?.userId }),
    }, (query) => schema.execute(() => ({}), query));

    expect(res3?.c?.length).toBe(3);
  })

  it("check decoded query", () => {
    sage.get(
      { a: sage.query("getUser", {}) },
      async (query) => {
        expect(JSON.stringify(query)).toBe('{"a":{"res":"getUser","arg":{}}}');
      }
    )

    sage.get(
      { a: sage.query("getUser", {}, {}) },
      async (query) => {
        expect(JSON.stringify(query)).toBe('{"a":{"res":"getUser","arg":{},"opt":{}}}');
      }
    )

    sage.get(
      { a: sage.query("getUser", {}, { ctx: "ctx", wait: "a" }) },
      async (query) => {
        expect(JSON.stringify(query)).toBe('{"a":{"res":"getUser","arg":{},"opt":{"ctx":"ctx","wait":"a"}}}');
      }
    )
  })

  it("unresolvable query must skip", () => {
    sage.get(
      { a: sage.query("auth", { token: "token" }, { wait: "a" }) },
      async (query) => {
        expect(Object.keys(schema.execute(() => ({}), query)).length).toBe(0);
      })
  })
})