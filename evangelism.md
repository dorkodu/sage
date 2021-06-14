# Evangelism

This document is for the marketing messages of the Sage protocol, in which we aim promoting and widespread awareness and adoption of Sage.

## Key Messages

### Get only what you want

Send a Sage query to your API and get exactly what you need, nothing more and nothing less. Sage queries always return predictable results. Apps using Sage are fast and stable because they control the data they get, not the server.

### Get many resources in a single request

Sage queries are described as separate objects and composed into a single query document and sent once. While typical REST APIs require loading resources from multiple URLs, with Sage you can fetch all the data your app needs in a single request. You can scale your apps using a Sage API are quick even on poor network conditions.

### Describe your data with a schema

Sage APIs are structured in terms of entities—and their attributes, acts and relationships—not endpoints. Access the full capabilities of your data from a single endpoint. Sage uses the data schema to ensure apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.

### API evolution, not revolution

Change your Sage schema without impacting existing queries. Aging types can be deprecated. By using a single evolving version, Sage APIs give apps continuous access to new features and encourage cleaner, more maintainable server code.

### With your own code –business logic– and data

Sage creates a uniform API across your entire application without being limited by a specific storage engine. Build Sage APIs that leverage your existing data and code–business logic–with a Sage runtime. You provide functions for each attribute/act in the type system, and Sage calls them with optimal concurrency.

### Who’s using Sage?

We haven’t started marketing to spread the use of Sage. But for now, we are dedicated to keep it both simple and approachable for everyone.

Dorkodu’s web apps are all powered by Sage. We created Sage just because we needed something simple-to-use, lightweight and efficient which will also make us a lot more productive, and standardize the data exchange process. 

We are working to make Sage the industry-standard data exchange protocol for the Web 3.0, so we released it as open source. And for now, Sage is available primarily on the web stack. But since it’s pretty new, we really look forward working with the community to bring Sage to all other platforms.  

## Features

-   **Graph-like:** Most data-driven apps today focus on creation and manipulation of their data as entities and their relationships,  which is like the *graph* structure. To achieve congruence with the structure of these applications, a Sage query itself is a set of entity descriptions with their attributes, acts and relationships. The query determines the data it returns. It is a natural way for product engineers to describe data requirements.

-   **Product-centric:** Sage is driven by the requirements of front-end, product engineering. We start with their way of thinking and build the protocol necessary to enable that.

-   **Client-specified interactions:** In Sage, queries are specified at attribute-level granularity, in the *client* rather than the *server*. In the majority of applications written without Sage, the server determines the data returned in its various endpoints. A Sage query, on the other hand, does exactly what a client wants and no more.

-   **Backwards Compatible:** In a world of deployed native mobile applications with no forced upgrades, backwards compatibility is a challenge. Client-specified queries simplifies managing the  backwards compatibility guarantees.

-   **Structured, Arbitrary Code:** Sage instead imposes a structure onto a server, and exposes fields that are backed by *arbitrary code*. This allows for both server-side flexibility and a uniform, powerful API across the entire surface area of an application.

-   **Application-Layer Protocol:** Sage is an application-layer protocol and does not require a particular transport. It only specifies how to query/response in a standardized way.

-   **Flexible Types and Constraints:** Sage is *flex-typed*. *** 

    Given a query, tooling can ensure that the query is both syntactically correct and valid within the Sage type system before execution, i.e. at development time, and the server can make certain guarantees about the shape and nature of the response. It is especially useful in statically typed languages such as Swift, Objective-C and Java, as it obviates the need for repetitive and error-prone code to shuffle raw, untyped JSON into strongly-typed business objects. This makes it easier to build high quality client tools.

-   **Introspective:** Sage is introspective. Clients can query the data schema using the Sage itself. This provides a powerful platform for building tools and client software. 

## Why invent something new?

Obviously Sage is not the first system to manage client-server interactions. In today’s world there are two dominant architectural styles for client-server interaction: REST and GraphQL.

### REST

