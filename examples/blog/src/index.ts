import { router } from "./web/router";
import { Next, Req, Res, schema } from "./api/schema";

/* Assume these are from NextJS */
const req: Req = { cookies: { token: "token_of_berk" } };
const res: Res = {};
const next: Next = () => { };

/**
 * This is just a mock function of the "fetch",
 * used to show how you would use sage with a HTTP request.
 */
export async function mockFetch(queries: any) {
  return await schema.execute(() => ({ req, res, next }), queries);
}

async function main() {
  // This query does many things at once (the power of the sage), here's an explanation:
  // a. Authorizes user, with ctx equal to "ctx" so the result of the query can be used by other queries.
  // b. Likes the blog with id 0, uses the ctx named "ctx" so the user authentication is not done twice.
  //    Uses wait equal to "a", which means this query will be executed after the query with key "a",
  //    which is the authorization query.
  // c. Gets the user with id 0, uses the context "ctx" and waits until the "a" query is done.
  // d. Creates a blog with the given content, uses the context "ctx" and waits until the "a" query is done.
  // e. Get the feed with anchor id 0, uses the context "ctx" and waits until the "a" query is done.
  // f. Get the blog with id 2, uses the context "ctx" and waits until the "a" query is done.
  // With sage, you can do all these thing and many more at once, unlike RestAPI and others.
  const result = await router.get(
    {
      a: router.query("auth", undefined, { ctx: "ctx" }),
      b: router.query("likeBlog", { blogId: 0 }, { ctx: "ctx", wait: "a" }),
      c: router.query("getUser", { userId: 0 }, { ctx: "ctx", wait: "a" }),
      d: router.query("createBlog", { content: "hello, world!" }, { ctx: "ctx", wait: "a" }),
      e: router.query("getFeed", { anchorId: 0 }, { ctx: "ctx", wait: "b" }),
      f: router.query("getBlog", { blogId: 2 }, { ctx: "ctx", wait: "a" })
    },
    async (queries) => {
      const result = await mockFetch(queries);
      return result;
    }
  )

  console.log(result);
}

main()