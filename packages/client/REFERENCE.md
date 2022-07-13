# The Readme Reference for Sage.js

This is the reference document for the “**readme driven development**” of Sage.js

## Stuff

`fetchPolicy`

## API with Examples

### Import

```js
import {
  Sage
} from "sage.js";
```

### Initialize a client

```js
const sage = Sage({
  url: "https://api.wanderlyf.com",
  options: {
   fetchPolicy: ""
  }
});
```



```js
// example query
const query_DORUK = {
  type: "User",
  attributes: ["id", "name", "username", "bio", "profilePhotoUrl"],
  arguments: {
    username: "doruk"
  }
};

// assume that this is the same shit but returns berk
const get_BERK = {...};

// instant query, returns a promise or a result object (i dunno yet)
const result = sage.query(DORUK);

// want(queryName, query, options)
sage.want("getDoruk", get_DORUK, {});
sage.want("getBerk", get_BERK, {});

// gets everything on the requirements queue. 
sage.retrieve();

// i needed fresh data, this is how
sage.refresh("queryName");
sage.refresh(); // refreshes all!
```

```js
// returns a promise
sage.query(get_DORUK)
.then(
  	result => console.log(result)
);
```

```js
const { loading, error, data } = sage.query(get_DORUK);
```

## Samples

## Using

GraphQL.js is **isomorphic**. You can use it in both **browser and Node.js**.

#### Use in Browser

```html
<script src="/path/to/graphql.js"></script>
```

#### Use in Node.js

```js
var graphql = require('graphql.js')
```

Or using `import`

```js
import graphql from 'graphql.js'
```

## Connection

Create a simple connection to your GraphQL endpoint.

```js
var graph = graphql("http://localhost:3000/graphql", {
  method: "POST", // POST by default.
  headers: {
    // headers
    "Access-Token": "some-access-token"
    // OR "Access-Token": () => "some-access-token"
  },
  fragments: {
    // fragments, you don't need to say `fragment name`.
    auth: "on User { token }",
    error: "on Error { messages }"
  }
})
```

## Executing Queries and Mutations

`graph` will be a simple function that accepts `query` and `variables` as parameters.

```js
graph(`query ($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    ... auth # if you use any fragment, it will be added to the query.
    ... error
  }
}`, {
  email: "john@doe.com",
  password: "my-super-password"
}).then(function (response) {
  // response is originally response.data of query result
  console.log(response)
}).catch(function (error) {
  // response is originally response.errors of query result
  console.log(error)
})
```

### Prepare Query for Lazy Execution

You can prepare queries for lazy execution. This will allow you to reuse your queries with
different variables without any hassle.

```js
var login = graph(`query ($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    ... on User {
      token
    }
  }
}`)

// Call it later...
login({
  email: "john@doe.com",
  password: "my-super-password"
})
```

#### Direct Execution with `.run` and ES6 Template Tag

If your query doesn't need any variables, it will generate a lazy execution query by default.
If you want to run your query immediately, you have three following options:

```js
// 1st option. create and run function.
graph(`...`)()
graph.query(`...`)()
graph.mutate(`...`)()
//...

// 2nd option. create and run function with `run` method.
graph.run(`...`)
graph.query.run(`...`)
graph.mutate.run(`...`)

// 3rd option. create and run function with template tag.
graph`...`
graph.query`...`
graph.mutate`...`
```

> **I don't recommend** using this. Using it too much may break DRY. Use lazy execution as much as possible.

### Prefix Helpers

You can prefix your queries by simply calling helper methods: `.query`, `.mutate` or `.subscribe`

```js
var login = graph.query(`($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    ... on User {
      token
    }
  }
}`)

var increment = graph.mutate`increment { state }`
var onIncrement = graph.subscribe`onIncrement { state }`
```

### Automatic Declaring with `@autodeclare` or `{declare: true}`

Declaring primitive-typed (`String`, `Int`, `Float`, `Boolean`) variables in query were a
little bothering to me. That's why I added an `@autodeclare` keyword or `{declare: true}` setting to the processor.
It detects types from the variables and declares them in query automatically.

