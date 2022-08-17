import { Sage } from "../source";
import { schema } from "./schema";

const request = {
  berk: {},
  doruk: {
    typ: "Person",
    atr: ["name", "age"],
    arg: {
      personId: 1,
    },
    lnk: {
      bestFriend: "doruk:bestFriend",
    },
  },
  "doruk:bestFriend": {
    atr: ["name"],
    lnk: {
      favoriteArtwork: "doruk:bestFriend:favoriteArtwork",
    },
  },
  "doruk:bestFriend:favoriteArtwork": {
    atr: ["name"],
  },
};

const { document, problems } = Sage.parse(request);
const schemaValidationResult = Sage.validateSchema(document);
const result = Sage.execute();
