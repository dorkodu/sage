import {
  Sage,
  SageExecutionResult,
  SageResponse,
} from "../packages/server/source";
import { schema } from "./schema";
import { request } from "./client";

let context = {
  me: 42, // logged in user id
};

//? SHORTCUT
const response: SageResponse = Sage.run(request, schema, context);
