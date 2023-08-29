import { IBlog, IUser, data } from "./data";
import { Context } from "./schema";

/**
 * Utility function that is used to check if user is authenticated or not.
 * @param ctx Context of the sage, used to get user's "token" cookie.
 * @returns Info about user auth, userId and sessionId if exists.
 */
function authInfo(ctx: Context) {
  if (!ctx.triedAuth) {
    const session = query.getSession(ctx.req.cookies?.["token"]);
    ctx.triedAuth = true;
    ctx.sessionId = session?.id;
    ctx.userId = session?.userId;
  }

  if (ctx.sessionId === undefined || ctx.userId === undefined) return undefined;
  return { userId: ctx.userId, sessionId: ctx.sessionId };
}

/**
 * This would be the SQL query that selects a session.
 * @param token Token of the session, this would be stored in user's browser cookies.
 * @returns Data of the session that is selected.
 */
function getSession(token: string | undefined) {
  if (token === undefined) return undefined;

  for (let i = 0; i < data.sessions.length; ++i) {
    const auth = data.sessions[i];
    if (auth && auth.token === token) return { id: auth.id, userId: auth.userId };
  }

  return undefined;
}

/**
 * This would be the SQL query that selects a user.
 * @param userId Id of the user that is selected.
 * @returns Data of the user that is selected.
 */
function getUser(userId: number): IUser | undefined {
  for (let i = 0; i < data.users.length; ++i) {
    const user = data.users[i];
    if (user && user.id === userId) return user;
  }

  return undefined;
}

/**
 * This would be the SQL query that selects a blog.
 * @param blogId Id of the blog that is selected.
 * @param userId Id of the user that is getting the blog. Used to show if blog is liked or not.
 * @returns Data of the blog that is selected.
 */
function getBlog(blogId: number, userId: number | undefined): (IBlog & { liked: boolean }) | undefined {
  const blog = data.blogs.filter(b => b.id === blogId)[0];
  if (!blog) return undefined;

  let liked = false;
  if (userId !== undefined) {
    liked = !!data.likes.filter(l => l.userId === userId && l.blogId === blogId);
  }

  return { ...blog, liked };
}

/**
 * This would be the SQL query that selects feed (multiple blogs).
 * Only selects 2 or less blogs, in ascending order (lowest id to higher ids).
 * @param anchorId If not provided, lowest id will be the first blog. If provided, lowest id will be the anchor id.
 * @param userId Id of the user that is getting the feed. Used to show if blog is liked or not.
 * @returns Array of blogs (feed).
 */
function getFeed(anchorId: number | undefined, userId: number | undefined): IBlog[] {
  if (anchorId === undefined) return data.blogs.slice(0, 2);

  const anchor = data.blogs.filter(b => b.id === anchorId)[0];
  let index = data.blogs.findIndex(b => b === anchor);

  if (index === -1) return [];

  return data.blogs.slice(index, index + 2).map(b => {
    const liked = !!data.likes.filter(l => l.userId === userId && l.blogId === b.id)[0];
    return { ...b, liked }
  });
}

/**
 * This would be the SQL query that creates a blog.
 * @param userId Id of the user that creates the blog.
 * @param content Content of the blog that is being created.
 * @returns Data of the blog that is created.
 */
function createBlog(userId: number, content: string) {
  const blog: IBlog = { id: data.blogsIndex++, userId, content, likeCount: 0 };
  data.blogs.push(blog);
  return blog;
}

/**
 * This would be the SQL query that likes a blog. If already liked, it unlikes the blog.
 * @param userId Id of the user that likes the blog.
 * @param blogId Id of the blog that is being liked.
 * @returns Data of the blog that is liked.
 */
function likeBlog(userId: number, blogId: number): boolean {
  const blog = data.blogs.filter(b => b.id === blogId)[0];
  if (!blog) return false;

  const liked = data.likes.filter(l => l.userId === userId && l.blogId === blogId)[0];
  let index = data.likes.findIndex(l => l === liked);

  if (liked && index !== -1) {
    blog.likeCount--;
    data.likes.splice(index, 1);
  }
  else {
    blog.likeCount++;
    data.likes.push({ id: data.likesIndex++, userId, blogId });
  }

  return true;
}

/**
 * Object that contain would SQL queries (in a normal application).
 */
export const query = {
  authInfo,

  getSession,
  getUser,
  getBlog,
  getFeed,

  createBlog,
  likeBlog,
}
