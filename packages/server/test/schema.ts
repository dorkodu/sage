import { Sage } from "../source/index";

const Person = Sage.Resource({
  name: "",
  resolve: (query, context) => {
    return {};
  },
  attributes: {},
  acts: {},
  links: {},
});

const Book = Sage.Resource({
  name: "Book",
  resolve: (query, context) => {
    return {};
  },
  attributes: {},
  acts: {},
  links: {},
});

export const schema = Sage.Schema({
  types: { Person, Book },
});
