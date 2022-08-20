import {
  SageResource,
  SageAct,
  SageAttribute,
  SageDocument,
  SageContext,
  SageSchema,
  SageSimplifiedDocument,
  SageQuery,
} from "./type";

import { DocumentContract, QueryContract, SchemaContract } from "./validation";

import { SageProblem } from "./problem";

import { SageParser } from "./execution/parser";
import { SageExecutor } from "./execution";

export const Sage = {
  execute(
    document: SageDocument,
    schema: SageSchema,
    context: SageContext = {}
  ) {
    return SageExecutor.execute(schema, document, context);
  },

  validateSchema(schema: SageSchema): SageProblem[] | true {
    const problems = SchemaContract.validate(schema);
    if (problems.length > 0) return problems;
    else return true;
  },

  parse(source: SageSimplifiedDocument): {
    document: SageDocument;
    problems: SageProblem[];
  } {
    return SageParser.parse(source);
  },

  Resource(resource: SageResource): SageResource {
    return resource;
  },

  Act(act: SageAct): SageAct {
    return act;
  },

  Attribute(attribute: SageAttribute): SageAttribute {
    return attribute;
  },

  Schema(schema: SageSchema): SageSchema {
    return schema;
  },
};
