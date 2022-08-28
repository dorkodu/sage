import {
  Sage,
  SageContext,
  SageQuery,
  SageResource,
} from "@dorkodu/sage.server";

import { DataSource } from "./data";

//? Artwork Resource
export default Sage.Resource({
  name: "Artwork",
  context(query, context) {
    let reference: any = {};

    let id = query.arguments?.artistId;
    reference.artwork = DataSource.Artwork[id];

    return reference;
  },
  attributes: {
    name: {
      name: "name",
      value(context) {
        return context.artwork.name;
      },
      rule(value) {
        return typeof value === "string";
      },
    },

    about: {
      name: "about",
      value(context) {
        return context.artwork.about;
      },
      rule(value) {
        return typeof value === "string";
      },
    },
  },
  acts: {
    print: {
      name: "print",
      do(context) {
        console.info(context.artwork);
      },
    },
  },
});
