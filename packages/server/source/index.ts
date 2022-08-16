import {
  SageResource,
  SageAct,
  SageAttribute,
  SageLink,
  SageDocument,
  SageContext,
  SageSchema,
  SageCompressedDocument,
  SageQuery,
} from "./type";

import { DocumentContract, QueryContract, SchemaContract } from "./validation";

import { SageProblem } from "./problem";

import { SageParser } from "./execution/parser";
import { SageExecutor } from "./execution";

export * from "./problem";
export * from "./utils";

export const Sage = {
  execute(schema: SageSchema, document: SageDocument, context?: SageContext) {
    try {
      return SageExecutor.execute(schema, document, context);
    } catch ($e) {
      return $e;
    }
  },

  validateSchema(schema: SageSchema): Array<SageProblem> | true {
    const problems = SchemaContract.validate(schema);

    if (problems.length > 0) return problems;
    else return true;
  },

  parse(source: SageCompressedDocument): {
    document: SageDocument;
    problems: Array<SageProblem>;
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
  Link(link: SageLink): SageLink {
    return link;
  },
  Schema(schema: SageSchema): SageSchema {
    return schema;
  },
};
