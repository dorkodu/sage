# <a name="response">8</a> Response

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

If an error can be associated with a particular query and requested artifact—such as attribute, act or link—in the Sage response, it must contain a map with the key `location`, which contains the keys `query` and one of [ `attribute`, `act`, `link` ] which describes the location of the response entry which experienced the error. 

This allows clients to identify whether a `null` result is intentional or caused by a runtime error.

For example, if fetching *age* of Neo fails in the following query :

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
      "location": {
        "query": "neo",
        "attribute": "age"
      }
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
      "location": {
        "query": "neo",
        "attribute": "age"
      },
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


If an error can be associated to a particular point in the requested GraphQL document, it should contain an entry with the key `locations` with a list of locations, where each location is a map with the keys `line` and `column`, both positive numbers starting from `1` which describe the beginning of an associated syntax element.

If an error can be associated to a particular field in the GraphQL result, it must contain an entry with the key `path` that details the path of the response field which experienced the error. This allows clients to identify whether a `null` result is intentional or caused by a runtime error.

This field should be a list of path segments starting at the root of the response and ending with the field associated with the error. Path segments that represent fields should be strings, and path segments that represent list indices should be 0‐indexed integers. If the error happens in an aliased field, the path to the error should use the aliased name, since it represents a path in the response, not in the query.

For example, if fetching one of the friends’ names fails in the following query: