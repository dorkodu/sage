# <a name="response">8</a> Response

-   **[8.1 Response Format](#8.1)**
    -   **[8.1.1 Data](#8.1.1)**
    -   **[8.1.2 Errors](#8.1.2)**
-   **[8.2 Serialization Format](#8.2)**
    -   **[8.2.1 JSON Serialization](#8.2.1)**
    -   **[8.2.2 Serialized Map Ordering](#8.2.2)**

When a Sage server receives a request, it must return a well‐formed response. The server’s response describes the result of executing the requested queries if successful, and describes any errors encountered during the request.

A response may contain both a partial response as well as encountered errors in the case that an attribute error occurred on a attribute which was replaced with **null**.

## <a name="8.1">8.1</a> Response Format

A response to a Sage request must be a *map*.

If the request encountered any errors, the response map must contain an entry with key `errors`. The value of this entry is described in the [Errors](#8.1.2) section. If the request completed without encountering any errors, this entry must not be present.

If the request resulted in execution, the response map must contain an entry with key `data`. The value of this entry is described in the [Data](#8.1.1) section. If the request failed before execution, due to a syntax error, missing information, or validation error, this entry must not be present.

The response map may also contain an entry with key `meta`. This entry, if set, must have a map as its value. This entry is reserved for implementors to extend the protocol and/or just return additional information however they see fit. Hence there are no additional restrictions on its contents.

To ensure future changes to the protocol do not break existing servers and clients, the top level response map must not contain any entries other than the three described above.

>   When `errors` is present in the response, it may be helpful for it to appear first when serialized to make it more clear when errors are present in a response during debugging.

### <a name="8.1.1">8.1.1</a> Data

The `data` entry in the response will be the result of the execution of the request.

If an error was encountered before execution begins, the `data` entry should not be present in the response.

If an error was encountered during the execution that prevented a valid response, the `data` entry in the response should be `null`.

### <a name="8.1.2">8.1.2</a> Errors

The `errors` entry in the response is a non‐empty list of errors, where each error is a map.

If no errors were encountered during the request, the `errors` entry should not be present in the response.

If the `data` entry in the response is not present, the `errors` entry in the response must not be empty. It must contain at least one error. The errors it contains should indicate why no data was able to be returned.

If the `data` entry in the response is present (including if it is the value **null**), the `errors` entry in the response may contain any errors that occurred during execution. If errors occurred during execution, it should contain those errors.

#### Error Result Format

Every error must contain an entry with the key `message` with a string description of the error intended for the developer as a guide to understand and correct the error.

If an error can be associated with a particular query and field—such as `atr`, `act` or `lnk`—in the Sage response, it must contain a a list of maps with the key `location`, which contains the keys `query`, `field` to describe the location of the response entry which experienced the error. and optionally `meta`,  

This allows clients to identify whether a `null` result is intentional or caused by a runtime error.

For example, if fetching *age* of Neo fails in the following query**:**

```json
{
	"neo": {
    "typ": "Character",
    "atr": ["name", "age"],
    "arg": {
      "character.id": 1
    }
	} 
}
```

The response might look like :

```json
{
  "errors": [
    {
      "message": "Age for character with ID 1 could not be fetched.",
      "location": [
        {
        	"query": "neo",
        	"field": "atr",
          "meta": {
            "value": "age"
          }
      	}
    	]
    }
  ],
  "data": {
    "neo": {
      "name": "Neo",
      "age": null
    }
  }
}
```

Sage services may provide an additional entry to errors with key `meta`. This entry, if set, must have a map as its value. This entry is reserved for implementors to attach additional information to errors however they see fit, and there are no additional restrictions on its contents.

```json
{
  "errors": [
    {
      "message": "Age for character with ID 1 could not be fetched.",
      "location": [
        {
        	"query": "neo",
        	"field": "atr",
          "meta": {
            "value": "age"
          }
      	}
      ],
      "meta": {
        "code": "CAN_NOT_FETCH_BY_ID",
        "timestamp": "Thu Jul 8 15:40:09 UTC 2021"
      }
    }
  ]
}
```

Sage services should not provide any additional entries to the error format since they could conflict with additional entries that may be added in future versions of this specification.

## <a name="8.2">8.2</a> Serialization Format

Sage does not require a specific serialization format. However, clients should use a serialization format that supports the major primitives in the Sage response. In particular, the serialization format must at least support representations of the following four primitives :

-   Map
-   List
-   String
-   Null

An ideal serialization format should also support the following primitives, each representing one of the common Sage scalar types, however a string or simpler primitive may be used as a substitute if any are not directly supported:

-   Boolean
-   Int
-   Float

This is not meant to be an exhaustive list of what a serialization format may encode. For example custom scalars representing a Date, Time, URI, or number with a different precision may be represented in whichever relevant format a given serialization format may support.

### <a name="8.2.1">8.2.1</a> JSON Serialization

JSON is the recommended serialization format for Sage. Though as mentioned above, Sage does not require a specific serialization format.

When using JSON as a serialization of Sage responses, the following JSON values should be used to encode the related Sage values:

| Sage Value | JSON Value            |
| ---------- | --------------------- |
| Map        | Object                |
| List       | Array                 |
| Null       | **null**              |
| String     | String                |
| Boolean    | **true** or **false** |
| Int        | Number                |
| Float      | Number                |

For consistency and ease of notation, examples of responses are given in JSON format throughout this document.

### <a name="8.2.2">8.2.2</a> Serialized Map Ordering

Since the result of evaluating an artifact *(attribute or link)* set of a queried Entity is ordered, the serialized Map of results should preserve this order by writing the map entries in the same order as those attributes were requested as defined by query execution.

>   Producing a serialized response where fields are represented in the same order in which they appear in the request improves human readability during debugging and enables more efficient parsing of responses if the order of properties can be anticipated.

Serialization formats which represent an ordered map should preserve the order of requested artifacts. Serialization formats which only represent unordered maps but where order is still implicit in the serialization’s textual order (such as JSON) should preserve the order of requested fields textually.

For example, if the requested attributes were `["name", "age"]`, a Sage service responding in JSON should respond with `{ "name": "Doruk", "age": 17 }` and should not respond with `{ "age": 17, "name": "Doruk" }`.

While JSON Objects are specified as an [unordered collection of key‐value pairs](https://tools.ietf.org/html/rfc7159#section-4) the pairs are represented in an ordered manner. In other words, while the JSON strings `{ "name": "Doruk", "age": 17 }` and `{ "age": 17, "name": "Doruk" }` encode the same value, they also have observably different property orderings.

This does not violate the JSON spec, as clients may still interpret objects in the response as unordered Maps and arrive at a valid value.