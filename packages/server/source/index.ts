import {
  SageResource,
  SageAct,
  SageAttribute,
  SageLink,
  SageSchema,
  SageDocument,
  SageContext,
} from "./type";

import { DocumentContract, QueryContract, SchemaContract } from "./validation";

import { SageExecutor } from "./execution";

export * from "./assertNotBrowser";
export * from "./SageError";
export * from "./utils";

export const Sage = {
  execute(schema: SageSchema, document: SageDocument, context?: object) {
    try {
      // ? if string, parse the request string and get document.
      // ? validate the document
      let documentErrors = DocumentContract.validate(document);
      let schemaErrors = SchemaContract.validate(document);

      let validationErrors = [].concat(documentErrors, schemaErrors);

      // ? if document is invalid, return an empty execution result with validation errors

      // ? document is valid, so return the execution result
      return SageExecutor.execute(schema, document);
    } catch (error) {}
  },

  validateSchema(): boolean {},

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
