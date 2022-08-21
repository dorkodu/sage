import { SageProblem } from "./problem";
import { Maybe, Nullable } from "./utils";

export type SageContext = any;

type SageArtifactFunction = (context: SageContext) => any;

export interface SageDefinition {
  readonly name: string;
}

export interface SageAttribute extends SageDefinition {
  readonly rule?: (value: any) => boolean;
  readonly value: SageArtifactFunction;
}

export interface SageAct extends SageDefinition {
  readonly do: SageArtifactFunction;
}

export interface SageResource extends SageDefinition {
  readonly attributes?: { [key: string]: SageAttribute };
  readonly acts?: { [key: string]: SageAct };
  readonly context: (query: SageQuery, context: SageContext) => SageContext;
}

export interface SageSchema {
  readonly resources: { [key: string]: SageResource };
}

//? Document
export type SageLinkReference = string;

export interface SageQuery {
  resource: string;
  arguments?: { [key: string]: any };
  attributes?: string[];
  act?: string;
}

export interface SageDocument {
  [key: string]: SageQuery;
}

//? execution
export interface SageExecutionResult {
  data: { [key: string | number]: any };
  error: { [key: string | number]: Error[] };
  meta: any;
}

export interface SageValidationContract {
  readonly validate: (value: any) => SageProblem[];
}

/**
 * Data that must be available at all points during query execution.
 */
export interface SageExecutionContext {
  schema: SageSchema;
  query: SageQuery;
  context: SageContext;
  problems: SageProblem[];
}

export interface SageSimplifiedQuery {
  res: string;
  arg?: { [key: string]: any };
  atr?: string[];
  act?: string;
}

export interface SageSimplifiedDocument {
  [key: string | number]: SageSimplifiedQuery;
}
