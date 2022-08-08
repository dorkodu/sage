import { ISageResource, ISageAct, ISageAttribute } from "./type/interfaces";
import { SageResource } from "./type/definitions";

export * from "./assertNotBrowser";
export * from "./SageError";
export * from "./types";

export const Sage = {
  Resource(resource: ISageResource): ISageResource {
    return new SageResource(resource);
  },
  Act(act: SageAct): SageAct {
    return new SageResource(resource);
  },
  Attribute(attribute: SageAttribute): SageAttribute {
    return new SageAttribute(attribute);
  },
  Link(link: SageLink): SageLink {
    return new SageLink(link);
  },
};
