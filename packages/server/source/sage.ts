import {
  SageResource,
  SageAct,
  SageAttribute,
  SageDocument,
  SageContext,
  SageSchema,
  SageSimplifiedDocument,
  SageExecutionResult,
  SageResponse,
  SageValidationContract,
  SageErrorOutput,
} from "./type";

import { DocumentContract, SchemaContract } from "./validation";

import { SageParseResult, SageParser } from "./execution/parser";
import { SageExecutor } from "./execution";
import { ProcedureResult } from "./utils";

export const Sage = {
  execute(
    document: SageDocument,
    schema: SageSchema,
    context: SageContext = {},
  ) {
    return SageExecutor.execute(schema, document, context);
  },

  validate(contract: SageValidationContract, subject: any) {
    return contract.validate(subject);
  },

  validateSchema(schema: SageSchema): ProcedureResult {
    return this.validate(SchemaContract, schema);
  },

  parse(source: SageSimplifiedDocument): SageParseResult {
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
