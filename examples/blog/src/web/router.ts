import { sage } from "@sage/sage";
import type { Schema } from "../api/schema";

/**
 * The sage router used by browser.
 * Types are imported from server (with full auto-complete).
 */
export const router = sage.use<Schema>();
