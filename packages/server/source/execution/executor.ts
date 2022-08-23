import {
  SageResource,
  SageContext,
  SageSchema,
  SageDocument,
  SageExecutionResult,
  SageQuery,
} from "../type";

import { getErrorFromUnknown, SageProblem, SageStatusCode } from "../problem";

interface ProcedureResult {
  data: any;
  errors: Error[];
  meta?: any;
}

export const SageExecutor = {
  execute(
    schema: SageSchema,
    document: SageDocument,
    context: SageContext = {},
  ): SageExecutionResult {
    //? by default return an empty result
    let result = this.emptyExecutionResult();

    for (let [queryName, query] of Object.entries(document)) {
      let queryResult = this.executeQuery(schema, query, context);

      // create an errors entry for query ONLY IF it has any
      if (queryResult.errors.length > 0) {
        result.errors[queryName] = queryResult.errors;
      }

      result.data[queryName] = queryResult.data;
    }

    return result;
  },

  executeQuery(
    schema: SageSchema,
    query: SageQuery,
    context: SageContext,
  ): ProcedureResult {
    // create empty result
    let result: ProcedureResult = {
      data: null,
      errors: [],
    };

    let resource = schema.resources[query.resource];

    //! assert resource is defined on schema
    if (typeof resource == "undefined") {
      result.errors.push(
        new SageProblem({
          message: `Requested resource '${query.resource}' is not defined on schema.`,
          code: SageStatusCode.NOT_FOUND,
        }),
      );
      return result;
    }

    //? create a new context from resource
    context = resource.context(query, context);

    //* initialize global attributes map before checking if asked for any.

    //? retrieve attributes
    if (typeof query.attributes !== "undefined") {
      query.attributes.forEach((attributeName) => {
        //? retrieve attribute
        let attributeResult = this.retrieveAttribute(
          attributeName,
          resource,
          context,
        );

        //? add procedure results to global query result
        result.data[attributeName] = attributeResult.data;
        result.errors.push(...attributeResult.errors);
      });
    }

    //? perform acts
    if (typeof query.act !== "undefined") {
      let actResult = this.performAct(query.act, resource, context);

      // add act errors to global query result
      result.errors.push(...actResult.errors);
    }

    return result;
  },

  retrieveAttribute(
    attributeName: string,
    resource: SageResource,
    context: SageContext = {},
  ): ProcedureResult {
    // create empty procedure result
    let result: ProcedureResult = {
      data: null,
      errors: [],
    };

    //TODO: make this perfect code block a reusable helper function called 'Premise' & hide complexity
    //! resource has no attributes
    if (typeof resource.attributes == "undefined") {
      result.errors.push(
        new SageProblem({
          message: `Resource '${resource.name}' has no attributes defined.`,
          code: SageStatusCode.UNDEFINED,
        }),
      );
      return result;
    }

    const attribute = resource.attributes[attributeName];

    //! attribute is not defined
    if (typeof attribute == "undefined") {
      result.errors.push(
        new SageProblem({
          message: `Attribute '${attributeName}' is not defined on resource '${resource.name}'.`,
          code: SageStatusCode.UNDEFINED,
        }),
      );
      return result;
    }

    /**
     * ? retrieve value AND validate
     * used try-catch here because the user-written schema definition code may cause error.
     * an error thrown would break the entire execution, so never trust luck!
     */
    try {
      const value = attribute.value(context);

      if (typeof attribute.rule == "function") {
        if (attribute.rule(value) == false) {
          result.errors.push(
            new SageProblem({
              message: `Returned value (${value}) from attribute '${attributeName}' is invalid.`,
              code: SageStatusCode.INVALID_VALUE,
            }),
          );
          return result;
        }
      }

      //? add value ONLY AFTER VERIFIED RULE
      result.data = value;
    } catch (error) {
      result.errors.push(getErrorFromUnknown(error));
    }

    return result;
  },

  performAct(
    actName: string,
    resource: SageResource,
    context: SageContext = {},
  ): ProcedureResult {
    // create empty procedure result
    let result: ProcedureResult = {
      /* return if act performed successfully */
      data: false,
      errors: [],
    };

    //TODO: find an elegant way to push/capture all problems into an array and return it

    //! resource has no acts
    if (typeof resource.acts == "undefined") {
      result.errors.push(
        new SageProblem({
          message: `Resource '${resource.name}' has no acts defined.`,
          code: SageStatusCode.UNDEFINED,
        }),
      );
      return result;
    }

    const act = resource.acts[actName];

    //! act is not defined
    if (typeof act == "undefined") {
      result.errors.push(
        new SageProblem({
          message: `Act '${actName}' is not defined on resource '${resource.name}'.`,
          code: SageStatusCode.UNDEFINED,
        }),
      );
      return result;
    }

    //? run act's procedure with user-given context
    // make sure no exception passes through
    try {
      act.do(context);
      result.data = true;
    } catch (error) {
      result.errors.push(getErrorFromUnknown(error));
    }

    return result;
  },

  emptyExecutionResult(): SageExecutionResult {
    return {
      data: {},
      errors: {},
      meta: {},
    };
  },
};
