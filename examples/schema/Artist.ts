import {
  Sage,
  SageContext,
  SageQuery,
  SageResource,
} from "@dorkodu/sage.server";

import { DataSource } from "./data";

//? Artist Resource
export default Sage.Resource({
  name: "Artist",
  context(query, context: { userId: number }) {
    let reference: any = { query };

    let id = query.arguments?.artistId;
    reference.artist = DataSource.Artist[id];

    return reference;
  },
  attributes: {
    name: {
      name: "name",
      value(context) {
        return context.artist.name;
      },
      rule(value) {
        return typeof value === "string";
      },
    },

    about: {
      name: "about",
      value(context) {
        return context.artist.about;
      },
      rule(value) {
        return typeof value === "string";
      },
    },
  },
  acts: {
    greet: {
      name: "greet",
      do(context) {
        console.info(context.artist);
      },
    },
  },
});
