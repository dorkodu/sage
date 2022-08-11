import { SageDocument, SageValidationContract } from "../type";
import { SageError } from "../SageError";

export const DocumentContract: SageValidationContract = {
  validate(document: SageDocument) {
    let errors: SageError[] = [];
    //? do validation
    return errors;
  },
};
