import server from "../../../packages/server/sage";
import client from "../../../packages/client/sage";

type Req = {};
type Res = {};
type Next = () => void;

interface Context {
  // Constant context variables (eg. req, res, next from express)
  readonly req: Req,
  readonly res: Res,
  readonly next: Next,

  // Non-constant context variables that are useful
  userId?: number;
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
  {} as {},
  (_input, ctx) => {
    ctx.userId = 0;
    return { userId: 0 }
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
sage.get({
  a: sage.query("auth", {}, { ctx: "ctx" }),
  b: sage.query("getUser", {}, { wait: "a", ctx: "ctx" }),
  c: sage.query("getUserBlogs", {}, { wait: "a", ctx: "ctx" })
}, (query) => {
  console.log(query)
  const result = router.handle(
    () => ({
      req: {},
      res: {},
      next: () => { },
    }),
    query
  )
  console.log(result)
  return result;
});