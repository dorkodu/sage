# <a name="introspection">5</a> Introspection

A Sage server supports introspection over its schema. The schema is queried using Sage itself.

Take an example query, there is a User entity with three fields: *id*, *name*, and *age*.

*— for example, given a server with the following type definition :*

```css
entity User {
  id @integer @nonNull;
  name @string @nonNull;
  age @integer;
  email @string;
}
```

The query

```json
{
  "example": {
    "type": "@Entity",
    "attr": [ "name", "attributes", "description", "isDeprecated" ], 
    "args": {
      "name": "User"
    }
  }
}
```

would return

```json
{
  "example": {   
    "name": "User",    
    "attributes": {   
      "id": {        
        "type": "int",
        "nonNull": true
      },
      "name": {        
        "type": "string",
        "nonNull": true
      },
      "age": {        
        "type": "int",
      }
		},
    "description": "The user entity type.",    
    "isDeprecated": false
  }
}
```

### Reserved Names

Entity types, attributes and acts required by the Sage introspection system are prefixed with "**@**" *(at symbol)*. We do this in order to avoid naming collisions with user‐defined Sage types. Conversely, type system authors must not define any entity types, attributes, acts, arguments, or any other type system artifact with a leading ‘**@**’ *(at symbol)*.

### Documentation

All types in the introspection system provide a `description` attribute of type **string** to allow type system designers to publish documentation in addition to data capabilities.

#### Deprecation

To support the effort for backwards compatibility, any piece of Sage type system (entity type, attribute and act) can indicate whether or not they are deprecated (**isDeprecated :** *boolean*) and a description of why it is deprecated (**deprecationReason :** *string*).

Tools built using Sage introspection should respect deprecation by discouraging deprecated use through information hiding or developer‐facing warnings.

## <a name="5.1">5.1</a> Schema Introspection

The schema introspection system can be queried using its schema. The user of a Sage implementation doesn’t have to write this schema. It must be available as built-in.

— The schema of the Sage introspection system, written in our *pseudo* SDL **:**

```scss
collection @Schema typeof @Entity

entity @Entity {
  name: @string @nonNull
  description: @string
  attributes: @list( @entity("@Attribute") ) @nonNull
	acts: @list( @entity("@Act") )
  typekind: @string
  isDeprecated: @boolean
  deprecationReason: @string
}

entity @Attribute {
  name: @string @nonNull
  description: @string
  type: @enum("@Type")
  nonNull: @boolean
  isDeprecated: @boolean
  typekind: @string
  deprecationReason: @string
}

entity @Act {
  name: @string @nonNull
  description: @string
  isDeprecated: @boolean
  deprecationReason: @string
}
```

### Type Kinds

There are three different kinds of types. These kinds are listed in the `@TypeKind` enumeration.

#### Scalar

Represents scalar types such as **Int, String, Float and Boolean**. Scalars cannot have any fields or items.

A Sage type designer should describe the data format and scalar coercion rules in the description attribute of any scalar.

#### Object

Object types represent concrete instantiations of sets of fields.

#### List

Lists represent sequences of values in Sage. A List type is a type modifier: it wraps another type instance in the `ofType` attribute, which defines the type of each item in the list.

### The `@Schema` Type

Represents the Sage schema. Contains only a single attribute, “entities”.

#### Attributes

-   `entities` **:** must return a List of type `@Entity`.

### The `@Entity` Type

Represents Entity types in Sage. Contains a set of defined attributes.

#### Attributes

-   `name` **:** must return a *String*.
-   `description` **:** may return a *String* or **null**.
-   `attributes` **:** The set of attributes query‐able on this entity type.
    -   Accepts the argument `includeDeprecated` which defaults to **false**. If **true**, deprecated fields are also returned.
-   `acts` **:** The set of acts query‐able on this entity type.
    -   Accepts the argument `includeDeprecated` which defaults to **false**. If **true**, deprecated fields are also returned.
-   `typekind` **:** must return the `OBJECT` value of `@TypeKind` enumeration.
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.

### The `@Attribute` Type

The `@Attribute` type represents each attribute in a specific Entity type.

#### Attributes

-   `name` **:** must return a *String*
-   `description` **:** may return a *String* or **null**
-   `type` **:** must return a value of  `@Type` enum that represents the type of value returned by this attribute.
-   `typekind` **:** must return a value of `@TypeKind` enum that represents the type kind of value returned by this attribute.
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.

### The `@Act` Type

The `@Act` type represents an act in a specific Entity type.

#### Attributes

-   `name` **:** must return a *String*
-   `description` **:** may return a *String* or **null**
-   `isDeprecated` **:** returns **true** if this attribute should no longer be used, otherwise **false**.
-   `deprecationReason` **:** optionally provides a reason why this attribute is deprecated.
-   All other attributes must return **null**.