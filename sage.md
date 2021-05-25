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

