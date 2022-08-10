import { Maybe } from "../utils";

export interface SageDefinition {
  readonly name: string;
}

type SageArtifactFunction = (context: Maybe<object>) => any;

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
  readonly resolve: (
    query?: SageQuery,
    context?: Maybe<object>
  ) => Maybe<object>;
}

export interface SageSchema {
  readonly types: { [key: string]: SageResource };
}

//? Document

export interface SageQuery {
  readonly name: string;
  readonly type: string;
  readonly arguments?: { [key: string]: any };
  readonly attributes?: string[];
  readonly act?: string;
  readonly links?: { [key: string]: SageQuery };
}

export interface SageDocument {
  [key: string]: SageQuery;
}

//? execution
export interface SageExecutionResult {
  data: object;
  error: object;
  meta: object;
}
