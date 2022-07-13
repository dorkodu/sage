# Schema
## Schema Definition

The schema is the contract of your type system, which accepts types in a constructor and provides
methods for receiving information about your types to internal Sage tools.

In **Sage.php**, schema is an instance of [`Sage\Type\Schema`](../reference.md#Sage-Type-Schema) 
which accepts a configuration array in its constructor**:**

```php
<?php
use Sage\Type\Schema;
use MyApp\TypeLibrary;

$schema = new Schema([
  'entities' => [
    'Todo' => $Todo
  ],
  'typeLoader' => function ($name) {
		return TypeLibrary::entity($name);
	}
]);
```

Also methods for later configuration:


```php
$schema->setEntityTypes([
  'Todo' => $Todo
]);

$schema->setTypeLoader(
  function ($name) {
		return TypeRegistry::entity($name);
	}
);
```

The schema is simply a collection of all types you define and want to expose through your API.

```php
<?php
  
use Sage\Type\Definition\Entity;
use Sage\Type\Definition\Type;

$Todo = new Entity([
  'name' => 'Todo',
  'attributes' => [
    'title' => $title
  ]
]);

$title = new Attribute([
  'type' => Type::string(),
  'resolve' => function($referenceValue, ContextInfo $info) {
    $id = $referenceValue['todo.id'];
    return DataSource::getTodoById($id);
  }
]);
```

## Configuration Options
Schema constructor expects an array with following options:

Option       | Type     | Notes
------------ | -------- | -----
entities     | `Entity[]` | List of your schema's Entity types. 
typeLoader     | `callable` | **function (** *$name* **)** <br>Expected to return type instance given the name. Must always return the same instance if called multiple times. See section below on lazy type loading. 


## Lazy Loading of Types
By default, the schema will scan all of your type system definitions to serve Sage queries.
It may cause performance overhead when there are many types in the schema.

In this case, it is recommended to pass `typeLoader` option to schema constructor and define all 
of your types as callbacks.

Type loading concept is very similar to PHP class loading, but keep in mind that `typeLoader` must
always return the same instance of a type.


## Schema Validation
By default, the schema is created with only shallow validation of entity type and artifact definitions 
(because validation requires full schema scan and is very costly on bigger schemas).

But there is a special method **`assertValid()`** on schema instance which throws **`Sage\Error\InvariantViolation`** exception when it encounters any schema error.

Schema validation is supposed to be used in the build step of your app.
Don't call it in web requests in production.

Usage example **:**
```php
<?php

use Sage\Type\Schema;

try {
  $schema = new Schema();
  
  // Add entities to schema
  $schema->setEntityTypes([
    'Todo' => $Todo
	]);
  
	// Do NOT run this on production!
  $schema->assertValid();

} catch (Sage\Error\InvariantViolation $e) {
  echo $e->getMessage();
}
```
