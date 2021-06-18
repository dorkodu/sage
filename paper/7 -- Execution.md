## <a name="execution">5.4</a> Execution

Sage generates a response from a request via execution.

A request for execution consists of a few pieces of information **:**

-   The [*Schema*](#5.1.1) to use, typically solely provided by the Sage service.

-   A valid *[Query Document](#Document)*.

-   An initial value corresponding to the root type being executed. Conceptually, an initial value represents the “universe” of data available via a Sage service. It is common for a Sage service to always use the same initial value for every request.

    [^WHY]: Why there is an initial value?

Given this information, the result of [ExecuteRequest](#ExecuteRequest())() produces the response, to be formatted according to the [Response](#response) section below.

### <a name="5.4.1">5.4.1</a> Executing Requests

To execute a request, the executor must have a parsed a [Query Document](#).

[^TODO]: Write the algorithm for request execution.

**ExecuteRequest (** *schema, query* **)** **:**

  * For every query item found in *query* **ExecuteQueryItem**( *schema, queryItem* ).

#### Validating Requests

As explained in the Validation section, only requests which pass all validation rules should be executed. If validation errors are known, they should be reported in the list of "**errors**" in the response and the request must fail without execution.

Typically validation is performed in the context of a request immediately before execution, however a Sage service may execute a request without immediately validating it if that exact same request is known to have been
validated before. A Sage service should only execute requests which *at some point* were known to be free of any validation errors, and have since not changed.

>   The request may be validated during development, provided it does not later change, or a service may validate a request **once** and **memoize** the result to avoid validating the same request again in the future.

### <a name="5.4.2">5.4.2</a> Executing Query Items

The type system, as described in the “Type System” section of this document, must provide a query root object type. If mutations or subscriptions are supported, it must also provide a mutation or subscription root object type, respectively.

An initial value may be provided when executing a query.

[**ExecuteQuery**](#5.4.1) **(** *query **,** schema* **)**

1.  Let queryType be the root Query type in schema.
2.  Assert: queryType is an Object type.
3.  Let selectionSet be the top level Selection Set in query.
4.  Let data be the result of running [ExecuteSelectionSet](#ExecuteSelectionSet())(selectionSet, queryType, initialValue, variableValues) *normally* (allowing parallelization).
5.  Let errors be any *field errors* produced while executing the selection set.
6.  Return an unordered map containing data and errors.

#### [6.2.2](#sec-Mutation)Mutation

If the operation is a mutation, the result of the operation is the result of executing the mutation’s top level selection set on the mutation root object type. This selection set should be executed serially.

It is expected that the top level fields in a mutation operation perform side‐effects on the underlying data system. Serial execution of the provided mutations ensures against race conditions during these side‐effects.

[ExecuteMutation](#ExecuteMutation())(mutation, schema, variableValues, initialValue)

1.  Let mutationType be the root Mutation type in schema.
2.  Assert: mutationType is an Object type.
3.  Let selectionSet be the top level Selection Set in mutation.
4.  Let data be the result of running [ExecuteSelectionSet](#ExecuteSelectionSet())(selectionSet, mutationType, initialValue, variableValues) *serially*.
5.  Let errors be any *field errors* produced while executing the selection set.
6.  Return an unordered map containing data and errors.

## 