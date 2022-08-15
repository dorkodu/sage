import {
  SageResource,
  SageAct,
  SageAttribute,
  SageLink,
  SageSchema,
  SageDocument,
  SageContext,
  SageCompressedDocumentFormat,
  SageQuery,
} from "./type";

import { DocumentContract, QueryContract, SchemaContract } from "./validation";

import { SageExecutor } from "./execution";

export * from "./assertNotBrowser";
export * from "./SageError";
export * from "./problem";
export * from "./utils";

import { SageProblem } from "./problem";

export const Sage = {
  execute(schema: SageSchema, document: SageDocument, context?: object) {
  execute(schema: SageSchema, document: SageDocument, context?: SageContext) {
    try {
      // ? if string, parse the request string and get document.
      // ? validate the document
      let documentErrors = DocumentContract.validate(document);
      let schemaErrors = SchemaContract.validate(document);

      let validationErrors = [].concat(documentErrors, schemaErrors);

      // ? if document is invalid, return an empty execution result with validation errors

      // returns all validation problems as SageError array
      // ? if document is invalid, return an empty execution result with validation problems
      // ? document is valid, so return the execution result
      return SageExecutor.execute(schema, document);
    } catch (error) {}
    } catch (problem) {}
  },

  validateSchema(schema: SageSchema): Array<SageProblem> | true {
    let problems: Array<SageProblem> = [];
    problems = SchemaContract.validate(document);

    if (problems.length > 0) return problems;
    else return true;
  },

  validateSchema(): boolean {},
  parse(source: SageCompressedDocumentFormat): {
    document: SageDocument;
    problems: Array<SageProblem>;
  } {
    let problems: Array<SageProblem> = [];
    /**
     *? iterate all properties and do rename:
     **   typ -> type
     **   atr -> attributes
     **   act -> act
     **   arg -> arguments
     **   lnk -> links
     */
    let document: SageDocument = {};

  parse(source: any): SageDocument {},

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
