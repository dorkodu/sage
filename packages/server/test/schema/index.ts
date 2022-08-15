import { Sage } from "../../source";

import Person from "./Person";
import Artist from "./Artist";
import Artwork from "./Artwork";

export const schema = Sage.Schema({
  types: { Person, Artist, Artwork },
});
