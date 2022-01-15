<img src="../../resources/sage-dark.png" alt="Sage Logo" style="width: 60%; margin: 0 auto;"/>

# Sage

*July 2021 — Proposal* *(Work In Progress)*

#### **`Author`**
 **Doruk Eray**
 Founder and Chief @ [Dorkodu](https://dorkodu.com).
 Self-taught Software Engineer.

 Website**:** [doruk.dorkodu.com](https://doruk.dorkodu.com)
 Email**:** [doruk@dorkodu.com](mailto:doruk@dorkodu.com)

---

## [§](#) Contents

-   **[1 Introduction](#introduction)**
-   **[2 Overview](#overview)**
-   **[3 Principles and Concepts](#principles-and–concepts)**
    -   **[3.1 Principles](#3.1)**
    -   **[3.2 Concepts](#3.2)**
        -   **[3.2.1 Type System](#3.2.1)**
        -   **[3.2.2 Unified Query Layer](#3.2.2)**
-   **[4 Type System](#type-system)**
    -   **[4.1 Schema](#4.1)**
    -   **[4.2 Types](#4.2)**
        -   **[4.2.1 Scalar Types](#4.2.1)**
        -   **[4.2.2 Object](#4.2.2)**
        -   **[4.2.3 List](#4.2.3)**
        -   **[4.2.4 Entity](#4.2.4)**
        -   **[4.2.5 Entity Collection](#4.2.5)**
    -   **[4.3 Constraints](#4.3)**
        -   **[4.3.1 Strict Types](#4.3.1)**
        -   **[4.3.2 Non-Null](#4.3.2)**
    -   **[4.4 Documentation](#4.4)**
        -   **[4.4.1 Description](#4.4.1)**
        -   **[4.4.2 Deprecation](#4.4.2)**
-   **[5 Introspection](#introspection)**
    -   **[5.1 Schema Introspection](#5.1)**
-   **[6 Validation](#validation)**
    -   **[6.1 Document](#6.1)**
    -   **[6.2 Query](#6.2)**
        -   **[6.2.1 Entity Type](#6.2.1)**
        -   **[6.2.2 Attributes](#6.2.2)**
        -   **[6.2.3 Act](#6.2.3)**
        -   **[6.2.4 Links](#6.2.4)**
        -   **[6.2.5 Arguments](#6.2.5)**
-   **[7 Execution](#execution)**
    -   **[7.1 Executing Requests](#7.1)**
        -   **[7.1.1 Validating Requests](#7.1.1)**
    -   **[7.2 Executing Queries](#7.2)**
        -   **[7.2.1 Algorithms for Query Execution](#7.2.1)**
    -   **[7.3 Data Retrieval and Resolution](#7.3)**
        -   **[7.3.1 Value Resolution](#7.3.1)**
        -   **[7.3.2 Value Completion](#7.3.2)**
        -   **[7.3.3 Errors and Non-Nullability](#7.3.3)**
-   **[8 Response](#response)**
    -   **[8.1 Response Format](#8.1)**
        -   **[8.1.1 Data](#8.1.1)**
        -   **[8.1.2 Errors](#8.1.2)**
    -   **[8.2 Serialization Format](#8.2)**
        -   **[8.2.1 JSON Serialization](#8.2.1)**
        -   **[8.2.2 Serialized Map Ordering](#8.2.2)**
-   **[9 References](#references)**
    -   **[9.1 Links](#9.1)**
    -   **[9.2 Reference Implementations](#9.2)**
    -   **[9.3 Other](#9.3)**


# <a name="introduction">1</a> Introduction

This is the specification for Sage; an open protocol for query-based data exchange and a runtime for executing those queries with your existing business logic and data. Sage is originally created at Dorkodu especially for APIs, to simplify the communication for data interactions between different layers of software. 

Sage is a new and evolving protocol, and is not complete. Significant enhancement will continue in future editions of this specification. The development of this open standard started in 2020.

The latest working draft of this protocol can be found on [Sage’s website](https://libre.dorkodu.com/sage/).

### Copyright Notice

Copyright © 2020-present, [Dorkodu](https://dorkodu.com)

### Disclaimer

Your use of this “Specification” may be subject to other third party rights. THIS SPECIFICATION IS PROVIDED “AS IS.” The contributors expressly disclaim any warranties (express, implied, or otherwise), including implied warranties of merchantability, non-infringement, fitness for a particular purpose, or title, related to the Specification. The entire risk as to implementing or otherwise using the Specification is assumed by the Specification implementer and user. IN NO EVENT WILL ANY PARTY BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY CAUSES OF ACTION OF ANY KIND WITH RESPECT TO THIS SPECIFICATION OR ITS GOVERNING AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### Conformance

A conforming implementation of Sage must fulfill all normative requirements. Conformance requirements are described in this document via both descriptive assertions and key words with clearly defined meanings.

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative portions of this document are to be interpreted as described in [IETF RFC 2119](https://tools.ietf.org/html/rfc2119). These key words may appear in lowercase and still retain their meaning unless explicitly declared as non‐normative.

A conforming implementation of Sage may provide additional functionality, but must not where explicitly disallowed or would otherwise result in non‐conformance.

#### Conforming Algorithms

Algorithm steps phrased in imperative grammar (e.g. “Return the result of calling resolver”) are to be interpreted with the same level of requirement as the algorithm it is contained within. Any algorithm referenced within an algorithm step (e.g. “Let completedResult be the result of calling CompleteValue()”) is to be interpreted as having at least the same level of requirement as the algorithm containing that step.

Conformance requirements expressed as algorithms can be fulfilled by an implementation of this specification in any way as long as the perceived result is equivalent. Algorithms described in this document are written to be easy to understand. Implementers are encouraged to include equivalent but optimized implementations.

### Non-normative Portions

All contents of this document are normative except portions explicitly declared as non‐normative.

> This is an example of a non-normative explanation, or author’s opinion.

Examples in this document are non‐normative, and are presented to help understanding of introduced concepts and the behavior of normative portions of the specification. Examples are either introduced explicitly in prose (e.g. “for example”) or are set apart in example or counter‐example blocks, like these :

```js
// This is an example of a non-normative code sample.
console.log("Hello, World!");
```

Code examples are for providing real-life samples, but does not have to be from a real implementation. We created reference implementations, and highly recommend you checking out them.

> #### Example
>
> This is an example of a non-normative example.

Notes in this document are non‐normative, and are presented to clarify intent, draw attention to potential edge‐cases and pit‐falls, and answer common questions that arise during implementation. Notes are either introduced explicitly in prose (e.g. “**Note :**“) or are set apart in a note block, like this:

> #### Note
>
> This is an example of a non‐normative note.
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
# <a name="principles-and-concepts">3</a> Principles and Concepts

-   **[3.1 Principles](#3.1)**
-   **[3.2 Concepts](#3.2)**
    -   **[3.2.1 Type System](#3.2.1)**
    -   **[3.2.2 Unified Query Layer](#3.2.2)**

## <a name="3.1">3.1</a> Principles

Our priority is to keep Sage *simple*, *approachable*, *easy-to-use* and *lightweight* while solving the major problems *efficiently* and providing a *flexible* & *intuitive* way. 

Sage has some design principles :

- ### Environment Agnostic

    Sage is completely environment agnostic, it **never dictates** the use of *any programming language, backend, storage technique or even a query language like SQL, GraphQL or SPARQL*. Instead, Sage focuses on concepts and patterns that are achievable **no matter how you're building a service.** Although every language and every Sage implementation does things slightly differently.

    Sage is just a specification about designing and building powerful APIs; from design, to architecture, to implementation, and even documentation.

- ### Query-based Data Exchange

    Sage is ***query-based***, which is the ideal way for data interactions. You query your data, by *declaring the attributes you want, and arguments for conditions*, then get only what you want. You can also call remotely your Sage service to do something, by adding an **act** to your query.

    Any data consumption and creation process imaginable can be implemented with Sage. Especially in product applications, it would be a mindful choice to consume a Sage based API.

- ### Entity-focused, Flexible Type System

    Every Sage server defines an application‐specific type system, and queries are executed within the context of it. A Sage instance publishes its data capabilities with an entity-focused schema, which determines what its clients are allowed to consume. Clients should be able to specify exactly how it will consume that data. These queries are specified at attribute‐level granularity.

    Sage performs operations *(e.g. data retrieval or modification)* on a specific *“entity type”* . An entity type can be considered like a "class" in *OOP*, with attributes *(or properties)* and acts *(or methods)* are defined on this *entity type*.

    #### Flex Types and Constraints

    Sage is *flex-typed*. By default, all values can be of any type within the Sage’s type system. However, we also know that sometimes *strict-typing* is desperately needed, or at least useful. Thus, Sage offers a concept called *constraints*, which you can set for attributes to ensure their values will be of a specific type. This is why Sage can be both *flexible* and *powerful* at the same time.

- ### Application-level Protocol

    Sage is an application-layer protocol and does not require or dictate a particular transport. It is a standard about how clients & services interact and exchange data, in a query-based and entity-focused way.

- ### Product-centric

    Sage is primarily designed to solve *data interaction* problems in product engineering. The main goal is to provide an *intuitive*, *neat*, *lightweight* and *easily applicable framework* for *simplifying the data exchange process* and easing the burden on developers and their application architectures. For this reason, Sage offers a natural way for *describing* *data requirements* and *consuming data capabilities*.

- ### Graph-like

    Most data-driven apps today focus on creation, consumption and evolution of their data. So with Sage you can describe your data as **entities** –with their *attributes*, *acts*– and their *links*, which is like a *graph* data structure. To achieve harmony with the structure of these applications, a Sage query is highly granular, which means you can determine the exact attributes, acts and links of an entity to work on.

## <a name="3.2">3.2</a> Concepts

Here we introduce some concepts and terms which you will need to understand well in order to learn more deeply about Sage.

### <a name="3.2.1">3.2.1</a> Type System

#### Schema

Your Sage server’s data capability is defined by its data schema, which is just a set of defined types you want to be available to the consumers of your service. Schema will be passed to Sage’s query executor. Any query document given to the execution engine will be run on this schema you define.

#### Entity

Entities are at the core of Sage’s type system. You define your data as entities.

Each entity can have any number of ***attributes***, **acts** and **links**. *Attributes* are **key-value pairs**, *acts* are **methods/functions**—which you can remotely call in your query to do something, *e.g. updating the database.*— and *links* represent **relationships** between entity types.

- ##### **Attribute**

    An attribute describes a property of an entity, which…

    - can be of *any of the types* defined within Sage’s type system *(We will explain this in [Type System](#type-system))*
    - will be retrieved by a function defined by the service developer, and Sage will pass the query object as a parameter.

    > Sage **does not** dictate that a resolver function will receive the query object as the *only* parameter. If your implementation has additional functionality which requires to pass another parameter, you can do it.
    >
    > 
    >
    > **For example:** In our PHP implementation, you can define an optional ‘context’ array which you can use as a simple dependency container. Sage will pass that context value to resolver and act functions.
    
    This is an example query of adding a to-do, for the sake of simplicity :
    
- ##### Act

    An act is a function *(just like a method in OOP)* defined in an entity type, which is identified by a string name.

    You can write your business logic as acts, and trigger any of them by calling it from a query.

    This is an example query of adding a to-do, for the sake of simplicity :

    ```json
    {
      "AddToDo": {
        "typ": "ToDo",
        "act": "addToDo",
        "atr": ["id", "title", "isCompleted"],
        "lnk": {
        	"owner": ["id", "username", "name"]
     		},
        "arg": {
          "ownerId": 5,
          "title": "Finish Sage's Whitepaper.",
          "deadline": "2021-05-20"
        }
      }
    }
    ```

    This sample will add a to-do with given arguments, and *then* return the desired artifacts. 

    Here is the result **:**

    ```json
    {
      "AddToDo": {
        "id": 109264,
        "title": "Finish Sage's Whitepaper.",
        "isCompleted": false,
        "deadline": "2021-06-27",
        "$links": {
          "owner": {
          	"id": 5,
          	"username": "doruk",
          	"name": "Doruk Eray"
        	}
        }
      }
    }
    ```

    > Sage does not handle these steps automatically. It’s the developer who writes the code required to save this To-do item to data storage, and retrieve these attributes.

- ##### Link

    A link represents a *named*, *to-one* or *to-many* *relationship* between two Entity types, which…

    - is identified by a string name that must be unique within the scope of an Entity type.
    - requires an Entity/Entity Collection type to be specified, that the link’s parent type is related to.

### <a name="3.2.2">3.2.2</a> Unified Query Layer

Sage is a query-based approach for data exchange.

The client requests the data it needs from a Sage service with a structured query document that is created according to certain rules. Basically, a query document contains a list of queries all of which describes an entity instance needed, with no limit on the number of queries.

But how to query?

> Sage **does not** have a *special query language*.
>
> We think it is *unnecessary* to add this burden while being able to use one of the common formats. So we decided to use ***JSON***, which has advantages such as being *universal, lightweight and easy to use*. Also, JSON is commonly used in the software ecosystem, which means it has wide support *(such as tools, helper libraries)* on different languages and platforms.
>
> Thus, the query and the result are expressed using the JSON format. By using a universal format and not inventing a new query language, we keep Sage lightweight, easily approachable and implementable.
>
> But of course, you can use another format for query and response documents (see [Response](#response)).

Each query must be identified with a string name which must be unique in the query document, and expressed as a map which the name points to.

*— Below here is an example query, requesting a single entity :*

```json
{
  "doruk": {
    "typ": "User",
    "atr": ["name", "email", "age"],
    "lnk": {
      "school": ["name"]
    },
    "arg": {
      "handle": "@doruk"
    }
  }
}
```

*— Response :*

```json
{
  "data": {
    "doruk": {
      "name": "Doruk Eray",
      "email": "doruk@dorkodu.com",
      "age": 16,
      "$links": {
        "school": {
          "name": "Vefa High School",
        }
      }
    }
  }
}
```

## So…

Because of these principles, Sage is a simple-to-use, flexible, lightweight but also powerful and productive way for designing and building an application-centric data exchange layer. Product developers can create applications a lot more effectively and faster by working with a Sage API. Sage can quickly make your application stack enjoyable to work with.

In this section we only introduced some concepts. You can find the details about the components of Sage in the following sections of this specification.

> This specification (we call it *the Paper*) serves as a reference for engineers who will, or want to, implement Sage. It describes the protocol, concepts, rules and components. The goal of this document is to provide a foundation and framework for Sage. 
>
> We look forward to work with the community to improve this standard. 


#  <a name="type-system">4</a> Type System

-   **[4.1 Schema](#4.1)**
-   **[4.2 Types](#4.2)**
    -   **[4.2.1 Scalar Types](#4.2.1)**
    -   **[4.2.2 Object](#4.2.2)**
    -   **[4.2.3 List](#4.2.3)**
    -   **[4.2.4 Entity](#4.2.4)**
    -   **[4.2.5 Entity Collection](#4.2.5)**
-   **[4.3 Constraints](#4.3)**
    -   **[4.3.1 Strict Types](#4.3.1)**
    -   **[4.3.2 Non-Null](#4.3.2)**
-   **[4.4 Documentation](#4.4)**
    -   **[4.4.1 Description](#4.4.1)**
    -   **[4.4.2 Deprecation](#4.4.2)**

Sage type system describes the capabilities of a Sage service and is used to determine if a query is valid and how to response to it.

## <a name="4.1">4.1</a> Schema

A Sage service’s data capabilities are referred to as that service’s “*schema*”.

A *schema* is defined as a set of types it supports.

A Sage *schema* must itself be internally valid.

All entity types defined within a Sage *schema* must have *unique, string names*. No two provided entity types may have the same name. No provided type may have a name which conflicts with any built in types.

All artifacts *(entities; their attributes, acts and links)* defined within a schema must not have a name which begins with **`@`** *(commercial at)* or **`$`** *(dollar sign)*, as these are used exclusively for Sage’s type system internals.

## <a name="4.2">4.2</a> Types

The fundamental unit of any Sage schema is the *type*.

### <a name="4.2.1">4.2.1</a> Scalar Types

The most basic type is a *Scalar*.

Scalar types represent primitive values *(e.g. integer)* in the Sage type system.

All Sage scalars are representable as strings, though depending on the response format being used, there may be a more appropriate primitive for the given scalar type, and if so, server should use those types.

##### Result Coercion

A Sage server, when resolving the value of a given scalar type, must uphold the contract the scalar type describes, either by coercing the value or producing an *attribute error* if a value cannot be coerced or if coercion may result in data loss.

A Sage service may decide to allow coercing different internal types to the expected return type. For example when coercing an attribute of *integer* type, *a* boolean `true` value may produce `1` , or a *string* value `"123"` may be parsed as *base‐10* `123`. However if internal type coercion cannot be reasonably performed without losing information, then it must raise an *attribute error*.

Since this coercion behavior is not observable to clients of a Sage service, the precise rules of coercion are left to the implementation. The only requirement is that a Sage service must yield values which adhere to the expected Scalar type.

Sage supports a basic set of well‐defined Scalar types. A Sage service should support all of these types, and if provides a type by these names, it must adhere to the behavior described below.

> By default, all attributes are **flex-typed**, which means their values can be any type defined in Sage’s type system, provided that they are valid in the output response format.
>
> Also we have a concept called **“constraints”**. Oftentimes it is useful to add a constraint to an attribute, like **strict-type**. For example, strict-type constraint allows the schema to specify exactly which data type is strictly expected from a specific attribute.

#### Integer

The integer scalar type represents a signed 32‐bit numeric non‐fractional value. Response formats that support a 32‐bit integer or a number type should use that type to represent this scalar.

##### Result Coercion

Attributes returning the *integer* type expect to encounter **32‐bit** integer internal values. 

Sage servers may coerce non‐integer internal values to integers when reasonable without losing information, otherwise they must raise an *attribute error*. Examples of this may include returning `1` for the floating‐point number `1.0`, or returning `123` for the string `"123"`. In scenarios where coercion may lose data, raising an attribute error is more appropriate. For example, a floating‐point number `1.2` should raise an attribute error instead of being truncated to `1`.

If the integer internal value represents a value less than **-2^31^** or greater than or equal to **2^31^**, an attribute error should be raised.

>   #### Note
>
>   Numeric integer values larger than 32‐bit can use string type, as not all platforms and transports support encoding integer numbers larger than 32‐bit.

#### Float

The float scalar type represents signed double‐precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). Response formats that support an appropriate double‐precision number type should use that type to represent this scalar.

##### Result Coercion

Attributes returning the *float* type expect to encounter double‐precision floating‐point internal values.

Sage servers may coerce non‐floating‐point internal values to *float* when reasonable without losing information, otherwise they must raise an *attribute error*. Examples of this may include returning `1.0` for the integer number `1`, or `123.0` for the string `"123"`.

#### String

The string scalar type represents textual data, represented as UTF‐8 character sequences. The string type is generally used to represent free‐form human‐readable text. All response formats must support string representations, and that representation must be used here.

##### Result Coercion

Attributes returning the *string* type expect to encounter UTF‐8 string internal values.

Sage servers may coerce non‐string raw values to string when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning the string `"true"` for a boolean true value, or the string `"1"` for the integer `1`.

#### Boolean

The boolean scalar type represents `true` or `false`. Response formats should use a built‐in boolean type if supported; otherwise, they should use their representation of the integers `1` and `0`.

##### Result Coercion

Attributes returning the *boolean* type expect to encounter boolean internal values.

Sage servers may coerce non‐boolean raw values to *boolean* when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning `true` for non‐zero numbers.

### <a name="4.2.2">4.2.2</a> Object

A Sage Object…
-   represents a set of named fields
    -   each of which yield a value of a valid type within the Sage type system. 
-   should be serialized as a map
    -   where the field names are keys and the results of evaluating fields are values.

#### Result Coercion

Sage servers must return a *map* as the result of an object type. Although each field in the object must yield a valid value in Sage’s type system and the output response format; there is no more restriction for an object’s fields.

### <a name="4.2.3">4.2.3</a> List

A Sage List…

-   is a special collection type
    -   which declares the type of each item in the List (referred to as the *item type* of the list). 
-   is serialized as an ordered list
    -   where each item in the list is serialized as per the item type.

To denote that an attribute uses a List type, the item type also must be specified; and List type will behave like a wrapper type constraint.

#### Result Coercion

Sage servers must return an ordered list as the result of a list type. Each item in the list must be the result of the item type coercion. If a reasonable coercion is not possible it must raise an attribute error. In particular, if a non‐list is returned, the coercion should fail, as this indicates a mismatch in expectations between the type system and the implementation.

If a list’s item type is nullable, then errors occurring during preparation or coercion of an individual item in the list must result in the value `null` at that position in the list along with an error added to the response. If a list’s item type is non‐nullable, an error occurring at an individual item in the list must result in an attribute error for the entire list.

>   For more information on the error handling process, see [Execution](#execution).

### <a name="4.2.4">4.2.4</a> Entity

Entities are at the heart of the Sage’s type system.

-   An Entity type is

    -   identified by a *string* name, which must be unique in the *schema*.

    -   resolved by a function which takes the *query* as a parameter, and returns a **reference value**.

        >   This *reference value* represents the **meta data** which that Entity’s artifact (attribute, act or link) resolvers depend on, or can be useful for them to retrieve and resolve a more accurate value.
        >
        >   We will explain this concept in the following parts of this section.

An Entity is represented as sets of…

- #### Attributes

    Each of which…

    - represents a property of an Entity.
    - is identified by a *string* name.
    - yields a value.
        - Optionally, a value of a desired type that is specified as a [constraint](#4.3).
        - It is resolved by a function which takes the reference value as a parameter, and returns the value.

- #### Acts

    Each of which…

    - represents a specific business logic related to an Entity type.
    - is identified by a *string* name.
    - is a function
        - that can be called with a query *(And the reference value is passed as a parameter to it, just like an attribute resolver function. The only difference is that an act does not yield a value.)*.

- #### Links

    Each of which…

    - represents a typed and directed *to-one (Entity)* or *to-many (Entity Collection)* relationship.

        - An Entity/Entity Collection type that the link is connected to, must be specified. 
        - They are like edges in a graph, where entities are nodes.
    - is identified by a *string* name.
    - is resolved by a function which takes the root value and the resolved entity as parameters, and returns an arguments map.
        - Sage will use the returned arguments for querying the Entity type which the link points to.

> #### Note
>
> Sage queries are **not hierarchical**. You request for entities individually.
>
> We want to handle every single entity separately. By doing so we try to provide as much granularity as possible. This becomes very useful if you think in terms of a *“knowledge graph”*, where you don’t embed relationships with other entities, instead you just give links to them. This is why Sage also has *links*.

For example, a `Person` entity type could be described as **:**

*— Just to clarify our examples and make them easily understandable, here we introduce this hypothetical, pseudo **SDL**; which we use only here and at the documentation for language-agnostic examples*:

[^SDL]: Schema Definition Language

```css
entity Person {
  id: @attribute;
  name: @attribute(string);
  age: @attribute(integer);
}
```

Where `name` is an attribute that will yield a **string** value, while `age` will yield an **integer** value. And `id` is a flex-typed attribute, which means it has no restrictions for its return value.

> Do not forget that **strict-types or any other constraint is optional**. You do not need to set a type constraint for each attribute you define. Here we did not dictate any expectation for the value of `id` attribute.

Only attributes, acts and links which are declared on that entity type may validly be queried.

For example, selecting all the attributes of a `Person` :

```json
{
  "someone": {    
    "typ": "Person",    
    "atr": "*", 
    "arg": {   
      "id": 10
    }
  } 
}
```

Would yield the object :

```json
{
  "someone": {
    "id": 10,
    "name": "Doruk Eray",
    "age": 17
  }
}
```

While selecting a subset of attributes :

```json
{
  "someone": {    
    "typ": "Person",    
    "atr": ["name"],    
    "arg": {      
    	"id": 10    
		}  
  } 
}
```

Must only yield exactly that subset :

```json
{
  "someone": {  	
    "name": "Doruk Eray"	
  }
}
```

We see that an attribute of an entity type may be a Scalar type, but it can also be a **List** or **Object**.

For example, the `Person` type might include two new attributes :

-    `occupation` : *Object*.
-    `nicknames` : *List*\<string>.

```css
entity Person {
  id: @attribute;
  name: @attribute(string);
  age: @attribute(integer);
  occupation: @attribute(object);
  nicknames: @attribute(list: string);
}
```

And let’s say we only requested for these two new  attributes, `occupation` and `nicknames`. 

Here it returns an *object* value **:**

```json
{
  "someone": {
    "occupation": {
      "company": "Dorkodu",
      "role": "Founder",
      "startYear": 2017
    },
		"nicknames": [
      "Mr. Dorkodu",
      "The Walking Wikipedia",
      "The Turko"
    ]
  }
}
```

But sometimes a relationship should also be represented, this is the reason why Sage also has *links*. Here we define a link named `favoriteBook`, which points to the `Book` Entity.

```css
entity Person {
  id: @attribute;
  name: @attribute(string);
  age: @attribute(integer);
  occupation: @attribute(object);
  favoriteBook: @link(Book);
}

entity Book {
  name: @attribute(string);
	publishYear: @attribute(integer);
}
```

And here we requested for also a link, `favoriteBook`, as well :

```json
{
  "someone": {
    "typ": "Person",
    "atr": ["name", "age"],
    "lnk": {
      "favoriteBook": ["name"]
    },
    "arg": {
      "id": 10
    }
  } 
}
```

This is the response :

```json
{
  "someone": {
    "name": "Doruk Eray",
    "age": 17,
    "$links": {
      "favoriteBook": {
        "name": "Nutuk"
      }
    }
  }
}
```

#### Attribute Ordering

When querying an Entity, the resulting mapping of fields are conceptually ordered in the same order in which they were encountered during query execution.

Response serialization formats capable of representing ordered maps should maintain this ordering. Serialization formats which can only represent unordered maps (such as JSON) should retain this order textually. That is, if two fields `["foo", "bar"]` were queried in that order, the resulting JSON serialization should contain `{"foo": "...", "bar": "..."}` in the same order.

Producing a response where fields are represented in the same order in which they appear in the request improves human readability during debugging and enables more efficient parsing of responses if the order of properties can be anticipated.

#### Result Coercion

Determining the result of coercing an entity is the heart of the Sage executor, so this is covered in that section of the specification.

### <a name="4.2.5">4.2.5</a> Entity Collection

Entity Collection is a special set type which contains only items of a specific Entity type.

All rules defined in an Entity type are kept in its Collection definition. Each of the items in a collection and their attributes must be valid within the specified Entity type.

#### Difference

-   While defining an Entity Collection, an Entity type must be specified for its item type.
-   For each attribute, an overriding resolver must be defined, which must return an ordered *List* of values. After resolving all requested attributes, those *Lists* are merged together and maps representing Entities are constructed based on their indexes.

>   An Entity Collection behaves as a wrapper type around an existing Entity type. It only overrides an Entity type’s attribute resolvers, and its purpose is to make retrieval of multiple instances of a specific Entity type at the same time possible.

Here we define a To-do Entity type :

```css
entity Todo {
  id @attribute(integer);
  title @attribute(string);
}

collection Todos of Todo
```

And query the collection type :

```json
{
  "todos": {
    "typ": "Todos",
    "atr": "*",
    "arg": {
      "userId": 1923
    }
  }
}
```

Let’s assume this is what `id` and `title` attribute resolvers returned *(represented in JSON)* :

```json
{
  "id": [ 1, 2, 3 ],
  "title": [
    "Do this, do that...",
    "Hang out with friends.",
    "Complete the website design of Sage."
  ]
}
```

Merge operation (based on the indexes of arrays) would result in a set of objects, each of which is an Entity of the specified type.

Then this would be the final result :

```json
{
  "todos": [
    {
      'id': 1,
      'title': "Do this, do that..."
    },
    {
      'id': 2,
      'title': "Hang out with friends."
    },
    {
    	'id': 3,
    	'title': "Complete the website design of Sage."
		}
	]   
}

```

#### Result Coercion

Sage servers must return a list as the result of an Entity Collection type. Each item in the list must be a map which represents an Entity of a specified Entity type, and contains only the requested attributes.

If the collection’s Entity type is nullable, then errors occurring during preparation or coercion of an individual item in the collection must result in the value **null** at that position in the collection along with an error added to the response. If a collection’s Entity type is non‐null, an error occurring at an individual item in the collection must result in an error for the entire collection query.

## <a name="4.3">4.3</a> Constraints

### <a name="4.3.1">4.3.1</a> Strict-Type

All attributes are *flex-typed* by default. This means they can be of any type within defined types in Sage’s type system.

But optionally you can set strict-type constraints for an attribute. In that case, the resolver function of that attribute must return a valid value of that specific type you want.

Anyway, Sage will try to coerce the returned value to the desired type if possible.

These are the types which you can set as a strict-type constraint **:**

- **Scalar**
    - **Boolean**
    - **Integer**
    - **String**
    - **Float**
- **Object** (*map* — a set of key-value pairs)
- **List** (an *array* with a specific item type — e.g. array of integers)

### <a name="4.3.2">4.3.2</a> Non-Null

By default, all types in Sage are **nullable**; which means the **null** value is a valid response for all of the above types. To declare a type that disallows null, the *Non‐Null* constraint can be used. This constraint wraps an underlying type, and acts identically to that wrapped type, with the exception that **null** is not a valid response for the wrapping type.

> Think about the ‘**age**’ attribute of a ‘**Person**’. In real life; it is an *integer*, and *non-null*. If you set these constraints for *‘age’* attribute, it must return a non-null, integer value.

#### Nullable vs. Optional

Attributes are *always* optional within the context of a query, an attribute may be omitted and the query is still valid. However attributes that return Non‐Null types will never return the value **null** if queried.

#### Result Coercion

In all of the above result coercions, **null** was considered a valid value. To coerce the result of a Non‐Null type, the coercion of the wrapped type should be performed. If that result was not **null**, then the result of coercing the Non‐Null type is that result. If that result was **null**, then an attribute error must be raised.

#### Combining List and Non-Null

The List and Non‐Null wrapping types can compose, representing more complex types. The rules for result coercion of Lists and Non‐Null types apply in a recursive fashion.

##### Rules

-   If the item type of a *List* is *Non‐Null*, then that *List* may not contain any **null** items.
-   If a *List* is *Non-Null*, then **null** is not accepted however an empty list is accepted. 

## <a name="4.4">4.4</a> Documentation

Documentation is a boring part of API development. But it turned out to be a killer feature when we decided that any Sage service should be able to publish its documentation easily.

### <a name="4.4.1">4.4.1</a> Description

To allow Sage service designers easily write documentation alongside the capabilities of a Sage API, descriptions of Sage definitions are provided alongside them, and made available via introspection using magic attributes. Although descriptions are completely optional, we think they are really useful.

Any Sage schema definition which can be described should provide a description unless it is considered self descriptive.

### <a name="4.4.2">4.4.2</a> Deprecation

Any Sage schema definition may be marked as *“deprecated”* as deemed necessary by the application. It is still legal to query for these attributes, acts or links (to ensure existing clients are not broken by the change), but they should be appropriately treated in documentation and code.

This must be handled just like setting optional constraints on attributes—as simple as declaring a ‘**deprecated’** setting as **true**.
# <a name="introspection">5</a> Introspection

-   **[5.1 Schema Introspection](#5.1)**

A Sage server supports introspection over its schema. The schema can be queried using Sage itself.

*— For example, given a server with the following schema definition **:***

```css
entity User {
  id @attribute(integer, non-null);
  name @attribute(string, non-null);
  email @attribute(string);
}

entity Post {
  id @attribute(integer, non-null);
  title @attribute(string, non-null);
  content @attribute(string, non-null);
  author @link(User, non-null);
}
```

This sample introspection query

```json
{
  "introspect:User": {
    "typ": "User",
    "atr": ["@type", "@description", "@deprecated"],
    "lnk": {
      "@attributes": ["name", "description", "type", "nonNull"]
    }
  }
}
```

would return

```json
{
  "introspect:User": { 
    "@type": "User",
		"@description": "Represents the user entity type.",    
    "@deprecated": false,
    "$links": {
      "@attributes": [
        {
        	"name": "id",
          "description": "ID of a User.",
          "type": "integer",
       	  "nonNull": true
        },
        {
        	"name": "name",
          "description": "Name of a User.",
          "type": "string",
       	  "nonNull": true
        },
        {
        	"name": "email",
          "description": "Email of a User.",
          "type": "string",
       	  "nonNull": false
        }
      ]  
		}
  }
}
```

### Reserved Names

Entity types; their attributes, acts and links used by the Sage introspection system are prefixed with "**@**" *(commercial at)*, and special variable names are prefixed with ‘**$**’ *(dollar sign)*. We do this in order to avoid naming collisions with user‐defined Sage types. Conversely, type system authors must not define any type system artifact with a leading ‘**@**’ *(commercial at)*, and also ‘**$**’ *(dollar sign)*.

### Documentation

All types in the introspection system provide a `description` attribute of type *string* to allow type system designers to publish documentation in addition to data capabilities.

#### Deprecation

To support the efforts for backwards compatibility, any defined artifact of Sage type system (entity type, attribute, act or link) can indicate whether or not they are deprecated (`deprecated` **:** *boolean*) and a reason text of why it is deprecated (`deprecationReason` **:** *string*).

Tools built using Sage introspection should respect deprecation by discouraging deprecated use through information hiding or developer‐facing warnings.

>   If an Entity type is marked as deprecated, also all of its artifacts are treated as deprecated.

## <a name="5.1">5.1</a> Schema Introspection

The schema introspection system can be queried using its own *meta-schema*.

>   #### Note
>
>   This is a meta-schema, provided only for introspection of your Sage service. So it has only attributes and some links, and no acts. The user of a Sage implementation doesn’t have to define this schema. It must be available as built-in.

### `@Schema`

Contains meta-information related to your Sage schema.

#### Attributes

-   `entities` **:** A list (item type of *string*) of all defined Entity types’ names.

— We asked for the attribute `entities` on `@Schema` :

```json
{
  "schemaInfo": {
    "typ": "@Schema",
    "atr": ["entities"]
  }
}
```

— Here is the response :

```json
{
  "schemaInfo": {
    "entities": ["User", "Post"]
  }
}
```

### Introspection Binding

Sage offers *Introspection Binding*, which makes it possible to attach introspection queries directly to your regular queries by using meta attributes and links.

— For example, we requested for `@type` attribute, on `User` Entity type :

```json
{
  "doruk": {
    "typ": "User",
    "atr": ["@type", "name"], 
    "arg": {
      "id": 5
    }
  }
}
```

— Here is the response :

```json
{
  "doruk": {   
    "@type": "User",
    "name": "Doruk Eray"
  }
}
```

As seen in the example above, meta attributes can be used to get metadata about an Entity type definition.

#### `*`

 — Available for any user-defined Entity type.

#### Attributes

-   `@type` returns the *string* name of the queried Entity type.
-   `@description` may return a *string* description or *null*.
-   `@deprecated` returns *true* if queried Entity type should no longer be used, *false* otherwise.
-   `@deprecationReason` optionally provides a reason *string* why this is deprecated.

#### Links

-   `@attributes` represents the set of attributes defined on queried Entity type. Must return an Entity Collection with item type of `@Attribute`.
-   `@acts` represents the set of acts defined on queried Entity type. Must return an Entity Collection with item type of `@Act`.
-   `@links` represents the set of links defined on queried Entity type. Must return an Entity Collection with item type of `@Link`.

>   #### Meta-Entity
>
>   A Meta-Entity type represents a value object which contains fields, but cannot be queried directly. They are used only in Sage’s introspection schema, and can not be declared/used by the user.

### `@Attribute`

The `@Attribute` Meta-Entity type represents each attribute in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `description` may return *string* or *null*.
-   `type` must return a *string* that represents the type of value returned by this field, or *null* if no constraint has been set.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

### `@Act`

The `@Act` Meta-Entity type represents each act in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `description` may return *string* or *null*.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

### `@Link`

The `@Link` Meta-Entity type represents each link in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `type` must return a *string*, which is the name of the linked Entity type.
-   `description` may return *string* or *null*.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

The query

```json
{
  "introspection:Post": {
    "typ": "Post",
    "atr": ["@type", "@description", "@deprecated"],
    "lnk": {
      "@attributes": ["name", "type"],
    	"@links": ["name", "type"]
    }
  }
}
```

will result in

```json
{
  "introspection:Post": {
    "@type": "Post",
    "@description": "Represents a Post object.",
    "@deprecated": false,
    "$links": {
      "@links": [
        {
          "name": "author",
          "type": "User"
        }
      ],
      "@attributes": [
         {
           "name": "id",
           "type": "integer"
         },
         {
           "name": "title",
           "type": "string"
         },
         {
           "name": "content",
           "type": "string"
         }
      ]
    }
  }
}
```
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
        -   A **value** must be a *[query](#6.2)*.

## <a name="6.2">6.2</a> Query

A *query*…

-   is identified by a *string* name.
    -   Each *query* a Sage *document* contains must be named. When submitting a *document* to a Sage service, the name of the each *query* to be executed must also be provided.
-   is represented as a *map*.
    -   Each query contains a number of pre-defined fields.
        -   To have compact *documents*, *field* names are used in their shortened forms.
        -   Implementations may use additional *fields* provided that they do not conflict (by both naming and functionality) with those defined in this specification.

The followings are pre-defined fields of a Sage query.

### <a name="6.2.1">6.2.1</a> Entity Type

(required) — `typ`

#### Possible Values

- *String*
    - Must be the *name* of an Entity type that is defined in the schema.

### <a name="6.2.2">6.2.2</a> Attributes

*(optional)* — `atr`

#### Possible Values

- *Set*
    - Every item in the set…
        - must be a *string*.
        - must be the name of an *attribute* that is defined in the schema.  
- *String* that contains only an asterisk `"*"`
- Empty *array* `[]`
- *Not defined*


### <a name="6.2.3">6.2.3</a> Act

*(optional)* — `act`

#### Possible Values

-   *String*
    -   Must be the name of an act which is defined in the schema.
-   *Not defined*

### <a name="6.2.4">6.2.4</a> Links

*(optional)* — `lnk`

#### Possible Values

- *Map*
    - Must be a map which contains key-value pairs, with the following rules:
        - A **key** must be the *string* name of a link which is defined in the schema.
        - A **value** must be a *set* of strings that contains the names of requested attributes.
            - Those attributes must be defined in the type which the link connects to.
- *Not defined*

### <a name="6.2.5">6.2.5</a> Arguments

*(optional)* — `arg`

#### Possible Values

-   *Map*

    -   Must be a *map* which contains key-value pairs, with the following rules:
        -   A **key** must be the unique *string* name of an argument.

            >   Sage treats arguments of a query as a *mapping* of argument name to value. More than one argument with the same name in an argument set is ambiguous and invalid.

        -   A **value** can be of any type provided that it is valid in Sage’s type system and the output response format.

-   *Not defined*

Interpretation of the possible values for query fields are explained in [Execution](#execution) section.
# <a name="execution">7</a> Execution

-   **[7.1 Executing Requests](#7.1)**
    -   **[7.1.1 Validating Requests](#7.1.1)**
-   **[7.2 Executing Queries](#7.2)**
    -   **[7.2.1 Algorithms for Query Execution](#7.2.1)**
-   **[7.3 Data Retrieval and Resolution](#7.3)**
    -   **[7.3.1 Value Resolution](#7.3.1)**
    -   **[7.3.2 Value Completion](#7.3.2)**
    -   **[7.3.3 Errors and Non-Nullability](#7.3.3)**

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

2.  Let *referenceValue* be the result of calling the Entity type’s resolver function with *query* as the parameter.

3.  Let *act* be the act in *query*.
    1.  If *act* is defined:
        1.  Run [PerformAct](#7.2.1.1) **(** *entityType, act, schema, referenceValue* **)**.

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

<a name="7.2.1.1">PerformAct</a> **(** *entityType, act, schema, referenceValue* **) :**

1.  Assert: *act* is an act defined on *entityType*.
2.  Run the function of *act* with *referenceValue* as a parameter.

<a name="7.2.1.2">RetrieveAttributes</a> **(** *entityType, attributes, schema, referenceValue* **) :**

1.  Initialize *resultMap* to an empty ordered map.
2.  For each *attributes* as *attribute*:
    1.  Assert: *attribute* is an attribute defined on *entityType*.
    2.  Let *attributeValue* be the result of [RetrieveAttribute](#7.3.0) **(** *entityType, attribute, schema, referenceValue* **)**.

    3.  Set *attributeValue* as the value for the key *attribute* in *resultMap*.
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

<a name="7.3.0">RetrieveAttribute</a>  **(** *entityType, attribute, schema, referenceValue* **) :**

1.  Let *resolvedValue* be the result of [ResolveAttributeValue](#7.3.1.1) **(** *entityType, attribute, referenceValue* **)**.
2.  Return the result of [CompleteValue](#7.3.1.2) **(** *attribute, resolvedValue, schema* **)**.

### <a name="7.3.1">7.3.1</a> Value Resolution

While nearly all of Sage execution can be described generically, ultimately the internal system exposing the Sage interface must provide values. This is exposed via *ResolveAttributeValue*, which produces a value for a given attribute on an Entity type for a real value.

As an example, this might accept the Entity type `Person`, the field `age`, and the *referenceValue* representing *Doruk Eray*. It would be expected to yield the value *17*.

<a name="7.3.1.1">ResolveAttributeValue</a> **(** *entityType, attribute, referenceValue* **) :**

1.  Let *resolver* be the resolver function of *attribute*, which is defined on *entityType*.
2.  Return the result of calling *resolver*, with the parameter *referenceValue*.

>   It is common for resolver to be asynchronous due to relying on reading an underlying database or networked service to produce a value. This necessitates the rest of a Sage executor to handle an asynchronous execution flow.

### <a name="7.3.2">7.3.2</a> Value Completion

After resolving the value for an attribute, it is completed by ensuring it complies with the expected constraints.

<a name="7.3.2.1">CompleteValue</a> **(** *attribute, result* **) :**

1.  Let *typeConstraints* be the set of constraints for *attribute*, if has any.
2.  For each *typeConstraints* as *typeConstraint* **:**
    1.  If *typeConstraint* is a Non‐Null constraint **:**
        1.  Let *wrappedType* be the wrapped type of *typeConstraint*.
        2.  Let *completedResult* be the result of <a name="7.3.2.1">CompleteValue()</a> for the *wrappedType*.
        3.  If *completedResult* is **null**, throw an attribute error.
        4.  Return *completedResult*.
    2.  If *typeConstraint* is a strict-type constraint **:**
        1.  If *typeConstraint* is a List strict-type **:**
            1.  If *result* is not a collection of values, throw an attribute error.
            2.  Let *innerType* be the inner type of *typeConstraint*.
            3.  Return a list where each list item is the result of calling [CompleteValue](#7.3.2.1) **(** *attribute, resultItem* **)**, where *resultItem* is each item in *result*.
        2.  If *typeConstraint* is an Object strict-type **:**
            1.  If *result* is not a map of Scalar keys and their values as legal in the Sage type system, throw an attribute error.
        3.  If *typeConstraint* is a Scalar, strict-type **:**
            1.  Return the result of “coercing” *result*, ensuring it is a legal value of *typeConstraint*, otherwise **null**.
3.  If result is **null** (or another internal value similar to **null** such as *undefined* or *NaN*), return **null**.

### <a name="7.3.3">7.3.3</a> Errors and Non-Nullability

If an error is thrown while resolving an attribute, it should be treated as though the attribute returned **null**, and an error must be added to the `errors` list in the response.

If the result of resolving an attribute is **null** (either because the function to resolve the field returned **null** or because an error occurred), and that attribute is of a *non-null* type, then an attribute error is thrown. The error must be added to the `errors` list in the response.

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
# <a name="references">9</a> References

-   **[9.1 Links](#9.1)**
-   **[9.2 Reference Implementations](#9.2)**
-   **[9.3 Other](#9.3)**

In this paper, we present Sage, which is a new way of data exchange and API design. We first give an overview, then introduce the principles, concepts behind Sage; after that we dive deeply into its components. In a nutshell, we believe that Sage can perform well in terms of both developer experience and performance under heavy production-load because of its simplicity, lightness and flexibility.

## <a name="9.1">9.1</a> Links

- **[Sage — libre.dorkodu.com/sage](https://libre.dorkodu.com/sage)**

    Sage’s website on Dorkodu Libre. There you can find more resources for learning and using Sage, and also the latest working draft of this paper.

- **[Dorkodu — dorkodu.com](https://dorkodu.com)**

    Who we are? We want to purify and liberate the human knowledge by making it open, useful and meaningful for everyone. We hope you will hear more about us soon. If you are interested in our work, see our website. 

- **[Dorkodu Libre — libre.dorkodu.com](https://libre.dorkodu.com)**

    Dorkodu Libre, the website where we present the contributions we make to the open source software community. You can find other awesome projects we work on. We try to do useful and meaningful things and make them open; then share our humble contributions with the community through open source software.

- **[Dorkodu on GitHub — github.com/dorkodu](https://github.com/dorkodu)**

    You can find our open source project repositories on GitHub.

## <a name="9.2">9.2</a> Reference Implementations

To clarify the desired and ideal outcome of this proposal, we work on our own reference server and client implementations. Both of them are used on the production, at Dorkodu.

*— As of August 10, reference implementations are under development, but you should have a look at the links below for the real-time development progress. We appreciate your feedback, of course :)*

- #### Sage Server

    The reference server implementation, written in PHP.

    **`GitHub` :**  [dorkodu/sage.php](https://github.com/dorkodu/sage.php)

- #### Sage Client

    The reference client implementation, written in JavaScript.

    **`GitHub` :**  [dorkodu/sage.js](https://github.com/dorkodu/sage.js)

    > #### Note
    >
    > This document does not focus on and specify any certain rules about clients. However, we develop a web client in JavaScript, for our own needs. And it can be considered as a *“reference”* for the community.

## <a name="9.3">9.3</a> Other

Also while writing this document, I was *heavily inspired by* some previous specifications, especially for the document structure. I am *literally* a kid (at least, while I am writing this, I am 16), so it was really hard for me to do boring paperwork to publish an open standard before developing an actual useful implementation.

Here they are **:**

- **[GraphQL](http://graphql.org)**

    I think I owe a thank to the GraphQL community. What they did was really exciting and changed the mindset of the industry about approaching to a fresh way of doing things.

- **[JSON:API](http://jsonapi.org)**

    JSON:API is really a great choice, if you are planning to choose the REST way. I am impressed by their efforts in which they still work to standardize and make it easy to use REST APIs with JSON.  
