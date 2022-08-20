import { Sage } from "../source";
import { schema } from "./schema";

const request = {
  doruk: {
    res: "Person",
    atr: ["name", "age", "favoriteArtwork"],
    arg: {
      id: 1,
    },
  },
  "doruk:favoriteArtwork": {
    res: "Artwork",
    atr: ["name"],
    arg: {
      id: 1,
    },
  },
};

//? parse and validate document
const { document, problems } = Sage.parse(request);

//? validate schema
const schemaValidationResult = Sage.validateSchema(schema);

//? execute query
//! only if BOTH document & schema are validated.
const result = Sage.execute(document, schema, {});
