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
  SageQuery,
} from "./type";

import { DocumentContract, SchemaContract } from "./validation";

import { SageExecutor, SageParser, SageParseResult } from "./execution";
import { ProcedureResult } from "./utils";

export const Sage = {
  run(
    source: SageSimplifiedDocument,
    schema: SageSchema,
    context: SageContext = {},
  ): SageResponse {
    // empty result and response
    let result: SageExecutionResult = SageExecutor.emptyExecutionResult();
    let response: SageResponse = SageParser.response(result);

    //? parse document
    const parsed = SageParser.parse(source);
    const document = parsed.document;

    //? validate document
    const documentValidationResult = this.validate(DocumentContract, document);

    if (!documentValidationResult.data) {
      let documentErrors: SageErrorOutput[] =
        documentValidationResult.errors.map((e) => {
          return SageParser.outputError(e);
        });

      response.errors = {
        $document: documentErrors,
      };

      return response;
    }

    //? validate schema ONLY IF not verified
    if (!schema.verified) {
      const schemaValidationResult = this.validate(SchemaContract, schema);

      if (!schemaValidationResult.data) {
        let schemaErrors: SageErrorOutput[] = schemaValidationResult.errors.map(
          (e) => {
            return SageParser.outputError(e);
          },
        );

        response.errors = {
          $schema: schemaErrors,
        };

        return response;
      }
    }

    //? execute
    //! ...ONLY IF both document and schema are valid
    const executionResult = SageExecutor.execute(schema, document, context);
    response = SageParser.response(executionResult);

    return response;
  },

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

  Resource<T1 extends string, T2>(resource: SageResource<T1, T2>): typeof resource {
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
