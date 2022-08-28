import { Sage, SageQuery } from "@dorkodu/sage.client";
import { SageHTTPSource } from "./http";

import { Schema as DataSchema } from "./server";

const API = new SageHTTPSource({
  url: "http://localhost:2004",
  headers: {},
});

const sage = new Sage<DataSchema>({ source: API });

const me = sage.want({
  resource: "Me",
  attributes: ["name", "email", "token"],
  act: "refresh",
  arguments: {
    id: 2152,
  },
});

const result = me.fetch();

const query: SageQuery = {
  resource:
}

sage.request({ })
