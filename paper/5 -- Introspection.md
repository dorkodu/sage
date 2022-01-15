# <a name="introspection">5</a> Introspection

-   **[5.1 Schema Introspection](#5.1)**

A Sage server supports introspection over its schema. The schema can be queried using Sage itself.

*— For example, given a server with the following schema definition **:***

```css
entity User {
  id @attribute(integer, non-null);
  name @attribute(string, non-null);
  email @attribute(string);
}

entity Note {
  id @attribute(integer, non-null);
  content @attribute(string, non-null);
  author @link(User, non-null);
}
```

This sample introspection query

```json
{
  "introspect:User": {
    "typ": "User",
    "atr": ["@type", "@description", "@deprecated"],
    "lnk": {
      "@attributes": ["name", "description", "type", "nonNull"]
    }
  }
}
```

would return

```json
{
  "introspect:User": { 
    "@type": "User",
		"@description": "Represents the user entity type.",    
    "@deprecated": false,
    "$links": {
      "@attributes": [
        {
        	"name": "id",
          "description": "ID of a User.",
          "type": "integer",
       	  "nonNull": true
        },
        {
        	"name": "name",
          "description": "Name of a User.",
          "type": "string",
       	  "nonNull": true
        },
        {
        	"name": "email",
          "description": "Email of a User.",
          "type": "string",
       	  "nonNull": false
        }
      ]  
		}
  }
}
```

### Reserved Names

Entity types; their attributes, acts and links used by the Sage introspection system are prefixed with "**@**" *(commercial at)*, and special variable names are prefixed with ‘**$**’ *(dollar sign)*. We do this in order to avoid naming collisions with user‐defined Sage types. Conversely, type system authors must not define any type system artifact with a leading ‘**@**’ *(commercial at)*, and also ‘**$**’ *(dollar sign)*.

### Documentation

All types in the introspection system provide a `description` attribute of type *string* to allow type system designers to publish documentation in addition to data capabilities.

#### Deprecation

To support the efforts for backwards compatibility, any defined artifact of Sage type system (entity type, attribute, act or link) can indicate whether or not they are deprecated (`deprecated` **:** *boolean*) and a reason text of why it is deprecated (`deprecationReason` **:** *string*).

Tools built using Sage introspection should respect deprecation by discouraging deprecated use through information hiding or developer‐facing warnings.

>   If an Entity type is marked as deprecated, also all of its artifacts are treated as deprecated.

## <a name="5.1">5.1</a> Schema Introspection

The schema introspection system can be queried using its own *meta-schema*.

>   #### Note
>
>   This is a meta-schema, provided only for introspection of your Sage service. So it has only attributes and some links, and no acts. The user of a Sage implementation doesn’t have to define this schema. It must be available as built-in.

### `@Schema`

Contains meta-information related to your Sage schema.

#### Attributes

-   `entities` **:** A list (item type of *string*) of all defined Entity types’ names.

— We asked for the attribute `entities` on `@Schema` **:**

```json
{
  "schemaInfo": {
    "typ": "@Schema",
    "atr": ["entities"]
  }
}
```

— Here is the response :

```json
{
  "schemaInfo": {
    "entities": ["User", "Post"]
  }
}
```

### Introspection Binding

Sage offers *Introspection Binding*, which makes it possible to attach introspection queries directly to your regular queries by using meta attributes and links.

— For example, we requested for `@type` attribute, on `User` Entity type :

```json
{
  "doruk": {
    "typ": "User",
    "atr": ["@type", "name"], 
    "arg": {
      "id": 5
    }
  }
}
```

— Here is the response :

```json
{
  "doruk": {   
    "@type": "User",
    "name": "Doruk Eray"
  }
}
```

As seen in the example above, meta attributes can be used to get metadata about an Entity type definition.

#### `*`

 — Available for any user-defined Entity type.

#### Attributes

-   `@type` returns the *string* name of the queried Entity type.
-   `@description` may return a *string* description or *null*.
-   `@deprecated` returns *true* if queried Entity type should no longer be used, *false* otherwise.
-   `@deprecationReason` optionally provides a reason *string* why this is deprecated.

#### Links

-   `@attributes` represents the set of attributes defined on queried Entity type. 
    Must return an Entity Collection with item type of `@Attribute`.
-   `@acts` represents the set of acts defined on queried Entity type. 
    Must return an Entity Collection with item type of `@Act`.
-   `@links` represents the set of links defined on queried Entity type. 
    Must return an Entity Collection with item type of `@Link`.

>   #### Meta-Entity
>
>   A Meta-Entity type represents a value object which contains fields, but cannot be queried directly. They are used only in Sage’s introspection schema, and can not be declared/used by the user.

### `@Attribute`

The `@Attribute` Meta-Entity type represents each attribute in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `description` may return *string* or *null*.
-   `type` must return a *string* that represents the type of value returned by this field, or *null* if no constraint has been set.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

### `@Act`

The `@Act` Meta-Entity type represents each act in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `description` may return *string* or *null*.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

### `@Link`

The `@Link` Meta-Entity type represents each link in an Entity type.

#### Attributes

-   `name` must return a *string*.
-   `type` must return a *string*, which is the name of the linked Entity type.
-   `description` may return *string* or *null*.
-   `deprecated` returns *true* if this should no longer be used, otherwise *false*.
-   `deprecationReason` optionally provides a reason *string* why this is deprecated.

The query

```json
{
  "introspection:Post": {
    "typ": "Post",
    "atr": ["@type", "@description", "@deprecated"],
    "lnk": {
      "@attributes": ["name", "type"],
    	"@links": ["name", "type"]
    }
  }
}
```

will result in

```json
{
  "introspection:Post": {
    "@type": "Post",
    "@description": "Represents a Post object.",
    "@deprecated": false,
    "$links": {
      "@links": [
        {
          "name": "author",
          "type": "User"
        }
      ],
      "@attributes": [
         {
           "name": "id",
           "type": "integer"
         },
         {
           "name": "title",
           "type": "string"
         },
         {
           "name": "content",
           "type": "string"
         }
      ]
    }
  }
}
```