REST, an acronym for Representational State Transfer, is an architectural style rather than a formal protocol. There is actually much debate about what exactly REST is and is not. We wish to avoid such debates. We are interested in the typical attributes of systems that *self-identify* as REST, rather than systems which are formally REST.

Objects in a typical REST system are addressable by URI and interacted with using verbs in the HTTP protocol. An HTTP GET to a particular URI fetches an object and returns a server-specified set of fields. An HTTP PUT edits an object; an HTTP DELETE deletes an object; and so on.

We believe there are a number of weakness in typical REST systems, ones that are particularly problematic in mobile applications:

-   **Fetching complicated object graphs require multiple round trips between the client and server to render single views.** For mobile applications operating in variable network conditions, these multiple roundtrips are highly undesirable.
-   **Invariably fields and additional data are added to REST endpoints as the system requirements change.** However, old clients also receive this additional data as well, because the data fetching specification is encoded on the server rather than the client. As result, these payloads tend to grow over time for all clients. When this becomes a problem for a system, one solution is to overlay a versioning system onto the REST endpoints. Versioning also complicates a server, and results in code duplication, spaghetti code, or a sophisticated, hand-rolled infrastructure to manage it. Another solution to limit over-fetching is to provide multiple views – such as “compact” vs “full” – of the same REST endpoint, however this coarse granularity often does not offer adequate flexibility.
-   REST endpoints are usually weakly-typed and lack machine-readable metadata. While there is much debate about the merits of strong- versus weak-typing in distributed systems, we believe in strong typing because of the correctness guarantees and tooling opportunities it provides. Developers deal with systems that lack this metadata by inspecting frequently out-of-date documentation and then writing code against the documentation.
-   Many of these attributes are linked to the fact that “REST is intended for long-lived network-based applications that span multiple organizations” [according to its inventor](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven). This is not a requirement for APIs that serve a client app built within the same organization.

Nearly all externally facing REST APIs we know of trend or end up in these non-ideal states, as well as nearly all *internal* REST APIs. The consequences of opaqueness and over-fetching are more severe in internal APIs since their velocity of change and level of usage is almost always higher.

Because of multiple round-trips and over-fetching, applications built in the REST style inevitably end up building *ad hoc* endpoints that are superficially in the REST style. These actually couple the data to a particular view which explicitly violates one of REST’s major goals. Most REST systems of any complexity end up as a continuum of endpoints that span from “traditional” REST to *ad hoc* endpoints.

### Ad Hoc Endpoints

Many applications have no formalized client-server contract. Product developers access server capabilities through *ad hoc* endpoints and write custom code to fetch the data they need. Servers define procedures, and they return data. This approach has the virtue of simplicity, but can often become untenable as systems age.

-   These systems typically define a custom endpoint per view. For systems with a wide surface area this can quickly grow into a maintenance nightmare of orphaned endpoints, inconsistent tooling, and massive server code duplication. Disciplined engineering organizations can mitigate these issues with great engineering practices, high quality abstractions, and custom tooling. However, given our experience we believe that custom endpoints tend to lead to entropic server codebases.
-   Much like REST, the payloads of custom endpoints grow monotonically (even with mitigation from versioning systems) as the server evolves. Deployed clients cannot break, and, with rapid release cycles and backwards compatibility guarantees, distributed applications will have large numbers of extant versions. Under these constraints it is difficult to remove data from a custom endpoint.
-   Custom endpoints tend to – for a client developer – create a clunky, multi-language, multi-environment development process. No matter if the data has been accessed before in a different view, they are required to first change the custom endpoint, then deploy that code to a server accessible from a mobile device, and only then change the client to utilize that data. In Sage – unless the data in the view is completely new to the entire system – a product developer adds a field to a Sage query and the work on the client continues unabated.
-   Much like REST, most systems with custom endpoints do not have a formalized type system, which eliminates the possibility for the tools and guarantees that introspective type systems can provide. Some custom-endpoint-driven systems do use a strongly typed serialization scheme, such as Protocol Buffers, Thrift, or XML. Those do allow for direct parsing of responses into typed classes and eliminating boilerplate shuffling from JSON into handwritten classes. These systems are as not as expressive and flexible as Sage, and the other downsides of *ad hoc* endpoints remain.

