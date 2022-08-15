import { Sage } from "../source";

const request = {
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

const document = Sage.parse(request);
const problems = Sage.validateSchema(document);
const result = Sage.execute();
