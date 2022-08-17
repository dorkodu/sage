import { SageProblem } from "../problem";
import { Maybe } from "../utils";

export type SageContext = any;

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
  readonly resolve: (resource: any, context: SageContext) => any;
}

export interface SageResource extends SageDefinition {
  readonly attributes?: { [key: string]: SageAttribute };
  readonly acts?: { [key: string]: SageAct };
  readonly links?: { [key: string]: SageLink };
  readonly resolve: (query: SageQuery, context: SageContext) => SageContext;
}

export interface SageCollection extends SageResource {
  readonly resolve: (query: SageQuery, context: SageContext) => SageContext;
}

export interface SageSchema {
  readonly types: { [key: string]: SageResource };
}

//? Document

export interface SageQuery {
  readonly type: string;
  readonly arguments: { [key: string]: any };
  readonly attributes: string[];
  readonly act: string;
  readonly links: { [key: string]: SageLinkReference };
}

export type SageLinkReference = SageQuery | string;

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

export interface SageSimplifiedQuery {
  readonly typ?: string;
  readonly arg?: { [key: string]: any };
  readonly atr?: string[];
  readonly act?: string;
  readonly lnk?: { [key: string]: string };
}

export interface SageSimplifiedDocument {
  [key: string | number]: SageSimplifiedQuery;
}
