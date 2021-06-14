# Sage

June 2021 - Working Draft

**`Author`**<br>  **Doruk Eray**<br>  Founder and Chief @ [Dorkodu](https://dorkodu.com).<br>  Self-taught Software Engineer.

  Website **:** [doruk.dorkodu.com](https://doruk.dorkodu.com)<br>  Email **:** [doruk@dorkodu.com](mailto:doruk@dorkodu.com)

---

## Contents

-   **[1 Introduction](#introduction)**
-   **[2 Overview](#overview)**
-   **[3 Principles](#principles)**
-   **[4 Concepts](#concepts)**
    -   **[4.1 Entity](#4.1)**
     -   **[4.2 Query](#4.2)**
     -   **[4.3 Schema](#4.3)**
-   **[5 Components](#components)** (WIP)
    -   **[5.1 Type System](#type-system)**
        -   **[5.1.1 Schema](#5.1.1)**
        -   **[5.1.2 Types](#5.1.2)**
        -   **[5.1.3 Scalar Types](#5.1.3)**
        -   **[5.1.4 Default Scalar Types in Sage](#5.1.4)**
        -   **[5.1.5 Constraints](#5.1.5)**
        -   **[5.1.6 Object](#5.1.6)**
        -   **[5.1.7 Entity](#5.1.7)**
        -   **[5.1.7 Entity Collection](#5.1.7)**
        -   **[5.1.8 List](#5.1.8)**
        -   **[5.1.9 Descriptions](#5.1.9)**
        -   **[5.1.10 Deprecation](#5.1.10)**
     -   **[5.2 Introspection](#introspection)**
         -   **[5.2.1 Schema Introspection](#5.2.1)**
     -   **[5.3 Validation](#validation)** (WIP)
     -   **[5.4 Execution](#execution)** (WIP)
     -   **[5.5 Response](#response)** (WIP)
-   **[6 Reference Implementations](#reference-implementations)**
-   **[7 Conclusion](#conclusion)**
-   **[8 References](#references)**

[^WIP]: Work in progress.

# <a name="introduction">1</a> Introduction

<img src="resources/sage-dark.png" alt="Sage Logo" style="width: 70%; margin: 20px auto;"/>

This is the proposal for Sage; a query-based, entity-focused data exchange protocol originally created at Dorkodu to simplify the communication for data interactions between different layers of software, especially designed for APIs. The development of this open standard started in 2020.

The latest working draft of this protocol can be found on [Sage’s website on Dorkodu Libre](https://libre.dorkodu.com/sage/).

### Copyright Notice

Copyright © 2020-present, [Dorkodu](https://dorkodu.com)

### Disclaimer

Your use of this “Proposal” may be subject to other third party rights. THIS PROPOSAL IS PROVIDED “AS IS.” The contributors expressly disclaim any warranties (express, implied, or otherwise), including implied warranties of merchantability, non‐infringement, fitness for a  particular purpose, or title, related to the Proposal. The entire risk as to implementing or otherwise using the Proposal is assumed by the Proposal implementer and user. IN NO EVENT WILL ANY PARTY BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT,  SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY  CAUSES OF ACTION OF ANY KIND WITH RESPECT TO THIS PROPOSAL OR ITS  GOVERNING AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### Conformance

A conforming implementation of Sage must fulfill all normative requirements. Conformance requirements are described in this document via both descriptive assertions and key words with clearly defined meanings.

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative portions of this document are to be interpreted as described in [IETF RFC 2119](https://tools.ietf.org/html/rfc2119). These key words may appear in lowercase and still retain their meaning unless explicitly declared as non‐normative.

A conforming implementation of Sage may provide additional functionality, but must not where explicitly disallowed or would otherwise result in non‐conformance.

### Conforming Algorithms

Algorithm steps phrased in imperative grammar (e.g. “Return the result of calling resolver”) are to be interpreted with the same level of requirement as the algorithm it is contained within. Any algorithm referenced within an algorithm step (e.g. “Let completedResult be the result of calling CompleteValue()”) is to be interpreted as having at least the same level of requirement as the algorithm containing that step.

Conformance requirements expressed as algorithms can be fulfilled by an implementation of this specification in any way as long as the perceived result is equivalent. Algorithms described in this document are written to be easy to understand. Implementers are encouraged to include equivalent but optimized implementations.

See [Appendix A](https://spec.graphql.org/draft/#sec-Appendix-Notation-Conventions) for more details about the definition of algorithms and other notational conventions used in this document.

### Non-normative Portions

All contents of this document are normative except portions explicitly declared as non‐normative.

> This is an example of a non-normative explanation, or author’s opinion.

Examples in this document are non‐normative, and are presented to help understanding of introduced concepts and the behavior of normative portions of the specification. Examples are either introduced explicitly in prose (e.g. “for example”) or are set apart in example or counter‐example blocks, like these :

```js
// This is an example of a non-normative code sample.
console.log("Hello, World!");
```

Code examples in this document are for providing real-life samples, but does not have to be from a real implementation. We created reference implementations, and highly recommend you checking out them.

> #### Example
>
> This is an example of a non-normative example.

Notes in this document are non‐normative, and are presented to clarify intent, draw attention to potential edge‐cases and pit‐falls, and answer common questions that arise during implementation. Notes are either introduced explicitly in prose (e.g. “**Note :**“) or are set apart in a note block, like this:

> #### Note
> This is an example of a non‐normative note.

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

In this example, we requested for a **Movie** entity with the argument **id: “*tt0133093*”** and asked for the attributes **name**, **starring**, **duration**, **directedBy** and **releaseYear**. And as a result you got an object which contains only what you wanted.

# <a name="principles">3</a> Principles

Our priority is to keep Sage simple, approachable, easy-to-use and lightweight while solving the major problems efficiently and providing a flexible & intuitive way. Here are some of our design principles :

- #### Platform Agnostic

- Sage is completely platform agnostic  **never dictates** the use of *any programming language, platform, storage technique or even a query language like SQL or GraphQL*. Instead, focuses on concepts and patterns that are achievable **no matter how you're building a Sage server. **Every language and every Sage implementation does things slightly differently. 

    Think of it as a complete guide of what goes into building an powerful API, from design, to architectures, to implementation, and even documentation.

- Sage It should be independent from other layers, also directly based on your business logic. 

    If we simplify how Sage works, it is like a middleware for data exchange between the layers of consumer (client) and service (server).

- #### Query-based Data Exchange

    Most problems in data interactions is experienced in the retrieval process. *(e.g. client-server applications & APIs)* In order to solve this, Sage is ***query-based***, which is the ideal way. You can query your data, by *declaring the desired attributes, and arguments for conditions*, and get only what you want. You can even call remotely your Sage service to do some work, by adding an **act** to your query item.

    Any data retrieval and modification process imaginable will be able to developed with Sage. Especially in the product-side client applications, it would be a mindful choice to consume a Sage based API.

- #### Entity-focused Type System

    Every Sage server defines an application‐specific type system. Queries are executed within the context of that type system. A Sage instance publishes its data capabilities in an entity-focused way, which determines what its clients are allowed to consume. It is the client that should be able to specify exactly how it will consume that data. These queries are specified at attribute‐level granularity.

    Sage performs operations *(e.g. data retrieval or modification)* on a specific *“entity type”* . An entity type can be considered like a "class" in *OOP*, with attributes *(or properties)* and acts *(or methods)* are defined on this *entity type*.

- #### Flexible Types and Constraints 

    Sage is *flex-typed*. By default, all attributes are

    

- #### Application-Layer Protocol

    Sage is an application-layer protocol and does not require or dictate a particular transport. It is a standard about how to exchange data, in a query-based way.

- #### Product-centric

    Sage was primarily designed to solve the problems of the *data consumption*, product engineering. The main goal was to provide an ***intuitive**, **neat**, **lightweight** and **easily applicable framework** for **simplifying the data exchange process** and ease the burden on developers and their application architectures. For this reason, Sage offers a natural way for **describing** *data requirements* and **consuming** *data capabilities*.

- #### Graph-like Structure

    Most data-driven apps today focus on creation and manipulation of their data. So with Sage you can describe your data as **entities**–with their ***attributes***, ***acts***– and their **relationships**, which is like a *graph*. To achieve harmony with the structure of these applications, a Sage query itself is a set of descriptions with high granularity, which you can determine the exact attributes, acts and relationships of an entity.

## So…

Because of these principles, Sage is a simple-to-use, flexible, lightweight but also powerful and productive way for application-centric data exchange. Product developers and designers can create applications a lot more effectively by working with a Sage API. Sage can quickly make your application stack enjoyable to work with. To enable that experience, there must be those that build those APIs and tools for the rest to use.

> This paper *(or proposal)* serves as a reference for engineers who will develop Sage implementations. It describes the approach, concepts, rules and components. The goal of this document is to provide a foundation and framework for Sage. We look forward to work with the community to improve this standard. 

# <a name="concepts">4</a> Concepts

Here we introduce some concepts and terms which you will need to understand well in order to understand and learn more deeply about Sage. Actually we do this because you may fall in love with Sage in first sight ;)

>   #### What sort of protocol is Sage?
>
>   Simply a protocol is a set of agreements about how to do something. Sage can be called as a **standard, approach, specification, protocol** etc. We just wanted to create a specified, structural way for building and designing APIs.

## <a name="4.1">4.1</a> Entity

Entities are at the core of the type system in Sage. You define your data as entities. You can think of entities like objects in OOP.

Each entity can have any number of attributes and acts. Attributes are **key-value pairs**, while acts are **methods/functions** (which you can remotely call in your query to do something, e.g. updating the database).

- ### Attribute

    An attribute describes a property of an entity. An attribute can be *any type* which must be **JSON serializable** *(We will explain this in following sections).*

    An attribute will be retrieved by a resolver/retriever function defined by user, which Sage will pass the query object as a parameter.

    > #### Note
    >
    > Sage **does not** dictate that a resolver function will receive the query object as the *ONLY* parameter. If your implementation has additional functionality which requires to pass another parameter, you can do it.
    >
    > 
    >
    > **For example:** In our PHP implementation, you can define an optional ‘context’ array which you can use as a simple dependency container. Sage will pass that context value to resolver and act functions.

- ### Act

    An act is a function *(like a method)* that can be added to an entity type. An act is called in a query with *(optional)* arguments.

    An act is identified by a string name. It takes the query as a parameter. You can write your business logic code as acts and run any of them by calling it from a query.

## <a name="4.2">4.2</a> Query

Sage is a query-based approach for data exchange. 

The client requests the data it needs from a Sage service with a structured query document that is created according to certain rules. Basically, a query document contains a list of queries all of which describes an entity instance needed, with no limit on the number of queries.

But how to query?

> Sage **does not** have a *special query language*.
>
> We think it is *unnecessary* to add this burden while being able to use one of the common formats. So we decided to use ***JSON***, which has advantages such as being *universal, lightweight and easy to use*. Also, JSON is commonly used in the software ecosystem, which means it has wide support *(such as tools, helper libraries)* on different languages and platforms.
>
> Thus, the query and the result are expressed using the JSON format. By using a universal format and not inventing a new query language, we keep Sage lightweight, easily approachable and implementable.

Each query must be identified with a string name which must be unique within the query document, and expressed as a JSON object which the name points to.

*— Below here is an example of a transaction (query and response) requesting a single entity :*

```json
{
  "doruk": {
    "type": "User",
    "attr": ["name", "email", "age"],
    "args": {
      "handle": "@doruk"
    }
  }
}
```

```json
{
  "data": {
    "doruk": {
      "name": "Doruk Eray",
      "email": "doruk@dorkodu.com",
      "age": 16
    }
  }
}
```

## <a name="4.3">4.3</a> Schema

Your Sage server’s data capability is defined by its data schema, which is just a list of defined types. A list/array of all entity types you want to be available. Schema will be passed to Sage’s query executor. Any query document given to the execution engine will be run on this schema you define.

In this section we only introduced some concepts. You can find more details about components of Sage in the following sections of this document.

# <a name="components">5</a> Components

Sage consists from following components :

- Type System
- Introspection
- Validation
- Execution
- Response

##  <a name="type-system">5.1</a> Type System

The Sage type system describes the capabilities of a Sage service and is used to determine if a query and its response are valid.

### <a name="5.1.1">5.1.1</a> Schema

A Sage service’s data capabilities are referred to as that service’s “*schema*”.

A schema is defined as a set of entity types it supports.

A Sage schema must itself be internally valid.

All entity types within a Sage schema must have *unique, string names*. No two provided entity types may have the same name. No provided type may have a name which conflicts with any built in types.

All items *(entities, their attributes and acts)* defined within a schema must not have a name which begins with ‘**@**‘ *(at symbol)*, as this is used exclusively by Sage’s introspection system.

### <a name="5.1.2">5.1.2</a> Types

The fundamental unit of any Sage schema is the *type*.

The most basic type is a `Scalar`. A scalar represents a primitive value, like a string or an integer.

However, we have a concept called **“constraints”.** Oftentimes it is useful to add a constraint to an attribute, like **strict-type**. For example, strict-type constraint allows the schema to specify exactly which data type is expected from a specific attribute.

### <a name="5.1.3">5.1.3</a> Scalar Types

Scalar types represent primitive values in the Sage type system.

All Sage scalars are representable as strings, though depending on the response format being used, there may be a more appropriate primitive for the given scalar type, and server should use those types when appropriate.

> We prefer **JSON** and suggest you to use JSON if possible, but you can also use another format for query and/or result, *in the same way we use JSON*.
>
> In the **[Response](#response)** section, we will talk about this.

#### Result Coercion

A Sage server, when retrieving an attribute of a given scalar type, must uphold the contract the scalar type describes, either by coercing the value or producing an **attribute error** if a value cannot be coerced or if coercion may result in data loss.

A Sage service may decide to allow coercing different internal types to the expected return type. For example when coercing a attribute of type `int` or a `boolean` true value may produce `1` , or a string value `"123"` may be parsed as base‐10 `123`. However if internal type coercion cannot be reasonably performed without losing information, then it must raise an **attribute error**.

Since this coercion behavior is not observable to clients of a Sage service, the precise rules of coercion are left to the implementation. The only requirement is that a Sage server must yield values which adhere to the expected Scalar type.

### <a name="5.1.4">5.1.4</a> Default Scalar Types in Sage

Sage supports a basic set of well‐defined Scalar types. A Sage server should support all of these types, and a Sage server which provide a type by these names must adhere to the behavior described below.

> These scalar types are used for strong-type constraints on attributes. Normally attributes are all weak-typed, which means can be any type, provided that they must be JSON serializable.

#### Integer

The integer scalar type represents a signed 32‐bit numeric non‐fractional value. Response formats that support a 32‐bit integer or a number type should use that type to represent this scalar.

**Result Coercion**<br>Attributes returning the **integer** type expect to encounter **32‐bit** integer internal values.

Sage servers may coerce non‐integer internal values to integers when reasonable without losing information, otherwise they must raise an **attribute error**. Examples of this may include returning `1` for the floating‐point number `1.0`, or returning `123` for the string `"123"`. In scenarios where coercion may lose data, raising an attribute error is more appropriate. For example, a floating‐point number `1.2` should raise an attribute error instead of being truncated to `1`.

If the integer internal value represents a value less than **-2^31^** or greater than or equal to **2^31^**, an attribute error should be raised.

>   #### Note
>
>   Numeric integer values larger than 32‐bit can use string type, as not all platforms and transports support encoding integer numbers larger than 32‐bit.

#### Float

The Float scalar type represents signed double‐precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). Response formats that support an appropriate double‐precision number type should use that type to represent this scalar.

**Result Coercion**<br>Attributes returning the **float** type expect to encounter double‐precision floating‐point internal values.

Sage servers may coerce non‐floating‐point internal values to **float** when reasonable without losing information, otherwise they must raise an *attribute error*. Examples of this may include returning `1.0` for the integer number `1`, or `123.0` for the string `"123"`.

#### String

The string scalar type represents textual data, represented as UTF‐8 character sequences. The string type is generally used by Sage to represent free‐form human‐readable text. All response formats must support string representations, and that representation must be used here.

**Result Coercion**<br>Attributes returning the string type expect to encounter UTF‐8 string internal values.

Sage servers may coerce non‐string raw values to string when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning the string `"true"` for a boolean true value, or the string `"1"` for the integer `1`.

#### Boolean

The Boolean scalar type represents `true` or `false`. Response formats should use a built‐in boolean type if supported; otherwise, they should use their representation of the integers `1` and `0`.

**Result Coercion**<br>Attributes returning the **boolean** type expect to encounter boolean internal values.

Sage servers may coerce non‐boolean raw values to `boolean` when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning `true` for non‐zero numbers.

### <a name="5.1.5">5.1.5</a> Constraints

#### Strict-type

All attributes are weak-typed by default. This means they can be any type which is output-able JSON serializable.

But optionally you can set strict-type constraints for an attribute. This means, the resolver function of that attribute must return a value of that specific type you want.

Anyway, Sage will try to coerce the returned value to the desired type if possible.

These are all possible types which you can set as a strict-type constraint **:**

- **boolean**
- **integer**
- **string**
- **float**
- **object** (must be represented as a map–a set of key-value pairs.)
- **list** (must set an item type)

#### Non-Null

By default, all values in Sage are **nullable**; which means the **null** value is a valid response for all of the above types. To declare a type that disallows null, the Sage Non‐Null constraint can be used. This constraint wraps an underlying type, and acts identically to that wrapped type, with the exception that **null** is not a valid response for the wrapping type.

> #### Example
>
> Think about the ‘**age**’ attribute of a ‘**Person**’. In real life; it is an *integer*, and *non-null*.
>
> If you set these constraints for *‘age’* attribute, it must return a non-null, integer value.

##### **Nullable vs. Optional**

Attributes are *always* optional within the context of a query, an attribute may be omitted and the query is still valid. However attributes that return Non‐Null types will never return the value **null** if queried.

##### **Result Coercion**

In all of the above result coercions, **null** was considered a valid value. To coerce the result of a Non‐Null type, the coercion of the wrapped type should be performed. If that result was not **null**, then the result of coercing the Non‐Null type is that result. If that result was **null**, then an attribute error must be raised.

### [5.1.6](#5.1.6) Objects

Sage object type represent a list of named fields, each of which yield a value of a valid type. Object values should be serialized as maps, where the field names are the keys and the result of evaluating the field is the value.

A field of an object may be any type which must be **JSON serializable.**

### <a name="5.1.7">5.1.7</a> Entity

Sage Entities represent…

- a list of *Attributes*, each of which is a named key and yield a value *(optionally, a value of a specific type you desire)*
- a list of *Acts*, each of which is a named function that you can call in your query item *(and optionally with the arguments you give)*.
- a list *Relationships*, each of which is a named, typed and directed *to-one (Entity)* or *to-many (Entity Collection)* links between two entity types.

Entity values should be serialized as maps, where the queried attribute names are the keys and the result of evaluating the attribute is the value.

All attributes and acts defined within an Entity type must not have a name which begins with "**@**" (at symbol), as this is used exclusively by Sage’s introspection system.

> #### Note
>
> Sage queries are not hierarchical. You request for entities individually.
>
> We wanted to handle every single entity separately. By doing so we try to provide as much granularity as possible. This becomes very useful if you think in terms of a *“knowledge graph”*, where you don’t embed relationships with other entities, instead you just link to them. 
>
> We develop Sage with the future of Web in mind, not just for today’s hot fashions. As Dorkodu our primary interests are *Web 3.0 (Semantic Web), Information Science and Linked Data*. So we want Sage to be the data exchange protocol of future. Although we keep it simple now, we will add more features as new requirements come out.

For example, a `Person` entity type could be described as **:**

***— Just to make it easily undestandable, here we use a hypothetical, pseudo SDL* :**<br>

[^SDL]: Schema Definition Language

```scss
entity Person {
  id: @integer
  name: @string
  age: @integer
}
```

Where `name` is an attribute that will yield a **string** value, while `age` and `id` are attributes that each will yield an **integer** value.

> Do not forget that **strict-types or any constraints are optional**. You don’t need to set a type constraint for each attribute you define.

Only attributes and acts which are declared on that entity type may validly be queried on that entity.

For example, selecting all the attributes of a `Person` **:**

```json
{
  "someone": {    
    "type": "Person",    
    "attr": ["name", "age"],    
    "args": {      
      "id": 10    
    }  
  } 
}
```

Would yield the object:

```json
{  
  "someone": {  	
    "name": "Doruk Eray",
    "age": 17,	
  }
}
```

While selecting a subset of attributes:

```json
{
  "someone": {    
    "type": "Person",    
    "attr": ["name"],    
    "args": {      
    	"id": 10    
		}  
  } 
}
```

Must only yield exactly that subset:

```json
{
  "someone": {  	
    "name": "Doruk Eray"	
  }
}
```

We see that an attribute of an entity type may be a scalar type, but it can also be a **list** or **object**.

For example, the `Person` type might include an `occupation` attribute with the type *object* **:**

```scss
entity Person {
  id: @integer
  name: @string
  age: @integer
  occupation: @object
}
```

And let’s say we only requested for the `occupation` attribute. Here it returns an *object* value**:**

```json
{
  "someone": {
    "occupation": {
      "company": "Dorkodu",
      "role": "Founder",
      "startYear": 2017
    }
  }
}
```

#### Attribute Ordering

When querying an Entity, the resulting mapping of fields are conceptually ordered in the same order in which they were encountered during query execution.

Response serialization formats capable of representing ordered maps should maintain this ordering. Serialization formats which can only represent unordered maps (such as JSON) should retain this order textually. That is, if two fields `{foo, bar}` were queried in that order, the resulting JSON serialization should contain `{"foo": "...", "bar": "..."}` in the same order.

Producing a response where fields are represented in the same order in which they appear in the request improves human readability during debugging and enables more efficient parsing of responses if the order of properties can be anticipated. 

#### Type Validation

Entity types can be invalid if incorrectly defined. These set of rules must be adhered to by every Entity type in a Sage schema.

1.  Anything defined on the schema must not have a name which begins with the character "**@**" *(commercial at)*.
2.  An Entity type must define one or more attributes.
3.  For each **attribute** of an Entity type :
    1.  The attribute must have a unique string name within that Entity type; no two attributes may share the same name.
    3.  The attribute must return a type which must be **output-able**. We will talk about this later.
    4.  If any constraints have been set for an attribute, it must return a type which is **valid** for that constraint.
4.  For each **act** of an Entity type :
    1.  The act must have a unique name within that Entity type; no two acts may share the same name.
    3.  The act must be :
        1.  a function
        2.  able to accept at least one parameter, which will be the query object. 
5.  For each **relationship** of an Entity type :
    1.  The relationship must have a unique string name within that Entity type; no two relationships may share the same name.
    2.  The relationship must point to a specific Entity/EntityCollection type.

### <a name="5.1.8">5.1.8</a> Entity Collection

### <a name="5.1.9">5.1.9</a> List

A Sage list is a special collection type which declares the type of each item in the List (referred to as the *item type* of the list). List values are serialized as ordered lists, where each item in the list is serialized as per the item type.

To denote that a field uses a List type, the item type also must be declared as a type constraint.

#### **Result Coercion**

Sage servers must return an ordered list as the result of a list type. Each item in the list must be the result of a result coercion of the item type. If a reasonable coercion is not possible it must raise an attribute error. In particular, if a non‐list is returned, the coercion should fail, as this indicates a mismatch in expectations between the type system and the implementation.

If a list’s item type is nullable, then errors occuring during preparation or coercion of an individual item in the list must result in the value **null** at that position in the list along with an error added to the response. If a list’s item type is non‐null, an error occuring at an individual item in the list must result in an attribute error for the entire list.

>   For more information on the error handling process, see **“Errors and Non‐Nullability”** within the Execution section.

### <a name="5.1.9">5.1.9</a> Descriptions

Documentation is a boring part of API development. But it turned out to be a killer feature when we decided that any Sage service should be able to publish a documentation easily.

To allow Sage service designers easily write documentation alongside the capabilities of a Sage API, descriptions of Sage definitions are provided alongside their definitions and made available via introspection. Although descriptions are completely optional, we think they are really useful.

All Sage type definitions which can be described should provide a description unless they are considered self descriptive.

### <a name="5.1.10">5.1.10</a> Deprecation

Entities, attributes or acts may be marked as *“deprecated”* as deemed necessary by the application. It is still legal to query for these attributes or acts (to ensure existing clients are not broken by the change), but they should be appropriately treated in documentation and code.

This must be handled just like setting optional constraints on attributes. As simple as declaring the ‘**deprecated’** setting as **true**.

## <a name="introspection">5.2</a> Introspection

A Sage server supports introspection over its schema. The schema is queried using Sage itself.

Take an example query, there is a User entity with three fields: *id*, *name*, and *age*.

*— for example, given a server with the following type definition :*

```scss
entity User {
  id: @integer @nonNull
  name: @string @nonNull
  age: @string
}
```

The query

```json
{
  "introspectionSample": {
    "type": "@entity",
    "attr": [ "name", "attributes", "description", "isDeprecated" ], 
    "args": {
      "name": "User"
    }
  }
}
```

would return

```json
{
  "introspectionSample": {   
    "name": "User",    
    "attributes": {   
      "id": {        
        "type": "int",
        "nonNull": true
      },
      "name": {        
        "type": "string",
        "nonNull": true
      },
      "age": {        
        "type": "int",
      }
		},
    "description": "The user entity type.",    
    "isDeprecated": false
  }
}
```

#### Reserved Names

Entity types, attributes and acts required by the Sage introspection system are prefixed with "**@**" *(at symbol)*. We do this in order to avoid naming collisions with user‐defined Sage types. Conversely, type system authors must not define any entity types, attributes, acts, arguments, or any other type system artifact with a leading ‘**@**’ *(at symbol)*.

#### Documentation

All types in the introspection system provide a `description` attribute of type **string** to allow type system designers to publish documentation in addition to data capabilities.

#### Deprecation

To support the effort for backwards compatibility, any piece of Sage type system (entity type, attribute and act) can indicate whether or not they are deprecated (**isDeprecated :** *boolean*) and a description of why it is deprecated (**deprecationReason :** *string*).

Tools built using Sage introspection should respect deprecation by discouraging deprecated use through information hiding or developer‐facing warnings.

### <a name="5.2.1">5.2.1</a> Schema Introspection

The schema introspection system can be queried using its schema. The user of a Sage implementation doesn’t have to write this schema. It must be available as built-in.

— The schema of the Sage introspection system, written in our *pseudo* SDL **:**

```scss
entity @Schema {
  entities: @list( @entity("@Entity") )
}

entity @Entity {
  name: @string @nonNull
  description: @string
  attributes: @list( @entity("@Attribute") ) @nonNull
	acts: @list( @entity("@Act") )
  typekind: @enum("@TypeKind")
  isDeprecated: @boolean
  deprecationReason: @string
}

entity @Attribute {
  name: @string @nonNull
  description: @string
  type: @enum("@Type")
  nonNull: @boolean
  isDeprecated: @boolean
  typekind: @enum("@TypeKind")
  deprecationReason: @string
}

entity @Act {
  name: @string @nonNull
  description: @string
  isDeprecated: @boolean
  deprecationReason: @string
}

enum @TypeKind {
	SCALAR,
  OBJECT,
  LIST
}

enum @Type {
	ENTITY,
  INT,
  STRING,
  FLOAT,
  BOOLEAN,
  OBJECT,
  LIST
}
```

### Type Kinds

There are three different kinds of types. These kinds are listed in the `@TypeKind` enumeration.

#### Scalar

Represents scalar types such as **Int, String, Float and Boolean**. Scalars cannot have any fields or items.

A Sage type designer should describe the data format and scalar coercion rules in the description attribute of any scalar.

#### Object

Object types represent concrete instantiations of sets of fields.

#### List

Lists represent sequences of values in Sage. A List type is a type modifier: it wraps another type instance in the `ofType` attribute, which defines the type of each item in the list.

### The `@Schema` Type

Represents the Sage schema. Contains only a single attribute, “entities”.

#### Attributes

-   `entities` **:** must return a List of type `@Entity`.

### The `@Entity` Type

Represents Entity types in Sage. Contains a set of defined attributes.

#### Attributes

-   `name` **:** must return a *String*.
-   `description` **:** may return a *String* or **null**.
-   `attributes` **:** The set of attributes query‐able on this entity type.
    -   Accepts the argument `includeDeprecated` which defaults to **false**. If **true**, deprecated fields are also returned.
-   `acts` **:** The set of acts query‐able on this entity type.
    -   Accepts the argument `includeDeprecated` which defaults to **false**. If **true**, deprecated fields are also returned.
-   `typekind` **:** must return the `OBJECT` value of `@TypeKind` enumeration.
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.

### The `@Attribute` Type

The `@Attribute` type represents each attribute in a specific Entity type.

#### Attributes

-   `name` **:** must return a *String*
-   `description` **:** may return a *String* or **null**
-   `type` **:** must return a value of  `@Type` enum that represents the type of value returned by this attribute.
-   `typekind` **:** must return a value of `@TypeKind` enum that represents the type kind of value returned by this attribute.
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.

### The `@Act` Type

The `@Act` type represents an act in a specific Entity type.

#### Attributes

-   `name` **:** must return a *String*
-   `description` **:** may return a *String* or **null**
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.

## <a name="validation">5.3</a> Validation

Sage does not just verify if a request is structurally and syntactically correct, but also ensures that it is unambiguous and mistake‐free in the context of a given Sage schema.

**An invalid request is still technically executable**, and will always produce a stable result as defined by the algorithms in the Execution section, however that result may be ambiguous, surprising, or unexpected relative to a request containing validation errors, **so execution should only occur for valid requests.**

Typically validation is performed in the context of a request immediately before execution, however a Sage service may execute a request without explicitly validating it if that exact same request is known to have been validated before.

>   #### **Example** 
>
>   A request may be validated during development, provided it does not later change, or a service may validate a request once and memoize the result to avoid validating the same request again in the future. Any client‐side or development‐time tool should report validation errors and not allow the formulation or execution of requests known to be invalid at that given point in time.

#### **Type system evolution**

As Sage type system schema evolve over time by adding new entities, attributes or acts, it is possible that a request which was previously valid could later become invalid. Any change that can cause a previously valid request to become invalid is considered a *breaking change*. Sage services and schema maintainers are encouraged to avoid breaking changes, however in order to be more resilient to these breaking changes, sophisticated Sage services may still allow for the execution of requests which *at some point* were known to be free of any validation errors, and have not changed since.

#### **Examples**

For this section of this document, we will assume the following type system in order to demonstrate examples**:**

```scss
entity Person {
  name: @string @nonNull
  nickname
  age: @int
}
```

`Person` entity type has attributes : 

-   `name` : **string** and **non-null**
-   `nickname` –no constraint–
-   `age` : **integer**

### <a name="5.3.1">5.3.1</a> Query

#### Document Structure

This section describes the structure of a Sage document, which are defined in *JavaScript Object Notation (JSON)* [[RFC7159](http://tools.ietf.org/html/rfc7159)]. Although the same media type is used for both request and response documents, certain aspects are only applicable to one or the other. These differences are called out below.

Unless otherwise noted, objects defined by this specification MUST NOT contain any additional members. Client and server implementations MUST ignore members not recognized by this specification.

#### Query Object Structure

A query is described as an object, and contains some pre-defined fields. To have lightweight, compact query documents, field names are used in their shortened forms. **Type, Attributes, Acts, Arguments and Relationships.**

- #### **`type`**

    **Entity Type**. A query item will be executed on its given type. This is the only required attribute.

- #### **`attr`**

    *(optional)* **Attributes**, which determines the attributes you want Sage to return. Each attribute is identified with its own *string name*.

    **You can set *“attr”* to an empty array, or even don’t define *“attr”* attribute.**

    - Empty array means an **empty result** object will be returned.
    - Not setting the attribute means **no result object** will be returned.
    - A string with inside a star means **“*”**

- #### **`act`**

    *(optional)* **Acts**, which in addition to an entity’s attribute resolvers, Sage also can call for an *act* you defined, if you give its name in the query.

    This is an example query of adding a to-do, for the sake of simplicity :

    ```json
    {
      "AddToDo:101": {
        "type": "ToDo",
        "act": "addToDo",
        "attr": ["id", "user", "title", "isCompleted", "deadline"],
        "args": {
          "userId": 101,
          "title": "Finish Sage's Whitepaper.",
          "deadline": "2021-05-20"
        }
      }
    }
    ```

    This sample will add a to-do with given arguments, then return the desired attributes. Here is the result :

    ```json
    {  
      "AddToDo:101": {    
        "id": 12345,
        "user": { 
          "id": "101",
          "username": "doruk",
          "name": "Doruk Eray"
        },    
        "title": "Finish Sage's Whitepaper.",
        "isCompleted": false,    
        "deadline": "2021-05-20"  
      }
    }
    ```

    > Sage does not handle these steps automatically. It’s the developer who writes the code required to add this to-do to data storage, also how to retrieve these attributes.

- #### **`args`**

    *(optional)* **Arguments**, a list of key-value pairs. They are no different than passing parameters to a function. You are providing arguments to your Sage API to specify “how” you want the data. They will be passed to all attribute resolvers *(and to the act if given in the query.)*

    > #### Example
    >
    > Let’s say you want the **`ToDo`** with the **`id`** of **`1234`**. If so, in your query, you can give an **`id`** argument and set it to **`1234`**. On the server side, in the attribute resolver function you would look for an id argument and fetch the `User` with the given id from the data source.

- #### **`rel`**

    *(optional)* **Relationships**, a list of named and typed links to other entity types. They are like edges in a graph, where entity types are nodes. You can describe relationships between different entities.

    ```crystal
    (User)--[owner]-->(ToDo)
    ```

    > #### Example
    >
    > For example, let’s say you want the **`ToDo`** with the **`id`** of **`1234`**. If so, in your query, you can give an **`id`** argument and set it to **`1234`**. On the server side, in the attribute resolver function you would look for an id argument and fetch the `User` with the given id from the data source.
    >
    > ```json
    > {
    >   "doruk": {
    >     "type": "User",
    >     "attr": ["name", "email", "age"],
    >     "rel": {
    >       "todos": []
    >     },
    >     "args": {
    >       "handle": "@doruk"
    >     }
    >   }
    > }
    > ```

    

### <a name="5.3.2">5.3.2</a> Schema

— Work in progress.

### <a name="5.3.3">5.3.3</a> Attributes

#### Attribute Selection

##### **Formal Specification**

-   Let *attributeName* be the desired attribute.
    -   *attributeName* must be defined in the schema as an attribute of the entity type wanted in the query item.

##### — This is a valid 

```json
{
  "person": {
    "type": "Person",
    "attr": [ "name", "nickname", "age" ]
  }
}
```

### <a name="5.3.5">5.3.5</a> Arguments

Arguments are provided to your Sage service to specify the parameters of your query.

-   For each argument in a query document :
    -   Let *argumentName* be the Name of argument.
    -   Let *argumentValue* be the value provided by the client in the query.
    -   Arguments are treated as a mapping of argument name to value. More than one argument with the same name in an argument set is ambiguous and invalid.

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

## <a name="response">5.5</a> Response

— Work in progress.

# <a name="reference-implementations">6</a> Reference Implementations

To clarify the desired and ideal outcome of this proposal, we built reference server and client implementations. Both of them should be ready-to-go and is used on the production at Dorkodu.

*— As of June 2, reference implementations are under development, but you should have a look at the links below for the real-time development progress. We appreciate your feedback.*

- ### Sage Server

    You can see [here](https://libre.dorkodu.com/sage.php) the reference server implementation written in PHP.

    **`GitHub`**  [dorkodu/sage.php](https://github.com/dorkodu/sage.php)

- ### Sage Client

    You can see [here](https://libre.dorkodu.com/sage.js) the reference client implementation written in JavaScript.

    **`GitHub`**  [dorkodu/sage.js](https://github.com/dorkodu/sage.js)

    > #### Note
    >
    > This document does not focus on and dictate any certain rules about the client. However, we have built a web client with JavaScript, for our own needs. And it can be considered as a *“reference”* for the community.

# <a name="conclusion">7</a> Conclusion

In this paper, we present Sage, which is in simple terms, a new way of data retrieval and API design. We first give an overview, then introduce our design principles, concepts behind Sage; after that we dive deeply into the components, type system, introspection, validation, execution and response. We believe that Sage can perform well in terms of both developer experience and performance under heavy production-load because of its simplicity, lightness and flexibility.

This paper can be interpreted as a whitepaper, or a proposal for the idea, or a not-officially-standardized specification.

# <a name="references">8</a> References

- **[Sage](https://libre.dorkodu.com/sage)**

    Sage’s website on Dorkodu Libre. There you can find more resources about Sage, and also the latest working draft of this paper.

- **[Dorkodu](https://dorkodu.com)**

    Who we are? We want to make human knowledge open, useful and meaningful for everyone. We hope you will hear more about us soon. If you are interested in our work, see our website. 

- **[Dorkodu Libre](https://libre.dorkodu.com)**

    Dorkodu Libre, the website for our contributions we make to the software community. You can find other awesome projects we work on. We try to do useful and meaningful things and make them open; then share our humble contributions with the community through open source software.

- **[Dorkodu on GitHub](https://github.com/dorkodu)**

    You can find our open source project repositories on GitHub.

- **[GraphQL](http://graphql.org)**

    I think I owe a thank to the GraphQL community. What they did was really exciting and changed the mindset of the industry about approaching to a fresh way of doing things.

    Also while writing this document, I was *heavily inspired by* their specification, especially for the document structure. I am *literally* just a kid, so it was really hard for me to do boring paperwork to publish an open standard before writing an actual implementation.

