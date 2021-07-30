# <a name="overview">2</a> Overview

Sage is an open protocol for query-based, entity-focused data exchange, and is designed to simplify the communication for data interactions between different layers of software.

The primary goal was to develop a **simple & lightweight** but **efficient**, **expressive** and **intuitive** way for designing and building powerful **APIs**.

For example, here is a sample Sage transaction *(request and response for a query)* **:**

— Query **:**

```json
{
  "matrix": {
  	"typ": "Movie",
  	"atr": ["name", "starring", "directedBy", "releaseYear"],
  	"arg": {
 			"id": "tt0133093"
  	}
	}
}
```

— Result **:**

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
      "directedBy": "The Wachowksis",
      "relaseYear": 1999
    }
  }
}
```

In this example, we requested for a `Movie` entity with the argument `id: "tt0133093"` and asked for the attributes `name`, `starring`, `directedBy` and `releaseYear`. And as a result you got a document which contains the result object of your query, only what you wanted.

Sage is an application-level protocol used by clients and services which have capabilities defined in this specification to interact with each other and exchange data. Sage does not mandate a particular transport, programming language or storage technique for application services that implement it. Instead, application services take their capabilities and map them to a uniform data exchange layer, type system, and embrace the philosophy which Sage introduces.

This offers a unified way friendly to product development.