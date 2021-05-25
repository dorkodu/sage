# Sage

May 2021 - Working Draft

**`Author`**<br>  **Doruk Eray**<br>  Founder and Chief @ [Dorkodu](https://dorkodu.com).<br>  Self-taught Software Engineer.

  *Website **:*** [doruk.dorkodu.com](https://doruk.dorkodu.com)<br>  *Email **:*** [doruk@dorkodu.com](mailto:doruk@dorkodu.com)

---

## Contents

1. **[Introduction](#introduction)**
2. **[Overview](#overview)**
3. **[Principles](#principles)**
4. **[Concepts](#concepts)**
    1. **[Entity](#4.1)**
    2. **[Schema](#4.2)**
    3. **[Query](#4.3)**
5. **[Components](components)**
    1. **[Type System](#type-system)**
    2. **[Introspection](#introspection)**
    3. **[Validation](#validation)**
    4. **[Execution](#execution)**
    5. **[Response](#response)**
6. **[Notes](#notes)**
7. **[Reference Implementations](#implementations)**
8. **[Conclusion](#conclusion)**
9. **[References](#references)**

# <a name="introduction">1</a> Introduction

<img src="assets/sage-dark.png" alt="Sage Logo" style="width: 70%; margin: 0 auto;"/>

This is the proposal for Sage; a query-based, entity-focused data exchange approach originally created at Dorkodu to simplify the communication for data interactions between different layers of software, especially built for client-server applications. The development of this open standard started in 2020.

The latest working draft release can be found on [Sage’s website on Dorkodu Libre](https://libre.dorkodu.com/sage/).

### Copyright Notice

Copyright © 2020-present, [Dorkodu](https://dorkodu.com)

### Disclaimer

Your use of this “Proposal” may be subject to other third party rights. THIS PROPOSAL IS PROVIDED “AS IS.” The contributors expressly disclaim any warranties (express, implied, or otherwise), including implied warranties of merchantability, non‐infringement, fitness for a  particular purpose, or title, related to the Proposal. The entire risk as to implementing or otherwise using the Proposal is assumed by the Proposal implementer and user. IN NO EVENT WILL ANY PARTY BE LIABLE TO ANY OTHER PARTY FOR LOST PROFITS OR ANY FORM OF INDIRECT,  SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY CHARACTER FROM ANY  CAUSES OF ACTION OF ANY KIND WITH RESPECT TO THIS PROPOSAL OR ITS  GOVERNING AGREEMENT, WHETHER BASED ON BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### Conformance

A conforming implementation of Sage must fulfill all normative requirements. Conformance requirements are described in this document via both descriptive assertions and key words with clearly defined meanings.

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative portions of this document are to be interpreted as described in [IETF RFC 2119](https://tools.ietf.org/html/rfc2119). These key words may appear in lowercase and still retain their meaning unless explicitly declared as non‐normative.

A conforming implementation of Sage may provide additional functionality, but must not where explicitly disallowed or would otherwise result in non‐conformance.

### Non-normative Portions

All contents of this document are normative except portions explicitly declared as non‐normative.

> This is an example of a non-normative explanation, or author’s opinion.

Examples in this document are non‐normative, and are presented to help understanding of introduced concepts and the behavior of normative portions of the specification. Examples are either introduced explicitly in prose (e.g. “for example”) or are set apart in example or counter‐example blocks, like these :

```js
// This is an example of a non-normative code sample.
console.log("Hello, World!");
```

Code examples in this document are for providing real-life samples, but does not have to be from a real implementation. We created reference implementations, and recommend you checking out them.

> #### Example
>
> This is an example of a non-normative example.

Notes in this document are non‐normative, and are presented to clarify intent, draw attention to potential edge‐cases and pit‐falls, and answer common questions that arise during implementation. Notes are either introduced explicitly in prose (e.g. “**Note :**“) or are set apart in a note block, like this:

> #### Note
> This is an example of a non‐normative note.

# <a name="overview">2</a> Overview

Sage is a query-based, entity-focused data exchange *(or retrieval)* approach designed to simplify the communication for data interactions between different layers of applications by providing an expressive, intuitive and lightweight way. 

The primary goal was to develop a simpler way for inter-layer data interactions, but Sage is designed to be implemented as an isolated data exchange layer, which can also play an **API** role in your architecture.

For example, here is a sample Sage transaction *(request and response for a query)* ***:***

***— Query :***

```json
{
  "forrest": {
  	"type": "Movie",
  	"attr": ["name", "starring", "releaseYear"],
  	"args": {
 			"id": 5
  	}
	}
}
```

***— Result :***

```json
{
  "data": {
    "forrest": {
      "name": "Forrest Gump",
      "starring": "Tom Hanks",
      "relaseYear": 1994
    }
  }
}
```

In this example, we requested for a **Movie** entity with the argument **id: 5** and wanted attributes of **name**, **starring** and **releaseYear**. And as a result you got an object which contains only what you wanted.

# <a name="principles">3</a> Principles

Our priority is to keep Sage simple, approachable, easy-to-use and lightweight while solving data exchange problems efficiently. Here are some of our design principles :

## Some of Our Design Principles

- ### Agnostic About Your Application and Technology Stack

    Sage **never dictates** the use of *any programming language, platform, storage technique or even a query language like SQL or GraphQL*. It should be independent from other layers, also directly based on your business logic. 

    If we simplify how Sage works, it is like a middleware for data exchange between the layers of consumer (client) and service (server).

- ### Query-based Data Exchange

    Most problems in data exchange is experienced in the retrieval process between layers. *(e.g. client-server applications & APIs)* In order to solve this, Sage is ***query-based***, which is the ideal way. You can query your data, by *giving the desired attributes, and arguments for conditions*, and get only what you want. Even you can call remotely your Sage instance to do some work, by adding an **act** to your query item.

    Any data fetching and modification process imaginable can be developed with Sage. Especially in the product-side client applications, it would be a mindful choice to consume a Sage based API.

- ### Entity-focused Type System

    In modern software world, using data structurally as an “object” is the most common way, so Sage performs operations (e.g. data retrieval or modification) on a specific *“entity type”* . This entity type can be thought as a kind of "class" in OOP, with attributes (= properties) and acts (= methods) are defined and used on this entity type. You query for an object

- ### Product-centric

    Sage was primarily designed to solve the problems of the data consumer, front-end application developers. The main goal was to provide an *intuitive, neat, lightweight and easily applicable framework for simplifying the data exchange process* and ease the burden on developers and their software architecture. For this reason, Sage offers a naturally appropriate way for both client and server sides of your application.

- ### Client-first

    Through its simple but effective type system, a Sage instance publishes its data capabilities in an entity-focused way, which determines what its clients are allowed to consume. It is the client that should be able to specify exactly how it will consume that data. These queries are specified at attribute‐level granularity.

    In the majority of client‐server applications written without a similar way to Sage, most of which use REST, the server itself determines the data returned in its endpoints. But a Sage API, on the other hand, returns exactly what a client asks for and no more.

    An addition to that, with Sage, you can also define acts on an entity type, which can be called in a query. This is useful when you want to make changes on your data, or trigger your API to do something.


## So…

Because of these principles, Sage is a simple-to-use, flexible, lightweight but also powerful and productive way for application-centric data exchange. Product developers and designers can create applications a lot more effectively by working with a Sage API. Sage can quickly make your application stack enjoyable to work with. To enable that experience, there must be those that build those APIs and tools for the rest to use.

> This paper *(or proposal)* serves as a reference for engineers who will develop Sage implementations. It describes the approach, concepts, rules and components. The goal of this document is to provide a foundation and framework for Sage. We look forward to work with the community to improve this approach. 

# <a name="concepts">4</a> Concepts

Here we introduce some concepts and terms which you will need to understand well in order to understand and learn more deeply about Sage. Actually we do this because you may fall in love with Sage in first sight ;)

## <a name="4.1">4.1</a> Entity

Entities are at the core of the type system in Sage. You define your data as entities. You can think of entities like objects in OOP. 

Each entity can have any number of attributes and acts. Attributes are **key-value pairs**, while acts are **remote-callable methods** (which you can trigger them to do something, like updating the database).

- ### Attribute

    An attribute describes a property of this entity type. An attribute can be *any type* which **must be JSON serializable** *(a scalar, or an array/object following this rule).*

    An attribute will be retrieved by a resolver/retriever function defined by user, which Sage will pass the query object as a parameter.

    > #### Note
    >
    > Sage **does not** dictate that a resolver function will receive the query object as the *ONLY* parameter. If your implementation has additional functionality which requires to pass another parameter, you can do it.
    >
    > 
    >
    > **For example:** In our PHP implementation, you can define an optional ‘context’ array which you can use as a simple dependency container. Sage will pass that context value to resolver and act functions.

    *— Here is a pseudo example for defining attributes, in PHP :*

    ```php
    /*
     * A psuedo attribute definition, with a string type constraint.
     *
     * Description, constraints and other optional settings should be expressed as a 
     * map if possible. Like object literals in JS, or assoc arrays in PHP.
     */
    
    // Attribute(<name>, <resolver>, <options>)
    $attribute = new Attribute(
      'name',
      function ($query) {
    		$id = $query->argument('id');
      	$person = DataSource::getPersonById($id);
    		return $person->name;
    	},
      [
        'type'        => Type::string(),
        'description' => "Name of a person."
        'nonNull'     => true
      ]
    );
    ```

- ### Act

    An act is a function *(like a method)* that can be added to an entity type. An act is called in a query with *(optional)* arguments.

    An act is identified by a string name. It takes the query as a parameter. You can write your business logic code as acts and run any of them by calling it from a query.

    *— Here is a pseudo example for defining acts, in PHP :*

    ```php
    /*
     * A psuedo act definition.
     * Options should be expressed as a map, if possible.
     */
    
    // Act(<name>, <closure>, <options>)
    $act = new Act(
      "greet",
      function($query) {
    		$name = $query->argument('name');
        say("Hi, " . $name);
    	},
      [
        'description' => "Greets someone, takes 'name' as argument."
      ]
    );
    ```

## <a name="4.2">4.2</a> Query

Sage is a query-based approach for data exchange. 

The client requests the data it needs from a Sage service with a structured query document that is created according to certain rules. Basically, a query document contains a list of query items all of which describes an entity instance needed, with no limit on the number of query items. 

But how to query?

> #### Note
>
> Sage **does not** have a *special query language*.
>
> We think it is *unnecessary* to add this burden while being able to use one of the common formats. So we decided to use ***JSON***, which has advantages such as being *universal, lightweight and easy to use*. Also, JSON is commonly used in the software ecosystem, which means it has wide support *(such as tools, helper libraries)* on different languages and platforms.
>
> Thus, the query and the result are expressed using the JSON format. By using a universal format and not inventing a new query language, we keep Sage lightweight, easily approachable and implementable.

Each query item must be identified with a string name which must be unique within the query document, and expressed as a JSON object which the name points to.

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

### Query Item Structure

A query item contains at most 4 attributes. To have lightweight, compact query documents, attribute names are used in their shortened forms. **Type, Attributes, Act and Arguments.**

- #### **`type`**

    Entity type. A query item will be executed on its given type. This is the only required attribute.

- #### **`attr`**

    *(optional)* The string array of attribute names you want Sage to return. Each attribute is identified with its own *string name*.

    **You can set *“attr”* to an empty array, or even don’t define *“attr”* attribute.**

    - Empty array means an **empty result** object will be returned.
    - Not setting the attribute means **no result object** will be returned.

- #### **`act`**

    *(optional)* In addition to an entity’s attribute getters, Sage also can call for an *act* you defined, if you give its name in the query.

    This is an example query of adding a to-do, for the sake of simplicity :

    ```json
    {
      "AddToDo:101": {
        "type": "ToDo",
        "act": "addToDo",
        "args": {
          "userId": 101,
          "title": "Finish Sage's Whitepaper.",
          "deadline": "2021-05-20"
        },
        "attr": ["id", "user", "title", "isCompleted", "deadline"]
      }
    }
    ```

    This sample will add a to-do with given arguments, then return the desired attributes. Here is the result :

    ```json
    {  "AddToDo:101": {    "id": 12345,    "user": {      "id": "101",      "username": "doruk",      "name": "Doruk Eray"    },    "title": "Finish Sage's Whitepaper.",    "isCompleted": false,    "deadline": "2021-05-20"  }}
    ```

    > #### Note
    >
    > Sage does not handle these steps automatically. It’s the developer who must write the code required to add this to-do to data storage, also how to retrieve these attributes.

- #### **`args`**

    *(optional)* Arguments, a list of key-value pairs. They are no different than passing parameters to a function. You are providing arguments to your Sage API to specify “how” you want the data. They will be passed to all attribute getters *(and to the act if given in the query.)*

    > For example, let’s say you want the **`ToDo`** with the **`id`** of **`1234`**. If so, while you are querying you can give an **`id`** argument and set it to **`1234`**. On the other hand, in the resolver you would look for an id argument and fetch the User with the given id from the data source.

## <a name="4.3">4.3</a> Schema

Your Sage server’s data capability is defined by its data schema, which is just a list of entity types. That’s it. A list/array of all entity types you want to be available. Schema will be passed to Sage’s query executor. Any query document given to the execution engine will be run on this schema you define.

In this section we only introduced some concepts. You can find more details about components of Sage in the following sections of this document. 

# <a name="components">5</a> Components

Sage consists from following components :

- Type System
- Introspection
- Validation
- Execution
- Response

##  