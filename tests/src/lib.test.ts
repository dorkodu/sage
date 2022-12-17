import server from "../../packages/server/lib/server/src/sage";
import client from "../../packages/client/lib/client/src/sage";

import { describe, expect, it } from "vitest";

describe("lib", () => {

  it("should import", async () => {
    expect(server).toBeTruthy();
    expect(client).toBeTruthy();
  })

})