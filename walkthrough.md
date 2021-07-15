# Sage – Walkthrough

This is the walkthrough for Sage, a query-based data exchange protocol for APIs.

<img src="resources/sage-dark.png" style="width: 70%;" />

## What?

Sage is an **open protocol** for *designing* and *developing* better APIs, simply a specification about how to *describe* and *query for* **data;** and a **runtime** capable of **executing** those queries with your **existing** *data* and *business logic*.

Sage provides a **simple** & **lightweight** but also **efficient, expressive** and **intuitive** way for describing the data graph in your API, giving clients the power to interact with your API exactly how they need to —performing data retrieval or action call— makes evolving and documenting your APIs easier.

## How?

A Sage service is created by defining the data **schema** as **entities** with their **attributes**, **acts** and **relationships**, then writing the code which maps your schema to your existing business logic. You describe and consume data more realistically with Sage, as how it is in the real world.

### Let’s hit the road!

For example, let’s assume that you want a Sage service which tells you about movies. You need to define your schema first. We use a **hypothetical, pseudo SDL** *(schema definition language)* in our examples, but you will write real code to define your schema :

```css
entity Movie {
  name @string;
  starring @list( @string );
  duration @integer;
  directedBy @string;
  releaseYear @integer
}
```

Here is a sample Sage service which requests for the movie *The Matrix* :

— Query :

```json
{
  "matrix": {
  	"type": "Movie",
  	"attr": ["name", "starring", "duration", "directedBy", "releaseYear"],
  	"args": {
 			"id": "tt0133093"
  	}
	}
}
```

— Result :

```json
{
  "data": {
    "matrix": {
      "name": "The Matrix",
      "starring": [
        "Keanu Reeves",
        "Laurence Fishburne",
        "Carrie-Anne Moss",
        "Hugo Weaving"
      ],
      "duration": 136,
      "directedBy": "The Wachowksi Brothers",
      "relaseYear": 1999
    }
  }
}

In this example, we requested for a **Movie** entity with the argument **id: “*tt0133093*”** and asked for the attributes **name**, **starring**, **duration**, **directedBy** and **releaseYear**. And as a result you got an object which contains only what you wanted. *The Matrix*!

### Use Sage in Two Simple Steps

1.  #### Describe your data

    Describe your data by defining a data schema as an entity graph —attributes, acts and relationships— then write the code which maps your schema to your existing business logic.

2.  #### Consume your data

    Access the full capabilities of your data from a single endpoint, ask for what you want and get exactly that, nothing more or less. Work more productive than you thought possible, create apps faster with awareness.



## Why?

### Why invent something new?

Obviously Sage is not the first system to manage client-server interactions. In today’s world there are two dominant architectural styles for client-server interaction: REST and GraphQL.

#### Why not REST?

-   **Fetching complicated object graphs require multiple roundtrips between the client and server to render single views.** For mobile applications operating in variable network conditions, these multiple roundtrips are highly undesirable.
-   **Invariably fields and additional data are added to REST endpoints as the system requirements change.** However, old clients also receive this additional data as well, because the data fetching specification is encoded on the server rather than the client. As result, these payloads tend to grow over time for all clients.
-   **Versioning also complicates a server, and results in code duplication, spaghetti code, or a sophisticated, hand-rolled infrastructure to manage it.**

#### Why not GraphQL?

-   **Adding a query language –and its whole runtime for parsing, validating and executing it– is overkill.** Nowadays developers often write queries programmaticly–not as a string–with helper tools, such as query builders. Most common example is SQL, and also many NoSQL databases provide developer friendly APIs. Why add a new language while there are common formats which can be used for queries and responses? 

-   **Not a good fit for modeling real world data.** Real world data is not for feeding view hierarchies. Data must be expressed and modeled as it is in the real world. GraphQL does not do this naturally, even if we know that it is very suitable for using it with alongside a front-end view library, like React or Vue. 

    Of course, the responsibility of preparing the data for use in view library should be the client library’s which you use for communicating with the API.

