# <a name="execution">7</a> Execution

Sage generates a response from a request via execution.

A request for execution consists of a few pieces of information **:**

-   The [*schema*](#4.1) to use, typically solely provided by the Sage service.

-   A valid *[document](#6.1)*.


Given this information, the result of *[ExecuteRequest()](#7.1.ExecuteRequest())* produces the response, to be formatted according to the [Response](#response) section below.

## <a name="7.1">7.1</a> Executing Requests

To execute a *request*, the executor must have a *[schema](#4.1)* and a parsed *[document](#6.1)* containing *[queries](#6.2)* to run. The result of the request is determined by the result of executing queries according to the [“Executing Queries”](#7.2) section below.

<a name="7.1.0">ExecuteRequest</a> **(** *schema, document* **) :**

1.  Initialize *data* to an empty ordered map.
3.  Let *data* be the result of running the following algorithm *normally* (allowing parallelization) **:**
    1.  For each *query* given in the *document* **:**
        1.  Let *queryName* be the name of *query*.
        2.  Let *queryResult* be the result of [ExecuteQuery](#7.2.0) **(** *schema, query* **)**.
        3.  Set *queryResult* as the value for the key *queryName* in *data*.
4.  Let *errors* be a list of error objects, each represents an error produced while executing the queries.
5.  Return an unordered map containing *data* and *errors*.
    1.  If *errors* is still empty at the end of the execution, return an unordered map containing only *data*.


### <a name="7.1.1">7.1.1</a> Validating Requests

As explained in the [**Validation**](#validation) section, only requests which pass all validation rules should be executed. If validation errors are known, they should be reported in the list of `errors` in the response and the request must fail without execution.

Typically validation is performed in the context of a request immediately before execution, however a Sage service may execute a request without immediately validating it if that exact same request is known to have been
validated before. A Sage service should only execute requests which *at some point* were known to be free of any validation errors, and have since not changed.

>   The request may be validated during development, provided it does not later change, or a service may validate a request **once** and **memoize** the result to avoid validating the same request again in the future.

## <a name="7.2">7.2</a> Executing Queries

To execute a *query*, the executor must have a valid *[schema](#4.1)*; and a parsed, valid *[query](#6.2)* to run. The result of the query is determined by the result of executing it with the following algorithm **:**

<a name="7.2.0">ExecuteQuery</a> **(** *schema, query* **) :**

1.  Let *entityType* be the type in *query*.

    1.  Assert: *entityType* is an Entity type defined in *schema*.

2.  Let *referenceValue* be the result of calling the resolver function with *query* as the parameter.

3.  Let *actName* be the act in *query*.
    1.  If *actName* is defined:
        1.  Run [PerformAct](#7.2.1.1) **(** *entityType, actName, schema, referenceValue* **)**.

4.  Let *attributes* be the set of requested attributes in *query*.
    1.  If *attributes* is defined:
        1.  Let *attributesResult* be the result of [RetrieveAttributes](#7.2.1.2) **(** *entityType, attributes, schema, referenceValue* **)**.

5.  Let *links* be the map of requested links in *query*.

    1.  If *links* is defined:
        1.  Let *linksResult* be the result of [ResolveLinks](#7.2.1.3) **(** *entityType, links, schema, referenceValue* **)**.

  6.  If *attributesResult* is not empty, let *resultMap* be equal to *attributesResult*.

      Otherwise initialize *resultMap* to an empty ordered map.

  7.  If *linksResult* is not empty, set it as the value for the key *$links* in *resultMap*.

      >   *linksResult* are appended as a reserved attribute *‘$links’* to the *resultMap*.

  8.  Return *resultMap*.


### <a name="7.2.1">7.2.1</a> Algorithms for Query Execution

<a name="7.2.1.1">PerformAct</a> **(** *entityType, actName, schema, referenceValue* **) :**

1.  Assert: *actName* is an act defined on *entityType*.
2.  Run the function of *actName* with *referenceValue* as a parameter.

<a name="7.2.1.2">RetrieveAttributes</a> **(** *entityType, attributes, schema, referenceValue* **) :**

1.  Initialize *resultMap* to an empty ordered map.
2.  For each *attributes* as *attributeName*:
    1.  Assert: *attributeName* is an attribute defined on *entityType*.
    2.  Let *attributeValue* be the result of [RetrieveAttribute](#7.3.0) **(** *entityType, attributeName, schema, referenceValue* **)**.

    3.  Set *attributeValue* as the value for the key *attributeName* in *resultMap*.
3.  Return *resultMap*.

>   *resultMap* is ordered by which attributes appear first in the query.

<a name="7.2.1.3">ResolveLinks</a> **(** *entityType, links, schema, referenceValue* **) :**

1.  Inıtialize *resultMap* to an empty ordered map.
2.  For each *links* as **[** *linkName* **:** *linkAttributes* **]** **:**
    1.  Assert: *linkName* is a link defined on *entityType*.
    2.  Let *linkType* be the Entity/Entity Collection type that *linkName* points to.
    4.  Let *linkArguments* be the result of calling the resolver function of *linkName*, which is defined in *schema*, with the parameter *referenceValue*.
    5.  Let *linkQuery* be a Sage query as follows **:**
        -   **type:** *linkType*
        -   **attributes:** *linkAttributes*
        -   **arguments:** *linkArguments*
    6.  Let *linkResult* be the result of [ExecuteQuery](#7.2.0) **(** *schema, linkQuery* **)**.
    7.  Set *linkResult* as the value for the key *linkName* in *resultMap*.
3.  Return *resultMap*.

## <a name="7.3">7.3</a> Data Retrieval and Resolution

Each attribute requested in the attribute set that is defined on the selected *entityType* will result in an entry in the response map. Retrieval first resolves a value for the attribute, and then completes that value.

<a name="7.3.0">RetrieveAttribute</a>  **(** *entityType, attributeName, schema, referenceValue* **) :**

1.  Let *resolvedValue* be the result of [ResolveAttributeValue](#7.3.1.1) **(** *entityType, attributeName, referenceValue* **)**.
2.  Return the result of [CompleteValue](#7.3.1.2) **(** *entityType, attributeName, resolvedValue, schema* **)**.

### <a name="7.3.1">7.3.1</a> Value Resolution

While nearly all of Sage execution can be described generically, ultimately the internal system exposing the Sage interface must provide values. This is exposed via *ResolveAttributeValue*, which produces a value for a given attribute on an Entity type for a real value.

As an example, this might accept the Entity type `Person`, the field `age`, and the *referenceValue* representing *Doruk Eray*. It would be expected to yield the value *17*.

<a name="7.3.1.1">ResolveAttributeValue</a> **(** *entityType, attributeName, referenceValue* **) :**

1.  Let *resolver* be the resolver function of *attributeName*, which is defined on *entityType*.
2.  Return the result of calling *resolver*, with the parameter *referenceValue*.

It is common for resolver to be asynchronous due to relying on reading an underlying database or networked service to produce a value. This necessitates the rest of a Sage executor to handle an asynchronous execution flow.

