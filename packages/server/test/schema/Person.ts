import { Sage } from "./../../source";
import { DataSource } from "./data";

import Person from "./Person";
import Artwork from "./Artwork";
import Artist from "./Artist";

const name = Sage.Attribute({
  name: "name",
  resolve(context) {
    return DataSource.Person[context.UserId];
  },
  rule(value) {
    return true;
  },
});

const age = Sage.Attribute({
  name: "age",
  resolve(context) {
    return DataSource.Person[context.UserId];
  },
  rule(value) {
    return typeof value === "number";
  },
});

const greet = Sage.Act({
  name: "greet",
  do: function (context: any) {
    console.log(context.message);
  },
});

const bestFriend = Sage.Link({
  name: "bestFriend",
  linksTo: Person,
  resolve(context) {
    return context.person.age;
  },
});

const favoriteArtist = Sage.Link({
  name: "favoriteArtist",
  linksTo: Artist,
  resolve(context) {
    return context.person.favoriteArtist;
  },
});

const favoriteArtwork = Sage.Link({
  name: "favoriteArtwork",
  linksTo: Artwork,
  resolve(context) {
    return context.person.favoriteArtwork;
  },
});

export default Sage.Resource({
  name: "Person",
  resolve(query, context) {
    let newContext = context;
    let personId = query.arguments.personId;
    newContext.person = DataSource.Person[personId];
    return newContext;
  },
  attributes: {
    name,
    age,
  },
  acts: {
    greet,
  },
  links: {
    bestFriend,
    favoriteArtist,
    favoriteArtwork,
  },
});
