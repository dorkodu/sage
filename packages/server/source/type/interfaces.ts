import { Maybe } from "../types";

export interface SageDefinition {
  name: string;
  resolve: CallableFunction;
}

export interface SageAttribute extends SageDefinition {
  rule: CallableFunction | null;
}

export interface SageAct extends SageDefinition {
  do: CallableFunction;
}

export interface SageLink extends SageDefinition {
  linksTo: SageResource;
}

export abstract class SageResource implements SageDefinition {
  name: string;
  resolve: CallableFunction;
  attributes: SageAttribute[];
  acts: SageAct[];
  links: SageLink[];

  constructor() {
    super();
  }
}

export interface SageQuery {
  type: string;
  attributes?: string[];
  arguments?: { [key: string | number]: any };
  links?: { [key: string]: SageQuery };
  act?: string;
}
