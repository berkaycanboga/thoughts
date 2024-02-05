import { useFormik } from "formik";

import { signUpApi } from "../../../utils/api/signUp";
import {
  validateSignUp,
  SignUpValidationResult,
} from "../../../utils/validation/signUpValidation";

const useSignUpFormLogic = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      identifier: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        await signUpApi(values);
        console.log("Form submitted successfully:", values);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    validate: (values) => {
      const validation: SignUpValidationResult = validateSignUp(values);
      return validation.errors;
    },
  });

  return { formik };
};

export default useSignUpFormLogic;
