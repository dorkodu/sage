import client from "../../../packages/client/src/sage";
import type { Router } from "./server";

export const sage = client.router<Router>();
