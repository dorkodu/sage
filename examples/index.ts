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
  do: (atr, arg) => {},
});

const User: SageResource = {
  name: "User",
  context(query, context) {
    context.$query = query;
    return context;
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
    },
    email: {
      name: "email",
      rule(value: any) {
        return typeof value === "string";
      },
      value() {
        return "doruk@dorkodu.com";
      },
    },
  },
};

function attributes(keys: (keyof typeof User.attributes)[]) {}

const doruk = attributes([]);

const query: SageQuery = {
  resource: "User",
  attributes: ["name"],
  arguments: { id: 123 },
};
