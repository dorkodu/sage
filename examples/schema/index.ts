import { Sage } from "@dorkodu/sage.server";

import Artist from "./Artist";
import Artwork from "./Artwork";

export const schema = Sage.Schema({
  resources: { Artist, Artwork },
  verified: false,
});
