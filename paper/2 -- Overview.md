# <a name="overview">2</a> Overview

Sage is a query-based, entity-focused data exchange protocol designed to simplify the communication for data interactions between different layers of software by providing a simple & lightweight but efficient, expressive and intuitive way.

The primary goal was to develop a simpler way for designing and building powerful **APIs**.

For example, here is a sample Sage transaction *(request and response for a query)* **:**

— Query **:**

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
      "duration": 136,
      "directedBy": "The Wachowksi Brothers",
      "relaseYear": 1999
    }
  }
}
```

In this example, we requested for a `Movie` entity with the argument `id: "tt0133093"` and asked for the attributes `name`, `starring`, `duration`, `directedBy` and `releaseYear`. And as a result you got an object which contains only what you wanted.