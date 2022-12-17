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

async function getUserIdByAuthToken(token: string | undefined) {
  if (token === undefined) return undefined;

  for (let i = 0; i < auths.length; ++i) {
    const auth = auths[i];
    if (auth?.token === token) return auth.userId;
  }

  return undefined;
}

async function getUserById(id: number | undefined) {
  if (id === undefined) return undefined;

  for (let i = 0; i < users.length; ++i) {
    const user = users[i];
    if (user?.id === id) return user;
  }

  return undefined;
}

async function getBlogsByUserId(id: number | undefined) {
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
  async (arg, ctx) => {
    let userId: number | undefined = await getUserIdByAuthToken(arg.token);
    if (userId !== undefined) ctx.userId = userId;
    return { userId }
  }
)

const getUser = server.resource(
  {} as Context,
  {} as { userId?: number },
  async (arg, ctx): Promise<IUser | undefined> => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return await getUserById(userId)
  }
)

const getUserBlogs = server.resource(
  {} as Context,
  {} as { userId?: number },
  async (arg, ctx): Promise<IBlog[] | undefined> => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return await getBlogsByUserId(userId);
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

})