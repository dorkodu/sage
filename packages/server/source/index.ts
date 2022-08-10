import {
  SageResource,
  SageAct,
  SageAttribute,
  SageLink,
  SageSchema,
  SageDocument,
} from "./type";

import {
  DocumentContract,
  QueryContract,
  SchemaContract
} from "./validation";

import { SageExecutor } from "./execution";


export * from "./assertNotBrowser";
export * from "./SageError";
export * from "./utils";

export const Sage = {
  execute(
    schema: SageSchema,
    document: SageDocument,
    context?: object
  ) {
    try {
      // ? if string, parse the request string and get document.
      // ? validate the document
      let documentErrors = DocumentContract.validate(document);
      let schemaErrors = SchemaContract.validate(document);

  } catch (Error $e) {
  }
}

  },

  validateSchema() {},

  parse(source) {},

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
