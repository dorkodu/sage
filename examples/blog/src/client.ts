import client from "../../../packages/client/src/sage";
import type { Schema } from "./server";

export const sage = client.use<Schema>();
