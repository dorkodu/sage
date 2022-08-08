import { Maybe } from "../types";

export interface ISageDefinition {
  name: string;
  resolve: CallableFunction;
}

export interface ISageAttribute extends ISageDefinition {
  rule?: CallableFunction | null;
}

export interface ISageAct extends ISageDefinition {
  do: CallableFunction;
}

export interface ISageLink extends ISageDefinition {
  linksTo: ISageResource;
}

export interface ISageResource extends ISageDefinition {
  name: string;
  resolve: CallableFunction;
  attributes?: { [key: string]: ISageAttribute };
  acts?: { [key: string]: ISageAct };
  links?: { [key: string]: ISageLink };
}

export interface ISageQuery {
  name: string;
  type: string;
  arguments?: { [key: string | number]: any };
  attributes?: string[];
  act?: string;
  links?: { [key: string]: ISageQuery };
}

export interface ISageSchema {
  types: { [key: string]: ISageResource };
}
