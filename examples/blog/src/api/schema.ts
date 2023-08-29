import { z } from "zod";
import { sage } from "@sage/sage";
import { types } from "./types";
import { query } from "./query";
import { IBlog, IUser } from "./data";

/**
 * This would be the "Request" type from the ExpressJS.
 */
export type Req = { cookies?: Record<string, string> };

/**
 * This would be the "Response" type from the ExpressJS.
 */
export type Res = {};

/**
 * This would be the "Next" type from the ExpressJS.
 */
export type Next = () => void;

export interface Context {
  /* Constant context variables (eg. req, res, next from ExpressJS) */
  readonly req: Req;
  readonly res: Res;
  readonly next: Next;

  /* Non-constant context variables that are useful */

  /**
   * Used to make sure user auth is only tried once,
   * if a user can't be authorized in one query,
   * there is no need to try it again on other queries.
   */
  triedAuth?: boolean;

  /**
   * When using multiple sage queries at once,
   * user auth can be done only once and user id be used by all queries.
   */
  userId?: number;

  /**
   * When using multiple sage queries at once,
   * user auth can be done only once and session id be used by all queries.
   */
  sessionId?: number;
}

const auth = sage.resource(
  {} as Context,
  undefined,
  async (_arg, ctx): Promise<{ data?: {}, error?: {} }> => {
    const info = query.authInfo(ctx);
    if (!info) return { error: {} };

    return { data: {} };
  }
)

const getUser = sage.resource(
  {} as Context,
  {} as z.infer<typeof types.getUser>,
  async (arg, _ctx): Promise<{ data?: IUser, error?: {} }> => {
    const parsed = types.getUser.safeParse(arg);
    if (!parsed.success) return { error: {} };

    const { userId } = parsed.data;

    const user = query.getUser(userId);
    if (!user) return { error: {} };

    return { data: user };
  }
)

const getBlog = sage.resource(
  {} as Context,
  {} as z.infer<typeof types.getBlog>,
  async (arg, ctx): Promise<{ data?: IBlog, error?: {} }> => {
    const parsed = types.getBlog.safeParse(arg);
    if (!parsed.success) return { error: {} };

    const info = query.authInfo(ctx);

    const { blogId } = parsed.data;
    const userId = info?.userId;

    const blog = query.getBlog(blogId, userId);
    if (!blog) return { error: {} };

    return { data: blog };
  }
)

const getFeed = sage.resource(
  {} as Context,
  {} as z.infer<typeof types.getFeed>,
  async (arg, ctx): Promise<{ data?: IBlog[], error?: {} }> => {
    const parsed = types.getFeed.safeParse(arg);
    if (!parsed.success) return { error: {} };

    const info = query.authInfo(ctx);

    const { anchorId } = parsed.data;

    const blogs = query.getFeed(anchorId, info?.userId);
    return { data: blogs };
  }
)

const createBlog = sage.resource(
  {} as Context,
  {} as z.infer<typeof types.createBlog>,
  async (arg, ctx): Promise<{ data?: IBlog, error?: {} }> => {
    const parsed = types.createBlog.safeParse(arg);
    if (!parsed.success) return { error: {} };

    const info = query.authInfo(ctx);
    if (!info) return { error: {} };

    const { userId } = info;
    const { content } = parsed.data;

    const blog = query.createBlog(userId, content);
    return { data: blog };
  }
)

const likeBlog = sage.resource(
  {} as Context,
  {} as z.infer<typeof types.likeBlog>,
  async (arg, ctx): Promise<{ data?: {}, error?: {} }> => {
    const parsed = types.likeBlog.safeParse(arg);
    if (!parsed.success) return { error: {} };

    const info = query.authInfo(ctx);
    if (!info) return { error: {} };

    const { userId } = info;
    const { blogId } = parsed.data;

    const result = query.likeBlog(userId, blogId);
    if (!result) return { error: {} };

    return { data: {} };
  }
)

export type Schema = typeof schema;
export const schema = sage.schema(
  {} as Context,
  {
    auth,

    getUser,
    getBlog,
    getFeed,
    
    createBlog,
    likeBlog,
  }
);
