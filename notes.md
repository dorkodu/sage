# Notes

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

