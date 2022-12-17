import { sage } from "./client";
import { schema } from "./server";

sage.get(
  {
    a: sage.query("auth", {}, { ctx: "ctx" }),
    b: sage.query("getUser", {}, { wait: "a", ctx: "ctx" }),
    c: sage.query("getUserBlogs", {}, { wait: "a", ctx: "ctx" }),
  },
  async (document) => {
    console.log(document);
    const result = await schema.execute(
      () => ({
        req: {},
        res: {},
        next: () => { },
      }),
      document
    );
    console.log(result);
    return result;
  }
);
