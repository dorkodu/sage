import { SageProblem } from "../problem";
import { Maybe } from "../utils";

export type SageContext = { [key: string | symbol | number]: any };

type SageArtifactFunction = (context: SageContext) => any;

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
  readonly resolve: (query: SageQuery, context: SageContext) => SageContext;
}

export interface SageSchema {
  readonly types: { [key: string]: SageResource };
}

//? Document

export interface SageQuery {
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
  problems: Array<SageProblem>;
}

export interface SageCompressedDocumentFormat {
  [key: string | number]: {
    typ: string;
    arg?: { [key: string]: any };
    atr?: string[];
    act?: string;
    lnk?: { [key: string]: string };
  };
}
