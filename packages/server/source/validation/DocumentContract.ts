import { SageDocument, SageValidationContract } from "../type";
import { SageError } from "../problem";

export const DocumentContract: SageValidationContract = {
  validate(document: SageDocument) {
    let problems: SageError[] = [];
    //? do validation
    return problems;
  },
};
