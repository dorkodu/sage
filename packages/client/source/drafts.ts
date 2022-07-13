import { Sage } from "./sage";

/**
 * Sage.js
 * -> state management library
 * -> simplify managing remote and local data with its own protocol 
 * -> intelligent caching
 * -> declarative data fetching
 *    declare data dependencies anywhere and manage in centralized way
 */

//? client oluşturma
const api = new Sage({
  url: "http://wandergraph.dorkodu.com/api",
  headers: {
    'Authorization': 'Bearer <token>'
  }
});

//? üç farklı yolla veri isteyebiliyosun

// 1) sorguyu oluştur ve hemen yolla (direct execution)
const { loading, error, data } = api.query({···});

// 2) sorguyu ayrı oluştur sonra yollamak için hazırla
const CURRENT_USER = Sage.want({
  type: "User",
  attributes: ["name", "tag", "bio", "profilePhoto.url", "followStatus"],
  act: "refreshUserStats",
  links: {
    "timeline": USER_TIMELINE //TODO: link referanslama sistemine karar ver
  }
});

const USER_TIMELINE = Sage.want({···});

const { loading, error, data } = api.query(CURRENT_USER);

// 3) persisted query
const { loading, error, data } = api.query({
  hash: "d9b687af2e555d05fb30f8ef7298a79a",
  variables: {
    "user.id": 5,
    "auth.token": "aeff40b4fab2decbd34e0f177c1892b1",
    "filter.order.reverse": true
  }
});

/*--------- ALTERNATİF API ----------*/

const currentUser = Sage.want("User")
  .attributes(["name", "tag", "bio", "profilePhoto.url", "followStatus"])
  .arguments({
    "user.id": 123456
  })
  .act("update")

const bestFriend = currentUser.link("bestFriend", {
  attributes: [···],
  arguments: {
   "foo": "bar",
   "DorookieMercury": true 
  }
});

// bence sorgu nesnesi gibi daha iyi ama şöyle de olur:
const bestFriend = currentUser.link("bestFriend")
.attributes(["name", "tag"])
.arguments({
  "user.id": 123456
})

//? static query yazabilmeliyim
const EXCHANGE_RATES = {
  type: "ExchangeRates",
  attributes: ["currency", "rate"],
  arguments: {
    referenceCurrency: "USD"
  }
};

//? örnek bi component ile nasıl kullanabiliriz?
function ExchangeRates() {
  const { loading, error, data } = api.query(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

//? SUNUCU TARAFI ÖRNEĞİ AMA TS İLE
// graphql'de sorguladığın şey aslında bu tree oluyo işte
type Query = {
  me: User
  users: [User!]!
  user(id: ID, uid: String): User
  anotherUser(id: ID): User
  againAUser: User
}

type Mutation = {
  createUser(name: String!, email: String!, password: String!): User
  updateUser(id: ID, email: String, password: String): User
  deleteUser(id: ID): User
}

type User = {
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  updatedAt: String!
};

// bizde şöyle (SERVER GİBİ DÜŞÜN)
const UserType = Sage.EntityType({
  name: "User",
  attributes: {
    "name": $name
  },
  acts: {
    "follow": $follow
  },
  links: {

  }
});

const $name = Sage.Attribute({
  name: "name",
  description: 'Name of a User. Must be a string. Required.',
  resolve: function (referenceValue, info: ContextInfo) {
    let id = referenceValue['user.id'];
    let user = DataSource.getUserById(id);
    return user.email;
  }
});

const $follow = Sage.Act({
  name: "follow",
  description: "Follow a User given their id.",
  do: function(ref, query) {
    UserService.startFollowing(ref.currentUserID, ref.targetID);
  }
})
