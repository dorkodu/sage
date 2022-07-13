# Artifacts

Artifacts are the primitives you use to define  in a typical Sage application.

An artifact is one of these: **attribute**, **act** or **link**.

## Attribute

```php
$email = new Attribute([
  'name' => 'email',
  'description' => 'Email of a user.',
  'type' => TypeRegistry::attribute('email'),
  'resolve' => function ($referenceValue, ContextInfo $info) {
    $id = $referenceValue['userId'];
    return DataSource::getEmailFromUserId($id);
  }
]);
```

| Option  | Type                  | Notes                                                        |
| ------- | --------------------- | ------------------------------------------------------------ |
| type    | `Type` & `OutputType` | **Required.** <br>The Entity type which this Link links to.  |
| resolve | `callable`            | **Required.** <br>**function (** *$referenceValue, ContextInfo $info* **)**<br>S |

## Act

```php
$addPost = new Act([
  'name' => 'addPost',
  'description' => 'Saves a post to the data source.',
  'do' => function ($referenceValue, ContextInfo $info) {
    $id = $referenceValue['userId'];
    DataSource::savePost($id);
  }
]);
```

| Option  | Type       | Notes                                                        |
| ------- | ---------- | ------------------------------------------------------------ |
| linksTo | `Entity`   | **Required.** <br>The Entity type which this Link links to.  |
| resolve | `callable` | **Required.** <br>**function (** *$referenceValue, $entity, ContextInfo $info* **)**<br> |

## Link

```php
$Author = new Link([
  'name' => 'author',
  'description' => 'Post author',
  'linksTo' => TypeRegistry::entity('User'),
  'resolve' => function($referenceValue, $entity, ContextInfo $info) {
    return [
      'id' => $entity->authorId
    ]
  }
]);
```

| Option  | Type       | Notes                                                        |
| ------- | ---------- | ------------------------------------------------------------ |
| linksTo | `Entity`   | **Required.** <br>The Entity type which this Link links to.  |
| resolve | `callable` | **Required.** <br>**function (** *$referenceValue, $entity, ContextInfo $info* **)**<br> |

# Artifact configuration options

Below is a full list of available for universal artifact configuration options (available for all of them above)**:**

| Option            | Type      | Notes                                                        |
| ----------------- | --------- | ------------------------------------------------------------ |
| name              | `string`  | **Required.** Name of the artifact.                          |
| description       | `string`  | Plain-text description of this artifact (e.g. used for auto-generated documentation). |
| deprecated        | `boolean` | Boolean indicating whether this artifact is deprecated. When true - artifact will not be returned by introspection queries (unless forced). |
| deprecationReason | `string`  | Text describing why this artifact is deprecated.             |

# Data Resolution

Data resolution is the primary mechanism in **Sage.php** for returning actual data for your fields.
It is implemented using **'resolve'** callable in attribute or link definition.

Read the section on [Data Fetching](../data-fetching.md) for a complete description of this process.