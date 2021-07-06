# <a name="references">9</a> References

In this paper, we present Sage, which is a new way of data exchange and API design. We first give an overview, then introduce principles, concepts behind Sage; after that we dive deeply into its components. We believe that Sage can perform well in terms of both developer experience and performance under heavy production-load because of its simplicity, lightness and flexibility.

## Links

- **[Sage — libre.dorkodu.com/sage](https://libre.dorkodu.com/sage)**

    Sage’s website on Dorkodu Libre. There you can find more resources for learning and using Sage, and also the latest working draft of this paper.

- **[Dorkodu — dorkodu.com](https://dorkodu.com)**

    Who we are? We want to purify and liberate the human knowledge by making it open, useful and meaningful for everyone. We hope you will hear more about us soon. If you are interested in our work, see our website. 

- **[Dorkodu Libre — libre.dorkodu.com](https://libre.dorkodu.com)**

    Dorkodu Libre, the website where we present the contributions we make to the open source software community. You can find other awesome projects we work on. We try to do useful and meaningful things and make them open; then share our humble contributions with the community through open source software.

- **[Dorkodu on GitHub — github.com/dorkodu](https://github.com/dorkodu)**

    You can find our open source project repositories on GitHub.

## Reference Implementations

To clarify the desired and ideal outcome of this proposal, we work on our own reference server and client implementations. Both of them are used on the production, at Dorkodu.

*— As of July 10, reference implementations are under development, but you should have a look at the links below for the real-time development progress. We appreciate your feedback, of course :)*

- #### Sage Server

    You can see [here](https://github.com/dorkodu/sage.php) the reference server implementation, written in PHP.

    **`GitHub` :**  [dorkodu/sage.php](https://github.com/dorkodu/sage.php)

- #### Sage Client

    You can see [here](https://github.com/dorkodu/sage.js) the reference client implementation, written in JavaScript.

    **`GitHub` :**  [dorkodu/sage.js](https://github.com/dorkodu/sage.js)

    > #### Note
    >
    > This document does not focus on and specify any certain rules about clients. However, we develop a web client in JavaScript, for our own needs. And it can be considered as a *“reference”* for the community.

## Other

Also while writing this document, I was *heavily inspired by* some previous specifications, especially for the document structure. I am *literally* a kid (at least, when I am writing this, I am 16), so it was really hard for me to do boring paperwork to publish an open standard before developing an actual useful implementation.

Here they are **:**

- **[GraphQL](http://graphql.org)**

    I think I owe a thank to the GraphQL community. What they did was really exciting and changed the mindset of the industry about approaching to a fresh way of doing things.

- **[JSON:API](http://jsonapi.org)**

    JSON:API is really a great choice, if you are planning to choose the REST way. I am impressed by their efforts in which they still work to standardize and make it easy to use REST APIs with JSON.  