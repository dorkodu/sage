import { Sage } from "../source";

const sage = new Sage({
  url: "http://wandergraph.dorkodu.com/api",
});

async function api() {
  const query = {};
  const { data, error } = await sage.query(query);
  console.log(data);
  console.log(error);
}

api();
