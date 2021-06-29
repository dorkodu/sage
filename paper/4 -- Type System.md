#  <a name="type-system">4</a> Type System

-   **[4.1 Schema](#4.1)**
-   **[4.2 Types](#4.2)**
    -   **[4.2.1 Scalar Types](#4.2.1)**
    -   **[4.2.2 Object](#4.2.2)**
    -   **[4.2.3 List](#4.2.3)**
    -   **[4.2.4 Entity](#4.2.4)**
    -   **[4.2.5 Entity Collection](#4.2.5)**
-   **[4.3 Constraints](#4.3)**
    -   **[4.3.1 Strict Type](#4.3.1)**
    -   **[4.3.2 Non-Null](#4.3.2)**
-   **[4.4 Documentation](#4.4)**
    -   **[4.4.1 Description](#4.4.1)**
    -   **[4.4.2 Deprecation](#4.4.2)**

Sage type system describes the capabilities of a Sage service and is used to determine if a query is valid and how to response to it.

## <a name="4.1">4.1</a> Schema

A Sage service’s data capabilities are referred to as that service’s “*schema*”.

A schema is defined as a set of types it supports.

A Sage schema must itself be internally valid.

All entity types defined within a Sage schema must have *unique, string names*. No two provided entity types may have the same name. No provided type may have a name which conflicts with any built in types.

All artifacts *(entities; their attributes, acts and links)* defined within a schema must not have a name which begins with **`@`** *(commercial at)* or **`$`** *(dollar sign)*, as these are used exclusively for Sage’s type system internals.

## <a name="4.2">4.2</a> Types

The fundamental unit of any Sage schema is the *type*.

### <a name="4.2.1">4.2.1</a> Scalar Types

The most basic type is a *Scalar*.

Scalar types represent primitive values *(e.g. integer)* in the Sage type system.

All Sage scalars are representable as strings, though depending on the response format being used, there may be a more appropriate primitive for the given scalar type, and server should use those types when appropriate.

##### Result Coercion

A Sage server, when resolving the value of a given scalar type, must uphold the contract the scalar type describes, either by coercing the value or producing an *attribute error* if a value cannot be coerced or if coercion may result in data loss.

A Sage service may decide to allow coercing different internal types to the expected return type. For example when coercing a attribute of type `int` or a `boolean` true value may produce `1` , or a string value `"123"` may be parsed as base‐10 `123`. However if internal type coercion cannot be reasonably performed without losing information, then it must raise an *attribute error*.

Since this coercion behavior is not observable to clients of a Sage service, the precise rules of coercion are left to the implementation. The only requirement is that a Sage service must yield values which adhere to the expected Scalar type.

Sage supports a basic set of well‐defined Scalar types. A Sage service should support all of these types, and if provides a type by these names, it must adhere to the behavior described below.

> By default, all attributes are **flex-typed**, which means their values can be any type defined in Sage’s type system, provided that they are valid in the output response format. 
>
> Also we have a concept called **“constraints”**. Oftentimes it is useful to add a constraint to an attribute, like **strict-type**. For example, strict-type constraint allows the schema to specify exactly which data type is strictly expected from a specific attribute.

#### Integer

The integer scalar type represents a signed 32‐bit numeric non‐fractional value. Response formats that support a 32‐bit integer or a number type should use that type to represent this scalar.

##### Result Coercion

Attributes returning the *integer* type expect to encounter **32‐bit** integer internal values. 

Sage servers may coerce non‐integer internal values to integers when reasonable without losing information, otherwise they must raise an *attribute error*. Examples of this may include returning `1` for the floating‐point number `1.0`, or returning `123` for the string `"123"`. In scenarios where coercion may lose data, raising an attribute error is more appropriate. For example, a floating‐point number `1.2` should raise an attribute error instead of being truncated to `1`.

If the integer internal value represents a value less than **-2^31^** or greater than or equal to **2^31^**, an attribute error should be raised.

>   #### Note
>
>   Numeric integer values larger than 32‐bit can use string type, as not all platforms and transports support encoding integer numbers larger than 32‐bit.

#### Float

The float scalar type represents signed double‐precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). Response formats that support an appropriate double‐precision number type should use that type to represent this scalar.

##### Result Coercion

Attributes returning the *float* type expect to encounter double‐precision floating‐point internal values.

Sage servers may coerce non‐floating‐point internal values to *float* when reasonable without losing information, otherwise they must raise an *attribute error*. Examples of this may include returning `1.0` for the integer number `1`, or `123.0` for the string `"123"`.

#### String

The string scalar type represents textual data, represented as UTF‐8 character sequences. The string type is generally used to represent free‐form human‐readable text. All response formats must support string representations, and that representation must be used here.

##### Result Coercion

Attributes returning the *string* type expect to encounter UTF‐8 string internal values.

Sage servers may coerce non‐string raw values to string when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning the string `"true"` for a boolean true value, or the string `"1"` for the integer `1`.

#### Boolean

The boolean scalar type represents `true` or `false`. Response formats should use a built‐in boolean type if supported; otherwise, they should use their representation of the integers `1` and `0`.

##### Result Coercion

Attributes returning the *boolean* type expect to encounter boolean internal values.

Sage servers may coerce non‐boolean raw values to *boolean* when reasonable without losing information, otherwise they must raise an attribute error. Examples of this may include returning `true` for non‐zero numbers.

### <a name="4.2.2">4.2.2</a> Object

A Sage object…
-   represents a set of named fields
    -   each of which yield a value of a valid type within the Sage type system. 
-   should be serialized as a map
    -   where the field names are keys and the results of evaluating fields are values.

#### Result Coercion

Sage servers must return a *map* as the result of an object type. Although each field in the object must yield a valid value in Sage’s type system and chosen response format; there is no more restriction for an object’s fields.

### <a name="4.2.3">4.2.3</a> List

A Sage list…

-   is a special collection type
    -   which declares the type of each item in the List (referred to as the *item type* of the list). 
-   is serialized as an ordered list
    -   where each item in the list is serialized as per the item type.

To denote that an attribute uses a List type, the item type also must be specified; and it will behave like a type constraint.

#### Result Coercion

Sage servers must return an ordered list as the result of a list type. Each item in the list must be the result of the item type coercion. If a reasonable coercion is not possible it must raise an attribute error. In particular, if a non‐list is returned, the coercion should fail, as this indicates a mismatch in expectations between the type system and the implementation.

If a list’s item type is nullable, then errors occurring during preparation or coercion of an individual item in the list must result in the value `null` at that position in the list along with an error added to the response. If a list’s item type is non‐nullable, an error occurring at an individual item in the list must result in an attribute error for the entire list.

>   For more information on the error handling process, see [Execution](#execution).

### <a name="4.2.4">4.2.4</a> Entity

Entities are at the heart of the Sage’s type system. They represent sets of…

- #### Attributes

    Each of which…

    - represents a property of an Entity.
    - is identified by a *string* name.
    - yields a value.
        - Optionally, a value of a desired type that is specified as a [constraint](#4.3).
        - It is resolved by a function which takes the query object as a parameter, and returns the value.

- #### Acts

    Each of which…

    - represents a specific business logic related to an Entity type.
    - is identified by a *string* name.
    - is a function
        - that can be called with a query *(And the query is passed as a parameter to it, just like an attribute resolver function. The only difference is that an act does not yield a value.)*.

- #### Links

    Each of which…

    - represents a typed and directed *to-one (Entity)* or *to-many (Entity Collection)* relationship.

        - An Entity/Entity Collection type that the link is connected to, must be specified. 
        - They are like edges in a graph, where entities are nodes.
    - is identified by a *string* name.
    - is resolved by a function which takes the query object and the resolved entity as parameters, and returns an arguments map.
        - Sage will use the returned arguments for querying the Entity type which the link points to.

> #### Note
>
> Sage queries are **not hierarchical**. You request for entities individually.
>
> We want to handle every single entity separately. By doing so we try to provide as much granularity as possible. This becomes very useful if you think in terms of a *“knowledge graph”*, where you don’t embed relationships with other entities, instead you just give links to them. This is why Sage also has *links*.

For example, a `Person` entity type could be described as **:**

*— Just to clarify our examples and make them easily understandable, here we introduce this hypothetical, pseudo **SDL**; which we use only here and at the documentation for language-agnostic examples* :

[^SDL]: Schema Definition Language

```css
entity Person {
  id @attribute;
  name @attribute(string);
  age @attribute(integer);
}
```

Where `name` is an attribute that will yield a **string** value, while `age` will yield an **integer** value. And `id` is a flex-typed attribute, which means it has no restrictions for its return value.

> Do not forget that **strict-types or any other constraint is optional**. You do not need to set a type constraint for each attribute you define. Here we did not dictate any expectation for the value of `id` attribute.

Only attributes, acts and links which are declared on that entity type may validly be queried.

For example, selecting all the attributes of a `Person` :

```json
{
  "someone": {    
    "type": "Person",    
    "attr": "*", 
    "args": {   
      "id": 10
    }
  } 
}
```

Would yield the object :

```json
{
  "someone": {
    "id": 10,
    "name": "Doruk Eray",
    "age": 17
  }
}
```

While selecting a subset of attributes :

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

Must only yield exactly that subset :

```json
{
  "someone": {  	
    "name": "Doruk Eray"	
  }
}
```

We see that an attribute of an entity type may be a scalar type, but it can also be a **list** or **object**.

For example, the `Person` type might include an `occupation` attribute with the type *object* **:**

```css
entity Person {
  id @attribute;
  name @attribute(string);
  age @attribute(integer);
  occupation @attribute(object);
}
```

And let’s say we only requested for the `occupation` attribute. Here it returns an *object* value **:**

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

But sometimes a relationship should also be represented, this is the reason why Sage also has *links*. Here we define a link named `favoriteBook`, which points to the `Book` Entity.

```css
entity Person {
  id @attribute;
  name @attribute(string);
  age @attribute(integer);
  occupation @attribute(object);
  favoriteBook @link(Book);
}

entity Book {
  name @attribute(string);
	publishYear @attribute(integer);
}
```

And here we requested for also a link, `favoriteBook`, as well :

```json
{
  "someone": {
    "type": "Person",
    "attr": ["name", "age"],
    "link": {
      "favoriteBook": ["name"]
    },
    "args": {
      "id": 10
    }
  } 
}
```

This is the response :

```json
{
  "someone": {
    "name": "Doruk Eray",
    "age": 17,
    "$link": {
      "favoriteBook": {
        "name": "Nutuk"
      }
    }
  }
}
```

#### Attribute Ordering

When querying an Entity, the resulting mapping of fields are conceptually ordered in the same order in which they were encountered during query execution.

Response serialization formats capable of representing ordered maps should maintain this ordering. Serialization formats which can only represent unordered maps (such as JSON) should retain this order textually. That is, if two fields `["foo", "bar"]` were queried in that order, the resulting JSON serialization should contain `{"foo": "...", "bar": "..."}` in the same order.

Producing a response where fields are represented in the same order in which they appear in the request improves human readability during debugging and enables more efficient parsing of responses if the order of properties can be anticipated.

#### Result Coercion

Determining the result of coercing an entity is the heart of the Sage executor, so this is covered in that section of the specification.

### <a name="4.2.5">4.2.5</a> Entity Collection

Entity Collection is a special set type which contains only items of a specific Entity type.

All rules defined in an Entity type are kept in its Collection definition. Each of the items in a collection and their attributes must be valid within the specified Entity type.

The difference :

-   While defining an Entity Collection, an Entity type must be specified for its item type.
-   For each attribute, an overriding resolver must be defined, which must return an ordered *List* of values. After resolving all requested attributes, those *Lists* are merged together and maps are constructed based on their indexes.

>   An Entity Collection behaves as a wrapper type around an existing Entity type. It only overrides an Entity type’s attribute resolvers, and its purpose is to make retrieval of multiple instances of a specific Entity type at the same time possible.

Here we define a To-do Entity type :

```css
entity Todo {
  id @attribute(integer);
  title @attribute(string);
}
```

Let’s assume this is what `id` and `title` attribute resolvers returned *(in JSON)* :

```json
{
  "id": [ 1, 2, 3 ],
  "title": [
    "Do this, do that...",
    "Eat out with friends",
    "Complete the website design of Sage"
  ]
}
```

Merge operation would result in a set of objects, each of which is an instance of the specified Entity type :

```json
[
  {
    'id': 1,
    'title': "Do this, do that..."
	},
  {
    'id': 2,
    'title': "Eat out with friends."
	},
  {
    'id': 3,
    'title': "Complete the website design of Sage."
	}
]
```

#### Result Coercion

Sage servers must return a list as the result of an Entity Collection type. Each item in the list must be a map which represents an instance of the specified Entity type, and contains only the requested attributes. If a reasonable coercion is not possible, it must raise an attribute error. In particular, if a non‐list is returned, the coercion should fail, as this indicates a mismatch in expectations between the type system and the implementation.

If the collection’s Entity type is nullable, then errors occurring during preparation or coercion of an individual item in the list must result in the value **null** at that position in the list along with an error added to the response. If a collection’s Entity type is non‐null, an error occurring at an individual item in the list must result in an attribute error for the entire list.

## <a name="4.3">4.3</a> Constraints

### <a name="4.3.1">4.3.1</a> Strict-type

All attributes are flex-typed by default. This means they can be of any type which is valid within defined types in Sage’s type system.

But optionally you can set strict-type constraints for an attribute. In that case, he resolver function of that attribute must return a valid value of that specific type you want.

Anyway, Sage will try to coerce the returned value to the desired type if possible.

These are all possible types which you can set as a strict-type constraint **:**

- **boolean**
- **integer**
- **string**
- **float**
- **object** (must be represented as a map–a set of key-value pairs)
- **list** (must be represented as an array of a specific typed item)

### <a name="4.3.2">4.3.2</a> Non-Null

By default, all values in Sage are **nullable**; which means the **null** value is a valid response for all of the above types. To declare a type that disallows null, the *Non‐Null* constraint can be used. This constraint wraps an underlying type, and acts identically to that wrapped type, with the exception that **null** is not a valid response for the wrapping type.

> Think about the ‘**age**’ attribute of a ‘**Person**’. In real life; it is an *integer*, and *non-null*. If you set these constraints for *‘age’* attribute, it must return a non-null, integer value.

#### Nullable vs. Optional

Attributes are *always* optional within the context of a query, an attribute may be omitted and the query is still valid. However attributes that return Non‐Null types will never return the value **null** if queried.

#### Result Coercion

In all of the above result coercions, **null** was considered a valid value. To coerce the result of a Non‐Null type, the coercion of the wrapped type should be performed. If that result was not **null**, then the result of coercing the Non‐Null type is that result. If that result was **null**, then an attribute error must be raised.

## <a name="4.4">4.4</a> Documentation

Documentation is a boring part of API development. But it turned out to be a killer feature when we decided that any Sage service should be able to publish its documentation easily.

### <a name="4.4.1">4.4.1</a> Description

To allow Sage service designers easily write documentation alongside the capabilities of a Sage API, descriptions of Sage definitions are provided alongside their definitions and made available via introspection. Although descriptions are completely optional, we think they are really useful.

All Sage type definitions which can be described should provide a description unless they are considered self descriptive.

### <a name="4.4.2">4.4.2</a> Deprecation

Entities, attributes or acts may be marked as *“deprecated”* as deemed necessary by the application. It is still legal to query for these attributes or acts (to ensure existing clients are not broken by the change), but they should be appropriately treated in documentation and code.

This must be handled just like setting optional constraints on attributes. As simple as declaring the ‘**deprecated’** setting as **true**.