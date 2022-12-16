import { sage } from "./client";
import { router } from "./server";

sage.get(
  {
    a: sage.query("auth", {}, { ctx: "ctx" }),
    b: sage.query("getUser", {}, { wait: "a", ctx: "ctx" }),
    c: sage.query("getUserBlogs", {}, { wait: "a", ctx: "ctx" }),
  },
  async (query) => {
    console.log(query);
    const result = await router.handle(
      () => ({
        req: {},
        res: {},
        next: () => {},
      }),
      query
    );
    console.log(result);
    return result;
  }
);
