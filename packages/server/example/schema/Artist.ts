import { Sage } from "../../source";
import { DataSource } from "./data";

import Person from "./Person";
import { Artwork } from "./Artwork";
import { Artist as ArtistType } from "./Artist";
import { SageContext, SageQuery, SageResource } from "../../source/type";

//? Artist Resource
export const Artist = Sage.Resource({
  name: "Artist",
  context(query, context: { userId: number }) {
    let reference: any = {};

    let id = query.arguments.artistId;
    reference.artist = DataSource.Artist[id];

    return reference;
  },
  attributes: {
    name: Sage.Attribute({
      name: "name",
      value(context) {
        return context.artist.name;
      },
      rule(value) {
        return typeof value === "string";
      },
    }),

    about: Sage.Attribute({
      name: "about",
      value(context) {
        return context.artist.about;
      },
      rule(value) {
        return typeof value === "string";
      },
    }),
  },
  links: {
    artworks: Sage.Link({
      name: "artworks",
      linksTo: Artwork,
      resolve(resource, context) {
        let reference: any = {};

        reference.context = context;
        reference.resource = resource;

        return reference;
      },
    }),

    replica: Sage.Link({
      name: "replica",
      linksTo: ArtistType,
      resolve(resource, context) {},
    }),
  },
});
