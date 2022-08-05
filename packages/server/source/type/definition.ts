import { ISageResource } from './interfaces';
import { Maybe } from "../types";

abstract class SageDefinition {
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

class SageResource extends SageDefinition implements ISageResource {
  public resolve: CallableFunction;
  public attributes: SageAttribute[];
  public links: SageLink[];
  public acts: SageAct[];

  constructor(params: DSageResource) {
    super();
    this.resolve = params.resolve;
  }

  function name(params:ISageResource) {
    name
  }
}
