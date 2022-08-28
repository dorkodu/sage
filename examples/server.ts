import {
  Sage,
  SageExecutionResult,
  SageResponse,
} from "../packages/server/source";
import { schema } from "./schema";

let context = {
  me: 42, // logged in user id
};

//? SHORTCUT
const response: SageResponse = Sage.run({}, schema, context);
const json = JSON.stringify(response);

export type Schema = typeof schema;
