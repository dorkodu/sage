import {
  Sage,
  SageQuery,
  SageResource,
  SageAttribute,
} from "../packages/server/source";
import { ValueOf } from "../packages/server/source/utils";

import { Sage as SageServer } from "../packages/server/source";
import { Sage as SageClient } from "../packages/client/source";

const router = sage.router().schema("user", {
  rule: {
    id: 0,
  },
  do: (atr, arg) => { },
});

const User = SageServer.Resource({
  name: "USER",
  context: (query: SageQuery) => {
    return {
      id: 123, query
    }
  },
  attributes: {
    name: {
      name: "name",
      rule(value: any) {
        return typeof value === "string";
      },
      value() {
        return "Doruk Eray";
      },
    }
  },
  acts: {
    signup: {
      do(context) {

      },
    }
  }
})

function attributes(keys: (keyof typeof User.attributes)[]) { }

const doruk = attributes([]);

const query: SageQuery = {
  resource: "User",
  attributes: ["name"],
  arguments: { id: 123 },
};
