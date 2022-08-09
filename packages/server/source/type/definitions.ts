import { Maybe } from "../types";

export interface SageDefinition {
  readonly name: string;
}

type SageArtifactFunction = (reference: Maybe<object>) => any;

export interface SageDefinition {
  readonly name: string;
}

export interface SageAttribute extends SageDefinition {
  readonly rule?: (value: any) => boolean;
  readonly resolve: SageArtifactFunction;
}

export interface SageAct extends SageDefinition {
  readonly do: SageArtifactFunction;
}

export interface SageLink extends SageDefinition {
  readonly linksTo: SageResource;
  readonly resolve: SageArtifactFunction;
}

export interface SageResource extends SageDefinition {
  readonly attributes?: { [key: string]: SageAttribute };
  readonly acts?: { [key: string]: SageAct };
  readonly links?: { [key: string]: SageLink };
  readonly resolve: (query: SageQuery, context: Maybe<object>) => Maybe<object>;
}

export interface SageQuery {
  readonly name: string;
  readonly type: string;
  readonly arguments?: { [key: string]: any };
  readonly attributes?: string[];
  readonly act?: string;
  readonly links?: { [key: string]: SageQuery };
}

export interface SageSchema {
  readonly types: { [key: string]: SageResource };
}
