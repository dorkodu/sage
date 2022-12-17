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

const auth = sage.resource(
  {} as Context,
  {} as {},
  (_arg, ctx) => {
    ctx.userId = 0;
    return { userId: 0 };
  });

const getUser = sage.resource(
  {} as Context,
  {} as { userId?: number },
  (arg, ctx): IUser | undefined => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getUserById(userId);
  }
);

const getUserBlogs = sage.resource(
  {} as Context,
  {} as { userId?: number },
  (arg, ctx): IBlog[] | undefined => {
    let userId: number | undefined = undefined;
    if (arg && typeof arg.userId === "number") userId = arg.userId;
    else if (ctx.userId !== undefined) userId = ctx.userId;
    return getBlogsByUserId(userId);
  }
);

export type Schema = typeof schema;

export const schema = sage.schema(
  {} as Context,
  {
    auth,
    getUser,
    getUserBlogs,
  }
);