```js
var login = graph.query(`(@autodeclare) {
  auth(email: $email, password: $password) {
    ... on User {
      token
    }
  }
}`)

login({
  email: "john@doe.com", // It's String! obviously.
  password: "my-super-password" // It is, too.
})
```

This will create following query:

```graphql
query ($email: String!, $password: String!) {
  auth(email: $email, password: $password) {
    ... on User {
      token
    }
  }
}
```

You can also pass `{declare: true}` option to the `.query`, `.mutate` and `.subscribe` helper:

```js
var login = graph.query(`auth(email: $email, password: $password) {
  ... on User {
    token
  }
}`, {declare: true})
```

This will also create the same query above.

#### Detecting IDs

Variable names with matching `/_id/i` pattern will be declared as `ID` type. Following examples will be declared as IDs:

- `id: 1` will be declared as `$id: ID!`
- `post_id: "123af"` will be declared as `$post_id: ID!`
- `postID: 3` will be declared as `$postID: ID!`
- `postId: 4` will be declared as `$postId: ID!`

You can disable auto ID declaration by adding an `!` to the end of the variable name:

- `id!: 1` will be declared as `$id: Int!`
- `post_id!: "123af"` will be declared as `$post_id: String!`

And, explicitly given types are prioritized.

- `postID!CustomId: 3` will be declared as `$postID: CustomId!`
- `postId!UUID: 4` will be declared as `$postId: UUID!`

```js
var userById = graph.query(`(@autodeclare) {
  user(id: $id) {
    email
  }
}`)

userById({
  id: 15
})
```

The example above will generate following query:

```graphql
query ($id: ID!) {
  user(id: $id) {
    email
  }
}
```

#### Solving `Integer` and `Float` Problem

Let's say you have a `rating` query that accepts an argument with a `Float` argument named `rating`.
GraphQL.js will declare `10` value as `Integer` since it casts using `value % 1 === 0 ? 'Int' : 'Float'` check.

```js
var rate = graph.query(`(@autodeclare) {
  rating(rating: $rating) {
    rating
  }
}`)

rate({
  rating: 10
})
```

In this case, you must use `!` mark to force your type to be `Float` as below:

```js
rate({
  "rating!Float": 10
})
```

This will bypass the casting and declare `rating` as `Float`.

### Advanced Auto Declaring

Beside you can pass `{declare: true}` to helpers:

```js
graph.query("auth(email: $email, password: $password) { token }", {declare: true})
```

Also you can enable auto declaration to run by default using `alwaysAutodeclare` setting.

```js
var graph = graphql("http://localhost:3000/graphql", {
  alwaysAutodeclare: true
})
```

After you enable `alwaysAutodeclare` option, your methods will try to detect types of variables and declare them.

```js
// When alwaysAutodeclare is true, you don't have to pass {declare: true} option.

graph.query("auth(email: $email, password: $password) { token }")
```

#### Auto Declaring Custom Types

You can define custom types when defining variables by using a simple `"variable!Type"` notation.
It will help you to make more complex variables:

```js
var register = graph.mutate(`(@autodeclare) {
  userRegister(input: $input) { ... }
}`)

register({
  // variable name and type.
  "input!UserRegisterInput": { ... }
})
```

This will generate following query:

```graphql
mutation ($input: UserRegisterInput!) {
  userRegister(input: $input) { ... }
}
```

## Fragments

Fragments make your GraphQL more DRY and improves reusability. With `.fragment` method, you'll
manage your fragments easily.

### Simple Fragments

While constructing your endpoint, you can predefine all of your fragments.

```js
var graph = graphql("/graphql", {
  fragments: {
    userInfo: `on User { id, name, surname, avatar }`
  }
})
```

And you can use your fragments in your queries. The query will pick your fragments and
will add them to the bottom of your query.

```js
graph.query(`{ allUsers { ...userInfo } }`)
```

### Nested Fragments

You can nest your fragments to keep them organized/namespaced.

