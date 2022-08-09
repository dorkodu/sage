import {
  SageResource,
  SageAct,
  SageAttribute,
  SageLink,
  SageSchema,
} from "./type/definitions";

export * from "./assertNotBrowser";
export * from "./SageError";
export * from "./types";

export const Sage = {
  execute(
    schema: SageSchema,
    document: SageDocument,
    context?: object,
    options?: SageOptions
  ) {},
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
