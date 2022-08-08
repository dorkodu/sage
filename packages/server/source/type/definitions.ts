import { Maybe } from "../types";
import {
  ISageResource,
  ISageAct,
  ISageAttribute,
  ISageDefinition,
  ISageLink,
  ISageQuery,
  ISageSchema,
} from "./interfaces";

export abstract class SageDefinition {
  public readonly name: string;
  public readonly description: Maybe<string>;
  public readonly deprecationReason: Maybe<string>;
  public readonly isDeprecated: boolean;

  constructor(
    name: string,
    description?: Maybe<string>,
    deprecationReason?: Maybe<string>
  ) {
    this.name = name;
    this.description = description;
    this.deprecationReason = deprecationReason;
    this.isDeprecated = typeof deprecationReason === "string";
  }
}

export class SageResource extends SageDefinition implements ISageResource {
  public readonly resolve: CallableFunction;
  public readonly attributes?: { [key: string]: ISageAttribute };
  public readonly acts?: { [key: string]: ISageAct };
  public readonly links?: { [key: string]: ISageLink };

  constructor(resource: ISageResource) {
    super(resource);
    this.resolve = resource.resolve;
    this.attributes = resource.attributes;
    this.arguments = resource.arguments;
  }
}
