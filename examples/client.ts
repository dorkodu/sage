import { Sage, SageQuery } from "@dorkodu/sage.client";
import { SageHTTPSource } from "./http";

import { Schema as DataSchema } from "./server";

const API = new SageHTTPSource({
  url: "http://localhost:2004",
  headers: {
    "Authentication-Token": "sj31",
  },
});

const sage = new Sage<DataSchema>({ source: API });

const me = sage.want({
  resource: "Artwork",
  attributes: ["name", "email", "token"],
  act: "refresh",
  arguments: {
    id: 2152,
  },
});

// get your data anythime, anywhere
const result = me.get();

// a standard query
const PinkFloyd: SageQuery = {
  resource: "Artist",
  attributes: ["name", "about"],
  arguments: {
    id: 1,
  },
};

// send many queries in one single roundtrip
sage.request({ floyd: PinkFloyd, artwork: me.query });
