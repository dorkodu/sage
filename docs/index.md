# Documentation — Sage.php

Sage is a query-based data-exchange protocol for designing and building better APIs, and a specification about how to exchange data in a query-based way and a runtime capable of executing those queries with your existing business logic and data.

Sage is created at [Dorkodu](https://dorkodu.com), by [Doruk Eray](https://doruk.dorkodu.com).

Great overview of the features and benefits of Sage is presented on [its website](http://libre.dorkodu.com/sage).


## About

**sage.php** is a feature-complete reference implementation of the Sage protocol, in PHP. 

This library is a thin middleware on top of your existing data and business logic layers. It doesn't dictate how these layers are implemented or which storage engines are used. Instead, it provides the utility for creating an awesome API for your existing app.

Library features include:

 - A [Type System](type-system/index.md) to express your app’s data.
 - Validation and introspection of this Type System
 - Parsing, validating and [executing Sage queries](executing-queries.md) against this Type System
 - Rich [error reporting](error-handling.md), including query validation and execution errors
 - Tools for [batching requests](data-fetching.md#solving-n1-problem) to backend storage

## Current Status
This library is under development as July 27th 2021.

The goal with the first version is to support all features described by Sage specification as well as some experimental features.

We work really hard and look forward to see **Sage** being ready for real-world usage. 

## GitHub
Project source code is [hosted on GitHub](https://github.com/dorkodu/sage.php).
