# Code Samples

Here we share the code samples which can help you better understand some concepts of Sage. All of them are fictitious and do not have to be taken from a reference implementation. 

## Sage Server in PHP

### Attribute

`Attribute(resolver, settings[])`

```php
/*
 * A psuedo attribute definition, with a string type constraint.
 *
 * Description, constraints and other optional settings should be expressed as a 
 * map if possible. Like object literals in JS, or assoc arrays in PHP.
 */

# 
$Name = new Attribute(
  function ($query) {
		$id = $query->argument('id');
  	$person = DataSource::getPersonById($id);
		return $person->name;
	},
  [
    'type'        => Type::string(),
    'description' => "Name of a person."
    'nonNull'     => true
  ]
);
```

### Act

`Act(closure, settings[])`

```php
/*
 * A psuedo act definition.
 * Options should be expressed as a map, if possible.
 */

$Greet = new Act(
  function($query, $context) {
    $name = $query->argument('name');
    say("Hi, " . $name);
  },
  [
    'description' => "Greets someone, takes 'name' as argument."
  ]
);
```

### Link

`Link(typeLinkedTo, resolver)`

— Different from previous examples, here Sage also passes the entity value as a parameter, which means that it resolves attributes in advance to resolving links : 

```php
/*
 * A psuedo link definition.
 */

# We define the 
$Book = new Entity(···);

$favoriteBook = new Link(
 $Book,
 function ($query, $context, $entity) {
   return [
     'id' => $entity['id']
   ];
 }
);
```

### Entity

`Entity(attributes[], acts[], links[], settings[])`

```php
/*
 * A psuedo entity definition.
 * Options should be expressed as a map, if possible.
 */

$ToDo = new Entity(
	[
    'id' => new Attribute(···),
    'name' => new Attribute(···)
  ],
  [
    'checkDone' => new Act(···),
    ...
  ],
  [
    'owner' => new Link(···),
    ...
  ],
  [
    'description' => "A to-do item.",
    ...
  ]
);
```

### Entity Collection

`EntityCollection(entityType, attributeResolvers[])`

```php
# We defined 'ToDo' entity in the previous example
$ToDo = new Entity(···);

$ToDoList = new EntityCollection(
	$ToDo,
	[
    'id' => function($query, $context) {
      return [1, 2, 3];
    },
    'title' => function($query, $context) {
      return [
        'Do this, do that',
        'Eat something',
        'Go to sleep'
      ];
    }
    ...
  ]
);
```



```json
{
  'todoList': [
    {
      'id': 1,
      'title': "Do this, do that"
    },
    {
      'id': 2,
      'title': "Eat something"
    },
    {
      'id': 3,
      'title': "Go to sleep"
    }
  ]
}
```

