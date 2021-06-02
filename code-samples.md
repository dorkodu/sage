# Code Samples

Here we share the code samples which can help you better understand some concepts of Sage. All of them are fictitious and do not have a reference status for the community. 

## Sage Service in PHP

### Attribute definition :

```php
/*
 * A psuedo attribute definition, with a string type constraint.
 *
 * Description, constraints and other optional settings should be expressed as a 
 * map if possible. Like object literals in JS, or assoc arrays in PHP.
 */

# Attribute(<name>, <resolver>, <options>)
$attribute = new Attribute(
  'name',
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

# Act(<name>, <closure>, <options>)
$act = new Act(
  "greet",
  function($query) {
    $name = $query->argument('name');
    say("Hi, " . $name);
  },
  [
    'description' => "Greets someone, takes 'name' as argument."
  ]
);
```

## Sage Client in JS