```js
var graph = graphql("/graphql", {
  fragments: {
    user: {
      info: `on User { id, name, surname, avatar }`
    }
  }
})
```

Accessing them is also intuitive:

```js
graph.query(`{ allUsers { ...user.info } }`)
```

### Using Fragments in Fragments

You can reuse fragments in your fragments.

```js
graph.fragment({
  user: "on User {name, surname}",
  login: {
    auth: "on User {token, ...user}"
  }
})
```

### Lazy Fragments

You can also add fragments lazily. So you can use your fragments more modular.

```js
// Adds a profile fragment
graph.fragment({
  profile: `on User {
    id
    name(full: true)
    avatar
  }`
})

var allUsers = graph.query(`{
  allUsers {
    ... profile
  }
}`)

allUsers().then(...)
```

Also you can add **nested fragments** lazily, too:

```js
graph.fragment({
  login: {
    error: `on LoginError {
      reason
    }`
  }
})

graph.fragment({
  something: {
    error: `on SomeError {
      messages
    }`
  }
})

graph.query(`{ login {... login.error } }`)
graph.query(`{ something {... something.error } }`)
```

### Getting Fragments by Path

You can call fragment string by using `.fragment` method. You have to pass path string to get the fragment.

```js
graph.fragment('login.error')
```

This will give you the matching fragment code:

```graphql
fragment login_error on LoginError {
  reason
}
```

### Using Fragments in Tag Query

You can use fragments lazily using ES6 template tag queries.

```js
var userProfileToShow = graph.fragment('user.profile')

graph`query { ... ${userProfileToShow} }`
```

### Query Building

You can create queries using `.ql` **ES6 template tag**.

```js
// Add some fragments...
graph.fragment({
  username: {
    user: `on User {
      username
    }`,
    admin: `on AdminUser {
      username,
      administrationLevel
    }`
  }
})

// Get any fragment with its path...
var admin = graph.fragment('username.admin')

// Build your query with using fragment paths or dynamic template variables.
var query = graph.ql`query {
  ...username.user
  ...${admin}
}`

// Use query anywhere...
$.post("/graphql", {query: query}, function (response) { ... })
```

`graph.ql` will generate this query string:

```graphql
query {
  ... username_user
  ... username_admin
}

fragment username_user on User {
  username
}

fragment username_admin on AdminUser {
  username,
  administrationLevel
}
```

### Query Merging: Merge Multiple Queries into One Request

![merge](README.assets/graphql-merge.gif)

> This GIF shows a **before/after** case to make an example how query merging changes the performance.

`graphql.js` supports **query merging** that allows you to collect all the requests into one request.

Assume we've these queries on server, define them just like before we do:

```js
var fetchPost = graph.query(`{
  post(id: $id) {
    id
    title
    text
  }
}`)

var fetchComments = graph.query(`{
  commentsOfPost: comments(postId: $postId) {
    comment
    owner {
      name
    }
  }
}`)
```

Normally, we make requests as following:

```js
var postId = 123

// This will send a request.
fetchPost({ id: postId }).then(function (response) {
  console.log(response.post)
})

// This also will send a request.
fetchComments({ postId: postId }).then(function (response) {
  console.log(response.commentsOfPost)
})
```

This will make two requests:

![ss1](README.assets/ss1.png)

Use **`.merge(mergeName, variables)`** command to put them into a merge buffer:

```js
var postId = 123

// This won't send a request.
fetchPost.merge('buildPage', { id: postId }).then(function (response) {
  console.log(response.post)
})

// This also won't send a request.
fetchComments.merge('buildPage', { postId: postId }).then(function (response) {
  console.log(response.commentsOfPost)
})
```

These will create a buffer with *buildPage* name, and append the queries to that buffer. You need to use **`commit(mergeName)`** to merge the buffer and send to the server, the response will be consolidated:

```js
// This will send a merged request:
graph.commit('buildPage').then(function (response) {
  // All base fields will be in response return.
  console.log(response.post)
  console.log(response.commentsOfPost)
})
```

And this will create only one request:

