import {
  SageResource,
  SageAttribute,
  SageContext,
  SageAct,
  SageSchema,
  SageDocument,
  SageExecutionResult,
  SageQuery,
} from "../type";

import { DocumentContract, QueryContract, SchemaContract } from "../validation";
import { assertNotBrowser, Maybe } from "../utils";
import { Premise, SageProblem } from "../problem";

interface SageQueryExecutionResult {
  data: any;
  errors: SageProblem[];
}

export const SageExecutor = {
  /**
   * ExecuteRequest(schema, document)
   *
   * 1.  Initialize *data* to an empty ordered map.
   * 2.  Let *data* be the result of running the following algorithm *normally* (allowing parallelization) **:**
   *     1.  For each *query* given in the *document* **:**
   *         1.  Let *queryName* be the name of *query*.
   *         2.  Let *queryResult* be the result of [ExecuteQuery](#7.2.0) **(** *schema, query* **)**.
   *         3.  Set *queryResult* as the value for the key *queryName* in *data*.
   * 3.  Let *problems* be a list of problem objects, each represents an problem produced while executing the queries.
   * 4.  Return an unordered map containing *data* and *problems*.
   *     1.  If *problems* is still empty at the end of the execution, return an unordered map containing only *data*.
   */
  execute(
    schema: SageSchema,
    document: SageDocument,
    context: SageContext = {},
  ): SageExecutionResult {
    //? by default return an empty result
    let result = this.emptyExecutionResult();

    for (let [name, query] of Object.entries(document)) {
      let queryResult = this.executeQuery(schema, query, context);

      //? if has any error, add
      if (queryResult.errors.length > 0) {
        result.error[name] = [];
      }
    }

    return result;
  },

  /**
   * ExecuteQuery(schema, query)
   * 1.  Let *entityType* be the type in *query*.
   *   1.  Assert: *entityType* is an Entity type defined in *schema*.
   * 2. Let *referenceValue* be the result of calling the Entity type’s resolver function with *query* as the parameter.
   * 3. Let *act* be the act in *query*.
   *   1.  If *act* is defined:
   *     1.  Run [PerformAct](#7.2.1.1) **(** *entityType, act, schema, referenceValue* **)**.
   * 4. Let *attributes* be the set of requested attributes in *query*.
   *   1.  If *attributes* is defined:
   *     1.  Let *attributesResult* be the result of [RetrieveAttributes](#7.2.1.2) **(** *entityType, attributes, schema, referenceValue* **)**.
   * 5. Let *links* be the map of requested links in *query*.
   *   1.  If *links* is defined:
   *     1.  Let *linksResult* be the result of [ResolveLinks](#7.2.1.3) **(** *entityType, links, schema, referenceValue* **)**.
   * 6. If *attributesResult* is not empty, let *resultMap* be equal to *attributesResult*.
   *    Otherwise initialize *resultMap* to an empty ordered map.
   * 7. If *linksResult* is not empty, set it as the value for the key *$links* in *resultMap*.
   *   > *linksResult* are appended as a reserved attribute *‘$links’* to the *resultMap*.
   * 8. Return *resultMap*.
   */
  executeQuery(
    schema: SageSchema,
    query: SageQuery,
    context: SageContext,
  ): SageQueryExecutionResult {
    let result: any = {};

    let resource = schema.resources[query.resource];
    context = resource.resolve(query, context);

    //? retrieve attributes
    if (typeof query.attributes) {
      // typing for resolved attribute values
      let attributes: { [key: string]: any } = [];

      for (let attribute in query.attributes) {
        let attributeValue = this.retrieveAttribute(
          attribute,
          resource,
          context,
        );

        //* attributes.<attributeName> = <attributeValue>
        attributes[attribute] = attributeValue;
      }
    }

    //? perform acts
    //? resolve links
  },

  retrieveAttribute(
    attribute: string,
    resource: SageResource,
    context: SageContext = {},
  ) {},

  performAct(
    act: string,
    resource: SageResource,
    context: SageContext,
  ): true | SageProblem[] {
    let problems: SageProblem[] = [];

    //! resource has no acts
    Premise(
      typeof resource.acts !== "undefined",
      `Resource '${resource.name}' has no acts defined.`,
    );

    return true;
  },

  emptyExecutionResult(): SageExecutionResult {
    return {
      data: {},
      error: {},
      meta: {},
    };
  },
};
