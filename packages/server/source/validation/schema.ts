import {
  SageSchema,
  SageDefinition,
  SageResource,
  SageAttribute,
  SageAct,
} from "../type";

import { Premise, SageProblem, SageStatusCode } from "../problem";
import { BaseValidationContract } from "./base";

export const SchemaContract = Object.create(BaseValidationContract);
export const DefinitionContract = Object.create(BaseValidationContract);
export const ResourceContract = Object.create(BaseValidationContract);

//? Definition Contract
DefinitionContract.rules.name = (definition: SageDefinition) => {
  // must start with a letter or underscore [a-zA-Z_] and the rest can contain letters, numbers and underscore [a-zA-Z0-9_]
  let NamePattern = RegExp(/([A-Za-z_](?:[A-Za-z0-9_])+)/);

  //? assert name is valid
  return Premise(NamePattern.test(definition.name), {
    message: `Value '${definition.name}' is invalid for naming a Sage definition.`,
    code: SageStatusCode.NAMING,
  });
};

//? Schema Contract
// SchemaContract.rules.definitions = (schema: SageSchema) => {};
