import {
  SageSchema,
  SageDefinition,
  SageResource,
  SageAttribute,
  SageAct,
  SageLink,
} from "../type";

export const SchemaContract = {};

const DefinitionContract = {
  name: function (name: string): boolean {
    // must start with a letter or underscore [a-zA-Z_] and the rest can contain letters, numbers and underscore [a-zA-Z0-9_]
    let NamePattern = RegExp(/([A-Za-z_](?:[A-Za-z0-9_])+)/);

    return NamePattern.test(name);
  },
};
