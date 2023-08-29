import { describe, expect, it } from "vitest";

import { router } from "@blog/web/router";
import { mockFetch } from "@blog/index";

describe("index", () => {

  it("basic query", async () => {
    const result = await router.get(
      { a: router.query("auth", undefined) },
      (queries) => mockFetch(queries)
    )

    expect(result?.a).toBeTruthy();
  })

  it("multiple queries", async () => {
    const result = await router.get(
      {
        a: router.query("auth", undefined, { ctx: "ctx" }),
        b: router.query("getUser", { userId: 0 }, { ctx: "ctx", wait: "a" })
      },
      (queries) => mockFetch(queries)
    )

    expect(result?.a).toBeTruthy();
    expect(result?.b).toBeTruthy();
  })

  it("decoded query", async () => {
    await router.get(
      { a: router.query("auth", undefined) },
      async (queries) => {
        expect(JSON.stringify(queries)).toBe(`{"a":{"res":"auth"}}`);
      }
    )
  })

  it("unresolvable query", async () => {
    const result = await router.get(
      { a: router.query("auth", undefined, { wait: "a" }) },
      (queries) => mockFetch(queries)
    )

    expect(result?.a).toBeFalsy();
  })

})