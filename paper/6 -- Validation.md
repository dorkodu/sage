# <a name="validation">6</a> Validation

-   **[6.1 Document](#6.1)**
-   **[6.2 Query](#6.2)**
    -   **[6.2.1 Entity Type](#6.2.1)**
    -   **[6.2.2 Attributes](#6.2.2)**
    -   **[6.2.3 Act](#6.2.3)**
    -   **[6.2.4 Links](#6.2.4)**
    -   **[6.2.5 Arguments](#6.2.5)**

Sage does not just verify if a request is structurally correct, but also ensures that it is unambiguous and mistake‐free in the context of a given Sage schema.

**An invalid request is still technically executable**, and will always produce a stable result as defined by the algorithms in the Execution section, however that result may be ambiguous, surprising, or unexpected relative to a request containing validation errors, **so execution should only occur for valid requests.**

Typically validation is performed in the context of a request immediately before execution, however a Sage service may execute a request without explicitly validating it if that exact same request is known to have been validated before.

>   #### **Example** 
>
>   A request may be validated during development, provided it does not later change, or a service may validate a request once and memoize the result to avoid validating the same request again in the future. Any client‐side or development‐time tool should report validation errors and not allow the formulation or execution of requests known to be invalid at that given point in time.

### Type System Evolution

As Sage type system schema evolve over time by defining new artifacts such as entities and their attributes, acts or links, it is possible that a request which was previously valid could later become invalid. Any change that can cause a previously valid request to become invalid is considered a *breaking change*. 

#### Breaking Changes

Sage services and schema maintainers are encouraged to avoid breaking changes, however in order to be more resilient to these breaking changes, sophisticated Sage services may still allow for the execution of requests which *at some point* were known to be free of any validation errors, and have not changed since.

Unless otherwise noted, maps defined by this specification should not contain any additional fields. Client and server implementations should ignore fields not recognized by this specification.

This section covers the validation rules for Sage queries.

## <a name="6.1">6.1</a> Document

A Sage *document* describes a complete file or request string operated on by a Sage service or client.

*Documents* are only executable by a Sage service if they contain at least one valid *[Query](#6.2)*.

A *document* (known as *request/query document*)…
-   consists from a *map*, which…
    -   must be at the root of every Sage *document*.
    -   defines “top level” of a *document*.
    -   contains at least one or more queries, as key-value pairs, with the following rules :
        -   A **key** must be a unique *string*, name of a *query*.
        -   A **value** must be a *query*.

## <a name="6.2">6.2</a> Query

A *query*…

-   is represented as a *map*.
-   is identified by a *string* name.
    -   Each *query* a Sage *document* contains must be named. When submitting a *document* to a Sage service, the name of the each *query* to be executed must also be provided.
-   contains a number of pre-defined fields.
    -   To have compact *documents*, *field* names are used in their shortened forms.
    -   Implementations may use additional *fields* provided that they do not conflict (by both naming and functionality) with those defined in this specification.

The followings are pre-defined fields of a Sage query.

### <a name="6.2.1">6.2.1</a> Entity Type — `typ`

(required)

#### Possible Values

- *String*
    - Must be the *name* of an Entity type that is defined in the schema.

### <a name="6.2.2">6.2.2</a> Attributes — `atr`

*(optional)*

#### Possible Values

- *Set*
    - Every item in the set…
        - must be a *string*.
        - must be the name of an *attribute* that is defined in the schema.  
- *String* that contains only an asterisk `"*"`
- Empty *array* `[]`
- *Not defined*


### <a name="6.2.3">6.2.3</a> Act — `act`

*(optional)*

#### Possible Values

-   *String*
    -   Must be the name of an act which is defined in the schema.
-   *Not defined*

### <a name="6.2.4">6.2.4</a> Links — `lnk`

*(optional)*

#### Possible Values

- *Map*
    - Must be a map which contains key-value pairs, with the following rules:
        - A **key** must be the *string* name of a link which is defined in the schema.
        - A **value** must be a *set* of strings that contains the names of requested attributes.
            - Those attributes must be defined in the type which the link connects to.
- *Not defined*

### <a name="6.2.5">6.2.5</a> Arguments — `arg`

*(optional)*

#### Possible Values

-   *Map*

    -   Must be a *map* which contains key-value pairs, with the following rules:
        -   A **key** must be the unique *string* name of an argument.

            >   Sage treats arguments of a query as a *mapping* of argument name to value. More than one argument with the same name in an argument set is ambiguous and invalid.

        -   A **value** can be of any type provided that it is valid in Sage’s type system and the output response format.

-   *Not defined*

Interpretation of the possible values for query fields are explained in [Execution](#execution) section.