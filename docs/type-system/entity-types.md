# Entity Definition
Entity is the most frequently used primitive in a typical Sage application.

Conceptually Entity is a collection of type artifacts (attributes, acts and links).

In **Sage.php** Entity type is an instance of `Sage\Type\Definition\Entity` 
(or one of it subclasses) which accepts configuration array in constructor**:**

```php
<?php
namespace MyBlog;

use Sage\Type\Definition\Entity;
use Sage\Type\Definition\Type;
use Sage\Type\Definition\Attribute;
use Sage\Type\Definition\Link;

$User = new Entity([
  'name' => 'User',
	'attributes' => [
    'name' => new Attribute([
      'name' => "name",
      'type' => Type::string(),
    ]),
    'email' => new Attribute([
      'name' => "email",
      'type' => Type::string()
    ])
  ]
]);

$Post = new Entity([
  'name' => 'Post',
  'attributes' => [
    'content' => new Attribute([
      'name' => 'content',
      'type' => Type::nonNull(Type::string()),
      'resolve' => function () {
        
      }
    ])
  ]
  'links' => [
    'author' => $Author
  ]
]);

$Author = new Link([
  'name' => 'author',
  'type' => $User,
  'description' => 'Post author, in User type',
  'resolve' => function($referenceValue, $entity) {
		return [
      'reference' => $referenceValue,
      'authorId' => $entity->authorId
    ];
  }
]);
```

## Configuration options
Object type constructor expects configuration array. Below is a full list of available options:

Option       | Type     | Notes
------------ | ----- |------------ 
name         | `string` | **Required.** Unique name of this Entity type within Schema. 
attributes       | `array` or `callable` | An array describing attributes or a callable returning that array.<br><br>See [Artifacts](artifacts.md) for expected structure of each artifact definition. 
acts | `array` or `callable` | An array describing acts or a callable returning that array. 
links | `array` or `callable` | An array describing links or a callable returning that array. 
description  | `string` | Plain-text description of this type for clients (e.g. used by [GraphiQL](https://github.com/Sage/graphiql) for auto-generated documentation)
 deprecated        | `boolean`             | Boolean value determines whether this Entity is deprecated. 
 deprecationReason | `string`              | Text describing why this Entity type is deprecated. 
resolve | `callable` | function (contextInfo)<br> Given the **$value** of this type, it is expected to return value for a field defined in **$info->fieldName**. A good place to define a type-specific strategy for field resolution. See section on [Data Fetching](../data-fetching.md) for details. 
