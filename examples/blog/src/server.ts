import sage from "../../../packages/server/src/sage";
import { users, blogs, IBlog, IUser } from "./data";

type Req = {};
type Res = {};
type Next = () => void;

interface Context {
  // Constant context variables (eg. req, res, next from express)
  readonly req: Req;
  readonly res: Res;
  readonly next: Next;

  // Non-constant context variables that are useful
  userId?: number;
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

const auth = sage.route({} as Context, {} as {}, (_input, ctx) => {
  ctx.userId = 0;
  return { userId: 0 };
});

const getUser = sage.route(
  {} as Context,
  {} as { userId?: number },
  (input, ctx): IUser | undefined => {
    let userId: number | undefined = undefined;
    if (input && typeof input.userId === "number") userId = input.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getUserById(userId);
  }
);

const getUserBlogs = sage.route(
  {} as Context,
  {} as { userId?: number },
  (input, ctx): IBlog[] | undefined => {
    let userId: number | undefined = undefined;
    if (input && typeof input.userId === "number") userId = input.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getBlogsByUserId(userId);
  }
);

export type Router = typeof router;

export const server = sage.service({} as Context, {
  auth,
  getUser,
  getUserBlogs,
});

// Server
const getUserProfile = sage.resource();
type Schema = typeof schema;
const schema = sage.schema();
schema.execute();

// Client
const api = sage.use<Schema>();
api.get({
  a: api.query("asd", {}, { wait: "a", ctx: "a" }),
});

const document = {
  a: {
    res: "getSessions",
  },
};
