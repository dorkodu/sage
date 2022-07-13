# Built-in Scalar Types
Sage specification describes several built-in scalar types. In **Sage.php** they are 
exposed as static methods of [`Sage\Type\Definition\Type`](../reference.md#Sagetypedefinitiontype) class**:**

```php
<?php
use Sage\Type\Definition\Type;

// Built-in Scalar types:
Type::string();  // String type
Type::int();     // Int type
Type::float();   // Float type
Type::boolean(); // Boolean type
Type::id();      // ID type
```
Those methods return instances of `Sage\Type\Definition\ScalarType` (actually one of subclasses).
Use them directly in type definitions, or wrap in your [TypeRegistry](index.md#type-registry) (if you use one).

# Writing Custom Scalar Types
In addition to built-in scalars, you can define your own scalar types with additional validation. 
Typical examples of such types are **Email**, **Date**, **URL**, etc.

In order to implement your own type, you must understand how scalars are presented in Sage.
Sage deals with scalars in following cases**:**

1. When converting **internal representation** of value returned by your app (e.g. stored in a database 
or hardcoded in the source code) to **serialized** representation included in the response.

2. When converting argument values passed by a client along with Sage query to 
  **internal representation** of your app.


Here is an example of a simple **Email** type**:**

```php
<?php
use Sage\Type\Definition\CustomScalarType;

$emailType = new CustomScalarType([
  'name' => 'Email',
  'serialize' => function($value) {
    // Assuming internal representation of email is always correct:
    return $value;
  },
  'parseValue' => function($value) {
    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
      throw new Error("Cannot represent following value as email: " .
        Utils::printSafeJson($value));
    }
    return $value;
  }
]);
```
