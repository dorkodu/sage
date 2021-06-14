# Code Samples

Here we share the code samples which can help you better understand some concepts of Sage. All of them are fictitious and do not have to be taken from a reference implementation. 

## Sage Server in PHP

### Attribute definition :

```php
/*
 * A psuedo attribute definition, with a string type constraint.
 *
 * Description, constraints and other optional settings should be expressed as a 
 * map if possible. Like object literals in JS, or assoc arrays in PHP.
 */

# Attribute(resolver, options[])
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

### Act definition :

```php
/*
 * A psuedo act definition.
 * Options should be expressed as a map, if possible.
 */

# Act(closure, options[])
$Greet = new Act(
  function($query) {
    $name = $query->argument('name');
    say("Hi, " . $name);
  },
  [
    'description' => "Greets someone, takes 'name' as argument."
  ]
);
```

### Entity definition :

```php
/*
 * A psuedo entity definition.
 * Options should be expressed as a map, if possible.
 */



# Entity(attributes[], acts[], relationships[], options[])
$user = new Entity(
	[
    'name' => $Name,
    ...
  ],
  [
    
  ],
  [],
  [
    'description' => "Greets someone, takes 'name' as argument."
  ]
);
```

