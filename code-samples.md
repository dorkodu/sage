# Code Samples

Here we provide severe code samples which can help you better understand some concepts of Sage.

## Sage Service Example in Sage

### Attribute definition :

```php
/*
 * A psuedo attribute definition, with a string type constraint.
 *
 * Description, constraints and other optional settings should be expressed as a 
 * map if possible. Like object literals in JS, or assoc arrays in PHP.
 */

// Attribute(<name>, <resolver>, <options>)
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

## Sage Client Example in Sage