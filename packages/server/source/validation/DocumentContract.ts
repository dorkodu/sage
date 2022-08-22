import { SageDocument, SageValidationContract } from "../type";
import { SageProblem } from "../problem";

export const DocumentContract: SageValidationContract = {
  validate(document: SageDocument) {
    let problems: SageProblem[] = [];
    //? do validation
    return problems;
  },
};
