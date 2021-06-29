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
  name @attribute(string, non-null);
  age @attribute(integer, non-null);
  favoriteBook @link(Book, non-null);
}

entity Book {
  title @attribute(string, non-null);
  publishYear @attribute(integer);
  author @link(Person, non-null);
}
```

`Person` entity type has attributes : 

-   `name` : **string** and **non-null**
-   `nickname` –no constraint–
-   `age` : **integer**

### <a name="5.3.1">5.3.1</a> Query

#### Query Document Structure

This section describes the structure of a Sage document, which is defined in *JavaScript Object Notation (JSON)* — [RFC7159](http://tools.ietf.org/html/rfc7159). 

Unless otherwise noted, objects defined by this specification shouldn’t contain any additional properties. Client and server implementations must ignore properties not recognized by this specification.

A JSON object must be at the root of every Sage request and response containing data. This object defines a document’s “top level”.

A query document must be a single JSON object, which contains a list of named query object. 

#### Query Object Structure

A query is described as an object, and contains some pre-defined fields. To have lightweight, compact query documents, field names are used in their shortened forms. **Type, Attributes, Acts, Arguments and Links.**

- #### **`type`**

    Entity **Type**. A query item will be executed on its given type. This is the only required attribute.

- #### **`attr`**

    *(optional)* **Attributes**, which determines the attributes you want Sage to return. Each attribute is identified with its own *string name*.

    **You can set *“attr”* to an empty array, or even don’t define *“attr”* attribute.**

    - Empty array means you want an **empty result object** to be returned.
    - Not setting the attribute means you want **no result object** to be returned.
    - A string containing only “asterisk” (*****) means you want **all attributes** to be returned.

- #### **`act`**

    *(optional)* **Act**, which can be called with the given arguments, just like attribute resolvers, with the exception that acts don’t return data.

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
        },
        "rel": {
        	"user": ["id", "username", "name"]
     		}
      }
    }
    ```

    This sample will add a to-do with given arguments, then return the desired attributes. Here is the result :

    ```json
    {
      "AddToDo:101": {
        "attr": {
        	"id": 12345,
        	"title": "Finish Sage's Whitepaper.",
        	"isCompleted": false,
        	"deadline": "2021-05-20"    
        },
        "rel": {
          "user": {
          	"id": "101",
          	"username": "doruk",
          	"name": "Doruk Eray"
        	},
        }
      }
    }
    ```

    > Sage does not handle these steps automatically. It’s the developer who writes the code required to save this To-do to data storage, also how to retrieve these attributes.

- #### **`args`**

    *(optional)* **Arguments**, a list of key-value pairs. They are no different than passing parameters to a function. You are providing arguments to your Sage API to specify “how” you want the data. They will be passed to all attribute resolvers *(and to the act if given in the query.)*

    > #### Example
    >
    > Let’s say you want the **`ToDo`** with the **`id`** of **`1234`**. If so, in your query, you can give an **`id`** argument and set it to **`1234`**. On the server side, in the attribute resolver function you would look for an id argument and fetch the `User` with the given id from the data source.

- #### **`link`**

    *(optional)* **Links**, a list of named and typed links to other entity types. They are like edges in a graph, where entity types are nodes. You can describe links between different entities.

    ```crystal
    (User)--[owner]-->(ToDo)
    ```

    > #### Example
    >
    > For example, let’s say you want the **`ToDo`** with the **`id`** of **`1234`**. If so, in your query, you can give an **`id`** argument and set it to **`1234`**. On the server side, in the attribute resolver function you would look for an id argument and fetch the `User` with the given id from the data source.
    >
    > ```json
    > {
    > "doruk": {
    >  "type": "User",
    >  "attr": ["name", "email", "age"],
    >  "rel": {
    >    "todos": []
    >  },
    >  "args": {
    >    "handle": "@doruk"
    >  }
    > }
    > }
    > ```

    

### <a name="5.3.2">5.3.2</a> Schema

— Work in progress.

Anything defined on the Sage schema must not have a name which begins with the character "**@**" *(commercial at)*.

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

## 