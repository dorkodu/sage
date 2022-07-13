# Getting Started

## Prerequisites

This documentation assumes your familiarity with Sage concepts. If it is not the case - 
first learn about Sage on [the website](http://libre.dorkodu.com/sage/).


## Hello World
Let's create a type system that will be capable to process following simple query**:**

```json
{
  "typ": "Person",
  "atr": ["name"],
  "arg": {
    "id": 1
  }
}
```

To do so we need an Entity type `Person` with the attribute `name` **:**

```php
<?php

use Sage\Type\Definition\Entity;
use Sage\Type\Definition\Type;

# Define the Entity type 'Person'
$Person = new Entity([
  'name' => "Person",
  'attributes' => [
    'name' => $name,
  ],
  'resolve' => function ($query, $context) {
    $id = $query->argument('id');
    return [
      'id' => $id,
      'dataSource' => $context['dataSource']
    ];
  }
]);

# Define the attribute 'name'
$name = new Attribute([
  'name' => 'name',
  'resolve' => function ($referenceValue) {
		$id = $referenceValue['id'];
  	$person = DataSource::getPersonById($id);
		return $person->name;
  },
  'type'        => Type::string(),
  'description' => "Name of a person."
]);
```

The interesting piece here is **resolve** option of Entity type definition. It is responsible for returning 
a reference value, which will be used by artifact resolvers.

Now when our type is ready, let's create Sage endpoint file for it **:**

```php
<?php
use Sage\Sage;
use Sage\Type\Schema;

$schema = new Schema([
  'Person' => $Person
]);

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
$query = $input['query'];

try {
  $options = [];
  $context = [
    'dataSource' => DataSource::getInstance()
  ];
  $result = Sage::execute($schema, $document, $context, $options);
  $output = $result->toArray();
} catch (\Exception $e) {
  $output = [
  	'errors' => [
    	[
      	'message' => $e->getMessage()
		  ]
    ]
  ];
}

header('Content-Type: application/json');
echo json_encode($output);
```


Continue reading about [schema definition](type-system/index.md).
