import { Sage, SageExecutionResult, SageResponse } from "@dorkodu/sage.server";
import { schema } from "./schema";

let context = {
  me: {
    id: 42,
    name: "Doruk Eray",
    token: "291ed01mpo1m",
  }, // logged in user id
};

//? SHORTCUT
const response: SageResponse = Sage.run({}, schema, context);
const json = JSON.stringify(response);

export type Schema = typeof schema;
