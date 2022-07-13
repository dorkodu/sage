# Type System
To start using Sage you are expected to implement a type system that represents your data, and expose it as [Schema](schema.md).

In Sage.php **type** is an instance of internal class from `Sage\Type\Definition` namespace: [`Entity`](entity.md), [`ScalarType`](scalar-types.md) (or one of subclasses).

But most of the types in your schema will be [Entity types](entity-types.md).
