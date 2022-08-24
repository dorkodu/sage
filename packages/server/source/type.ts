import { SageProblem } from "./problem";
import { Maybe, Nullable, ProcedureResult } from "./utils";

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
  verified: boolean;
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
  errors: { [key: string | number]: Error[] };
  meta: any;
}

export interface SageValidationContract {
  readonly validate: (subject: any) => ProcedureResult;
  rules: { [key: string]: (subject: any) => true | Error };
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

export interface SageErrorOutput {
  message: string;
  code: number | string;
  meta?: any;
}

export interface SageResponse {
  data?: { [key: string | number]: any };
  errors?: { [key: string | number]: SageErrorOutput[] };
  meta?: any;
}
