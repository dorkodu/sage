import { SageValidationContract } from "../type";
import { ProcedureResult } from "../utils";

/**
 * Create contracts based on this standard, by just adding rules.
 * Here's how:
 * - const NewContract = Object.create(BaseValidationContract);
 * - NewContract.rules.newRule = (subject: YourContractInputType):  => {}
 */
export const BaseValidationContract: SageValidationContract = {
  validate(subject: any) {
    let result: ProcedureResult = {
      data: true,
      errors: [],
    };

    //? if any error occurs, push to this problems array
    const problems: Error[] = [];

    Object.values(this.rules).forEach((rule) => {
      let ruleResult = rule(subject);

      if (ruleResult !== true) {
        problems.push(ruleResult);
      }
    });

    if (problems.length > 0) {
      result.data = false;
      result.errors.push(...problems);
    }

    return result;
  },
  rules: {},
};
