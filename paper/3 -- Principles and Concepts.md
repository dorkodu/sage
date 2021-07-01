# <a name="principles-and-concepts">3</a> Principles and Concepts

-   **[3.1 Principles](#3.1)**
-   **[3.2 Concepts](#3.2)**
    -   **[3.2.1 Type System](#3.2.1)**
    -   **[3.2.2 Unified Query Layer](#3.2.2)**

## <a name="3.1">3.1</a> Principles

Our priority is to keep Sage simple, approachable, easy-to-use and lightweight while solving the major problems efficiently and providing a flexible & intuitive way. 

Sage has some design principles :

- ### Environment Agnostic

    Sage is completely environment agnostic, it **never dictates** the use of *any programming language, backend, storage technique or even a query language like SQL, GraphQL or SPARQL*. Instead, Sage focuses on concepts and patterns that are achievable **no matter how you're building a service.** Although every language and every Sage implementation does things slightly differently.

    It is just a specification about designing and building powerful APIs; from design, to architecture, to implementation, and even documentation.

- ### Query-based Data Exchange

    Sage is ***query-based***, which is the ideal way for data interactions. You query your data, by *declaring the attributes you want, and arguments for conditions*, then get only what you want. You can also call remotely your Sage service to do something, by adding an **act** to your query.

    Any data consumption and creation process imaginable can be implemented with Sage. Especially in product applications, it would be a mindful choice to consume a Sage based API.

- ### Entity-focused, Flexible Type System

    Every Sage server defines an application‐specific type system, and queries are executed within the context of it. A Sage instance publishes its data capabilities with an entity-focused schema, which determines what its clients are allowed to consume. Clients should be able to specify exactly how it will consume that data. These queries are specified at attribute‐level granularity.

    Sage performs operations *(e.g. data retrieval or modification)* on a specific *“entity type”* . An entity type can be considered like a "class" in *OOP*, with attributes *(or properties)* and acts *(or methods)* are defined on this *entity type*.

    #### Flex Types and Constraints

    Sage is *flex-typed*. By default, all values can be of any type within the Sage’s type system. However, we also know that sometimes *strong-typing* is desperately needed, or at least useful. Thus, Sage has *constraints*, which you can set for attributes to ensure their values will be of a specific type. This is why Sage can be *flexible* and *powerful* at the same time.

- ### Application-level Protocol

    Sage is an application-layer protocol and does not require or dictate a particular transport. It is a standard about how clients & services interact and exchange data, in a query-based and entity-focused way.

- ### Product-centric

    Sage is primarily designed to solve *data interaction* problems in product engineering. The main goal is to provide an *intuitive*, *neat*, *lightweight* and *easily applicable framework* for *simplifying the data exchange process* and easing the burden on developers and their application architectures. For this reason, Sage offers a natural way for *describing* *data requirements* and *consuming data capabilities*.

- ### Graph-like

    Most data-driven apps today focus on creation, consumption and evolution of their data. So with Sage you can describe your data as **entities** –with their *attributes*, *acts*– and their *links*, which is like a *graph* data structure. To achieve harmony with the structure of these applications, a Sage query is highly granular, which means you can determine the exact attributes, acts and links of an entity to work on.

## <a name="3.2">3.2</a> Concepts

Here we introduce some concepts and terms which you will need to understand well in order to learn more deeply about Sage.

>   #### What makes Sage a protocol?
>
>   Simply a protocol is a set of agreements on how to do something. Sage can be called as a **standard, approach, specification, protocol** etc. We just wanted to create a specified, structural way for building and designing APIs.

### <a name="3.2.1">3.2.1</a> Type System

#### Schema

Your Sage server’s data capability is defined by its data schema, which is just a set of defined types you want to be available to the consumers of your service. Schema will be passed to Sage’s query executor. Any query document given to the execution engine will be run on this schema you define.

#### Entity

Entities are at the core of the type system in Sage. You define your data as entities. You can think of entities like objects in OOP.

Each entity can have any number of ***attributes***, **acts** and **links**. Attributes are **key-value pairs**, acts are **methods/functions**—which you can remotely call in your query to do something, *e.g. updating the database.*— and links represent **relationships** between entity types.

- ##### **Attribute**

    An attribute describes a property of an entity, which…

    - can be of *any of the types* defined within Sage’s type system *(We will explain this in [Type System](#type-system))*
    - will be retrieved by a function defined by the service developer, and Sage will pass the query object as a parameter.

    > Sage **does not** dictate that a resolver function will receive the query object as the *only* parameter. If your implementation has additional functionality which requires to pass another parameter, you can do it.
    >
    > 
    >
    > **For example:** In our PHP implementation, you can define an optional ‘context’ array which you can use as a simple dependency container. Sage will pass that context value to resolver and act functions.
    
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

    This sample will add a to-do with given arguments, and *then* return the desired fields. 

    Here is the result :

    ```json
    {
      "AddToDo": {
        "id": 109264,
        "title": "Finish Sage's Whitepaper.",
        "isCompleted": false,
        "deadline": "2021-06-27",
        "$link": {
          "owner": {
          	"id": 5,
          	"username": "doruk",
          	"name": "Doruk Eray"
        	}
        }
      }
    }
    ```

    > Sage does not handle these steps automatically. It’s the developer who writes the code required to save this To-do item to data storage, and retrieve these fields.

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

Each query must be identified with a string name which must be unique within the query document, and expressed as a map which the name points to.

*— Below here is an example query, requesting a single entity :*

```json
{
  "doruk": {
    "typ": "User",
    "atr": ["name", "email", "age"],
    "lnk": {
      "studiesAt": ["name", "grade"]
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
        "studiesAt": {
          "name": "Vefa High School",
          "grade": 10
        }
      }
    }
  }
}
```

## So…

Because of these principles, Sage is a simple-to-use, flexible, lightweight but also powerful and productive way for designing and building application-centric data exchange layers. Product developers can create applications a lot more effectively and faster by working with a Sage API. Sage can quickly make your application stack enjoyable to work with.

In this section we only introduced some concepts. You can find the details about components of Sage in the following sections of this specification.

> This specification (we call it *the Paper*) serves as a reference for engineers who will, or want to, implement Sage. It describes the protocol, concepts, rules and components. The goal of this document is to provide a foundation and framework for Sage. We look forward to work with the community to improve this standard. 