![ss2](README.assets/ss2.png)

This will create the following merged query generated by **graphql.js**:

```graphql
query ($merge024533__id: ID!, $merge141499__postId: ID!) {
  merge024533_post: {
    post(id: $merge024533__id) {
      id
      title
      text
    }
  }
  merge141499_commentsOfPost: {
    comments(postId: $merge141499__postId) {
      comment
      owner {
        name
      }
    }
  }
}
```

And variables will be generated, too:

```js
{
  "merge024533__id": 123,
  "merge141499__postId": 123
}
```

> The `merge{number}` aliases won't be passed into your responses, since they will be used for initial seperation.

> ⚠️ **Important Restriction**: You cannot use multiple root fields using query merging.
> ⚠️ **Important Restriction**: Autodeclaration is on by default, do not use `alwaysAutodeclare: true`.

## Debugging

You can pass `debug: true` to options parameter to get a console output looks like following:

```
[graphql]: POST http://localhost:3000/graphql
  QUERY: query ($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      .. login_auth
    }
  }

  fragment info on User { hasPin }
  fragment login_auth on User { token, ...info }

  VARIABLES: {
    "email": "john@doe.com",
    "password": "123123"
  }

  sending as form url-data
```

## Advanced

### Using with Vue.js

Create a `GraphQLProvider.js`.

```js
import graphql from 'graphql.js';

/* eslint-disable no-underscore-dangle */
export default {
  install(Vue, url, options) {
    Vue.mixin({
      created() {
        this._graph = graphql(url, options);
      },
    });
    Object.defineProperty(Vue.prototype, '$graph', {
      get() {
        return this._graph;
      },
    });
  },
};
```

And then you can use this with your Vue app:

```js
import Vue from 'vue';
import GraphQLProvider from './GraphQLProvider';

Vue.use(GraphQLProvider, 'http://localhost:3000/graphql', {
  headers: {
    // headers...
  },
});

// ... in your Vue VM
data() {
  return {
    hello: '',
  };
},
methods: {
  makeSomeQuery() {
    this.$graph.query(`{hello}`).then(response => {
      this.hello = response.hello;
    });
  },
}
```

### Change POST Method

As default, GraphQL.js makes a POST request. But you can change the behavior by setting `asJSON`.

```js
var graph = graphql("http://localhost:3000/graphql", {
  asJSON: true
});
```

### Using with `graphql-tag`

[`graphql-tag`](https://github.com/apollographql/graphql-tag) converts GraphQL query strings to AST. You can use `graphql-tag` with GraphQL.js

```js
graph.query(gql`query { name }`)
```

> Using `graphql-tag` will not allow you to use _auto declaration_ and _nested fragments_ syntaxes since these are not valid query syntax for GraphQL but only for this library.

### Change Url Anywhere

You can change url anywhere with `setUrl` method.

```js
var graph = graphql("http://localhost:3000/graphql", {
  asJSON: true
});

// Change url
graph.setUrl('http://www.example.com')

// Run query
graph.query(`{ name }`)
```

---

## Todo App Example

A CRUD ToDo app example code to show how to use GraphQL.js. An implementation can be found at [**f/graphql.js-demo**](https://github.com/f/graphql.js-demo)

```js
var graph = graphql("/graphql", {
  alwaysAutodeclare: true,
  fragments: {
    todo: `on Todo {
      id
      text
      isCompleted
    }`
  }
})

function getTodos() {
  return graph.query.run(`allTodos {
    ...todo
  }`)
}

function addTodo(text) {
  return graph.mutate(`todoAdd(text: $text) {
    ...todo
  }`, {
    text: text
  })
}

function setTodo(id, isCompleted) {
  return graph.mutate(`todoComplete(
    id: $id,
    status: $isCompleted
  ) {
    ...todo
  }`, {
    id: id,
    isCompleted: isCompleted
  })
}

function removeTodo(id) {
  return graph.mutate(`todoRemove(
    id: $id
  ) {
    ...todo
  }`, {
    id: id
  })
}
```

## License



Cop