We believe that Sage represents a novel way of structuring the client-server contract. Servers publish a data schema specific to their application, and Sage provides a unified way to exchange data within the constraints of that schema type system. Sage allows product developers to express data requirements in a form natural to them: a declarative and graph-like relational one.

This is a liberating platform for product developers. With Sage, no more contending with *ad hoc* endpoints or object retrieval with multiple roundtrips to access server data; instead an elegant, relational, declarative query dispatched to a single endpoint. No more frequent jumps between client and server development environments to do experimentation or to change or create views of existing data; instead experiments are done and new views built within a native, client development environment exclusively. No more shuffling unstructured data from *ad hoc* endpoints into business objects; instead a powerful, introspective type system that serves as a platform for tool building.

Product developers are free to focus on their client software and requirements while rarely leaving their development environment; they can more confidently support shipped clients as a system evolves; and they are using a protocol designed to operate well within the constraints of mobile applications. Product developers can query for exactly what they want, in the way they think about it, across their entire application’s data model.

### Why not GraphQL?

1.  [GraphQL queries could cause performance issues](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#1)
2.  [REST can do much of what GraphQL does](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#2)
3.  [GraphQL makes some tasks more complex](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#3)
4.  [It’s easier to use a web cache with REST than with GraphQL](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#4)
5.  [The way GraphQL schemas work could be a problem](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#5)
6.  [REST is better for error handling and tooling](https://blog.logrocket.com/why-you-shouldnt-use-graphql/#6)

## What’s next?

Over the coming months, we will share more technical details about Sage, including additional language features, tools that support it, and how it is built and used at Dorkodu. These posts will culminate in a formal specification of Sage to guide implementors across various languages and platforms. We also plan on releasing a reference implementation in the summer, in order to provide a basis for custom deployments and a platform for experimentation. We’re incredibly excited to share this system and work with the open source community to improve it.

## Using Sage is easy

### 1. Write a Sage API schema

Describe the API you want, then implement some functions that map your schema to your existing backends.

### 2. Explore your API

Once you write your first Sage query, you won't want to fetch data any other way. Use interactive tools to get the data you need.

### 3. Consume your data

Use your data and build apps faster than you thought possible, with any frontend technology or framework.

## Sage, REST, or both?

Sage can live right alongside your existing architecture investments and bring critical improvements to your workflow.

### No more client-specific endpoints

To make your REST API efficient, you often need to write endpoints tailored to a specific consumer. With Sage, each client can get just what it needs.

### Don't worry about outdated docs

Documentation and schemas for REST APIs can easily get out of date. In Sage, your schema is your contract - so you get automatically correct docs every time.

### Understand how your API is used

Consumers of your Sage API specify what they are going to use, giving you fine-grained understanding of exactly which fields are used and by whom.

## Sage Beyond the Hype

### With Great Power Comes Great Responsibility

There is a lot of content out there on building client side applications using Sage. Sage can offer an amazing client side experience, but for that to be true, we must be able to build high quality Sage platforms that will support these clients.

The simplicity with which clients can consume use cases using Sage is often balanced by additional complexity on the server. Learn how to manage this complexity and make sure you **keep providing a quality Sage API as your team or organization scales.**

### Language Agnostic

Sage is completely language agnostic and instead focuses on concepts and patterns that are achievable **no matter how you're building a Sage server. **Every language and every Sage implementation does things slightly differently. 

Think of it as a complete journey of what goes into building a Sage API, from design, to architectures, to implementation, and even documentation.

### So what is Sage? 

Maybe a good way to introduce it is by looking at what it is not: 

-   Sage is not some sort of query language 
-   Sage is not a library/framework
-   Sage is not about graph theory

Here’s how I like to describe it instead: **Sage is a specification for an API query language and a server engine capable of executing such queries.**

