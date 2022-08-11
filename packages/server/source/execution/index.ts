import { SageAttribute } from "./../type/index";
import {
  SageResource,
  SageAttribute,
  SageContext,
  SageLink,
  SageAct,
  SageSchema,
  SageDocument,
  SageExecutionResult,
  SageQuery,
} from "../type";

import { DocumentContract, QueryContract, SchemaContract } from "../validation";
import { Maybe } from "../utils";

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
   * 3.  Let *errors* be a list of error objects, each represents an error produced while executing the queries.
   * 4.  Return an unordered map containing *data* and *errors*.
   *     1.  If *errors* is still empty at the end of the execution, return an unordered map containing only *data*.
   */
  execute(schema: SageSchema, document: SageDocument): SageExecutionResult {
    //? by default return an empty result
    let result = this.emptyExecutionResult();

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
  executeQuery(schema: SageSchema, query: SageQuery, context: SageContext) {
    let result: any = {};

    let resource = schema.types[query.type];
    context = resource.resolve(query, context);

    //? retrieve attributes
    if (query.attributes) {
      // typing for resolved attribute values
      let attributes: { [key: string]: any } = [];

      for (let attribute in query.attributes) {
        let attributeValue = this.retrieveAttribute(
          attribute,
          resource,
          context
        );

        //* attributes.<attributeName> = <attributeValue>
        attributes[attribute] = attributeValue;
      }
    }

    //? perform acts
    //? resolve links
  },

  resolveLink(link: SageLink, schema: SageSchema, referanceValue: any) {},
  retrieveAttribute(
    attribute: string,
    resource: SageResource,
    context: SageContext
  ) {},
  performAct(act: SageAct, context: SageContext) {},

  emptyExecutionResult() {
    return {
      data: {},
      error: {},
      meta: {},
    };
  },
};
