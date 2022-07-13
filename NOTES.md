# Notes

This is the notes section for authors’ opinion about non-normative parts of Sage. Some “must” or “must not” have features or the philosophy behind Sage are mentioned here. We will publish a separate notes document once we publish this paper.

### Sage is not a wrapper, but a middle layer.

Sage should only be positioned as a “middleware” data exchange layer, not a wrapper around a whole service stack.

### Some Features We Want

- **Declarative :** It must be the data consumer who declares what will they get. It must be the data service (or API) who declares its capability with a data schema.
- **Graph-like :** Data should be described like a graph. Instead of behaving like a giant data document, Sage behaves like a universal entity graph. Objects *(with properties and methods)* are at the core. You can interact with a Sage service like querying a virtual object data store.
- **Weak-typed :** Type restrictions on attributes should be optional, and a decision up to the developer. Not every definition needs strict types. With Sage, all attributes are weak-typed by default.

### Nullable Attributes

Any attribute is nullable by default. This is a golden rule which gives Sage one of its key strengths. When something goes wrong while retrieving an attribute, just return null and explain what happened in an additional section in response document. It’s not useful to abort and ignore the whole progress.

### Developing APIs with Sage

You can develop awesome HTTP based APIs using Sage. This was our goal while designing the Sage.

While creating an API with Sage, you must follow these principles :

- Your API should be queried from a single endpoint. Sage queries are sent with a JSON body via POST requests, so you just need one URL. 

    For example: https://api.website.com, or https://api.website.com/sage in case you also have GraphQL/REST APIs. Don’t forget that Sage never dictates the usage of any particular URL. This is just an example.

- Send & receive queries as POST requests.

    > #### NOTE 
    >
    > **Sage should be independent from Transportation, Storage and Auth* layers.** Sage should be used as an independent library from other layers of your application. It’s just a mapping layer of your business logic code for your data.
    >
    > It’s up to the developer deciding how to pass the query document to Sage’s execution engine, and write the arbitrary code for fetching data from other sources. 
    >
    > **This is a golden principle to keep Sage a lightweight and flexible approach.**
    >
    > For example, you possibly want to use authentication for your API, then you should develop your auth* logic as an independent layer, in front of Sage.
    >
    > 
    >
    > (* *Auth* **:** Authentication / Authorization)

- Pagination is not a topic covered by Sage. While Sage does not dictate any rules on pagination, it can be handled with query arguments.

- There is no need to version your APIs. Making changes does not break the rest of your API.
