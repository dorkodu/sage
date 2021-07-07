# <a name="response">8</a> Response

When a Sage server receives a request, it must return a well‐formed response. The server’s response describes the result of executing the requested queries if successful, and describes any errors encountered during the request.

A response may contain both a partial response as well as encountered errors in the case that an attribute error occurred on a attribute which was replaced with **null**.

## <a name="8.1">8.1</a> Response Format

A response to a Sage request must be a *map*.

If the request encountered any errors, the response map must contain an entry with key `errors`. The value of this entry is described in the [Errors](#8.1.2) section. If the request completed without encountering any errors, this entry must not be present.

If the request resulted in execution, the response map must contain an entry with key `data`. The value of this entry is described in the [Data](#8.1.1) section. If the request failed before execution, due to a syntax error, missing information, or validation error, this entry must not be present.

The response map may also contain an entry with key `meta`. This entry, if set, must have a map as its value. This entry is reserved for implementors to extend the protocol and/or just return additional information however they see fit. Hence there are no additional restrictions on its contents.

To ensure future changes to the protocol do not break existing servers and clients, the top level response map must not contain any entries other than the three described above.


### <a name="5.5.1.1">5.5.1.1</a> Data

The `data` entry in the response will be a map of directive names pointing to directives’ execution result objects. If a directive requested for any attributes, its output will be an object of the schema’s specified entity type.

If an error was encountered before execution begins, the `data` entry should not be present in the result.

If an error favorite was encountered during the execution that prevented a valid response, the `data` entry in the response should be `null`.

Here is a valid Sage transaction, in JSON **:**

— Query **:**

```json
{
  "myFavoriteMovie": {
    "type": "Movie",
    "attr": ["name", "releaseYear"],
    "args": {
      "id": "tt0133093";
    }
  }
}	
```

— Response **:**

```json
{
  "data": {
		"myFavoriteMovie": {
 			"name": "The Matrix",
      "releaseYear": 1999
    }
  }
}
```

### <a name="5.5.1.2">5.5.1.2</a> Errors

The `errors` entry in the response is a non‐empty list of errors, where each error is a map.

If no errors were encountered during the requested operation, the `errors` entry should not be present in the result.

If the `data` entry in the response is not present, the `errors` entry in the response must not be empty. It must contain at least one error. The errors it contains should indicate why no data was able to be returned.

If the `data` entry in the response is present (including if it is the value **null**), the `errors` entry in the response may contain any errors that occurred during execution. If errors occurred during execution, it should contain those errors.

#### Error result format

Every error must contain an entry with the key `message` with a string description of the error intended for the developer as a guide to understand and correct the error.

If an error can be associated to a particular point in the requested GraphQL document, it should contain an entry with the key `locations` with a list of locations, where each location is a map with the keys `line` and `column`, both positive numbers starting from `1` which describe the beginning of an associated syntax element.

If an error can be associated to a particular field in the GraphQL result, it must contain an entry with the key `path` that details the path of the response field which experienced the error. This allows clients to identify whether a `null` result is intentional or caused by a runtime error.

This field should be a list of path segments starting at the root of the response and ending with the field associated with the error. Path segments that represent fields should be strings, and path segments that represent list indices should be 0‐indexed integers. If the error happens in an aliased field, the path to the error should use the aliased name, since it represents a path in the response, not in the query.

For example, if fetching one of the friends’ names fails in the following query: