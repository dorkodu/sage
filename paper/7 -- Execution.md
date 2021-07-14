# <a name="execution">7</a> Execution

Sage generates a response from a request via execution.

A request for execution consists of a few pieces of information **:**

-   The [*schema*](#4.1) to use, typically solely provided by the Sage service.

-   A valid *[document](#6.1)*.


Given this information, the result of *[ExecuteRequest()](#7.1.ExecuteRequest())* produces the response, to be formatted according to the [Response](#response) section below.

## <a name="7.1">7.1</a> Executing Requests

To execute a *request*, the executor must have a *[schema](#4.1)* and a parsed *[document](#6.1)* containing *[queries](#6.2)* to run. The result of the request is determined by the result of executing queries according to the [“Executing Queries”](#7.2) section below.

<a name="7.1.ExecuteRequest()">ExecuteRequest</a> **(** *schema, document* **) :**

1.  Initialize *data* to an empty ordered map.
3.  Let *data* be the result of running the following algorithm *normally* (allowing parallelization) **:**
    1.  For each *query* given in the *document* **:**
        1.  Let *queryName* be the name of *query*.
        2.  Let *queryResult* be the result of [ExecuteQuery](#7.2.ExecuteQuery()) **(** *schema, query* **)**.
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

<a name="7.2.ExecuteQuery()">ExecuteQuery</a> **(** *schema, query* **) :**

1.  Let *entityType* be the type in *query*.

    1.  Assert: *entityType* is a validly defined Entity type in *schema*.

2.  Let *actName* be the act in *query*.
    1.  If *actName* is defined:
        1.  Run [PerformAct](#7.2.PerformAct()) **(** *entityType, actName, schema, query* **)**.

3.  Let *attributeSet* be the set of requested attributes in *query*.
    1.  If *attributeSet* is defined:
        1.  Let *attributes* be the result of [RetrieveAttributes](#7.2.RetrieveAttributes()) **(** *entityType, attributeSet, schema, query* **)**.

4.  Let *linksMap* be the map of requested links in *query*.

    1.  If *linksMap* is defined:
        1.  Let *links* be the result of [ResolveLinks](#7.2.RetrieveLinks()) **(** *entityType, linksMap, schema, query* **)**.

  5.  If *attributes* is not empty, let *resultMap* be equal to *attributes*. Otherwise initialize *resultMap* to an empty ordered map.

  6.  If *links* is not empty, set it as the value for the key *$links* in *resultMap*.

  7.  Return *resultMap*.

      >   *resultMap* is ordered by which attribute appear first in the query. Then, *links* are appended to the *resultMap*.

### <a name="7.2.1">7.2.1</a> Algorithms for Query Execution

#### <a name="7.2.1.1">PerformAct</a> ( *entityType, actName, schema, query* ) :

1.  Assert: *actName* is a validly defined act on *entityType*.
2.  Run the function of *actName* with *query* as a parameter.

