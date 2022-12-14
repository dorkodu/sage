import { describe, expect, it } from "vitest";

import server from "../../packages/server/sage";
import client from "../../packages/client/sage";

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

const auth = server.route(
  {} as Context,
  {} as { token: string },
  (input, ctx) => {
    let userId: number | undefined = getUserIdByAuthToken(input.token);
    if (userId !== undefined) ctx.userId = userId;
    return { userId }
  }
)

const getUser = server.route(
  {} as Context,
  {} as { userId?: number },
  (input, ctx): IUser | undefined => {
    let userId: number | undefined = undefined;
    if (input && typeof input.userId === "number") userId = input.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getUserById(userId)
  }
)

const getUserBlogs = server.route(
  {} as Context,
  {} as { userId?: number },
  (input, ctx): IBlog[] | undefined => {
    let userId: number | undefined = undefined;
    if (input && typeof input.userId === "number") userId = input.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getBlogsByUserId(userId);
  }
)

type Router = typeof router
const router = server.router(
  {} as Context,
  { auth, getUser, getUserBlogs }
)
const sage = client.router<Router>();

describe("blog example", () => {

  it("query normally", () => {
    const { a, b, c, } = sage.get({
      a: sage.query("auth", { token: "token_of_berk" }, { ctx: "ctx" }),
      b: sage.query("getUser", {}, { wait: "a", ctx: "ctx" }),
      c: sage.query("getUserBlogs", {}, { wait: "a", ctx: "ctx" })
    }, (query) => router.handle(() => ({}), query));

    expect(a?.userId).toBeTypeOf("number");
    expect(a?.userId).toBe(0);

    expect(b?.id).toBeTypeOf("number");
    expect(b?.username).toBeTypeOf("string");
    expect(b?.id).toBe(0);
    expect(b?.username).toBe("berk");

    expect(c?.length).toBe(2);
  })

  it("query one by one", () => {
    const { a } = sage.get({
      a: sage.query("auth", { token: "token_of_doruk" }),
    }, (query) => router.handle(() => ({}), query));

    expect(a?.userId).toBeTypeOf("number");
    expect(a?.userId).toBe(1);

    const { b } = sage.get({
      b: sage.query("getUser", { userId: a?.userId }),
    }, (query) => router.handle(() => ({}), query));

    expect(b?.id).toBeTypeOf("number");
    expect(b?.username).toBeTypeOf("string");
    expect(b?.id).toBe(1);
    expect(b?.username).toBe("doruk");

    const { c } = sage.get({
      c: sage.query("getUserBlogs", { userId: a?.userId }),
    }, (query) => router.handle(() => ({}), query));
    
    expect(c?.length).toBe(3);
  })
})