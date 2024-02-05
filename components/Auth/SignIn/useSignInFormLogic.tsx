import { useFormik } from "formik";
import { useState } from "react";

import { signInApi } from "../../../utils/api/signIn";
import {
  validateSignIn,
  SignInValidationResult,
} from "../../../utils/validation/signInValidation";

const useSignInFormLogic = () => {
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await signInApi(values);

        if (result.error) {
          if (result.error.toLowerCase().includes("user not found")) {
            setError(
              "Account not found. Please check your credentials or sign up if you don't have an account.",
            );
          } else {
            setError(
              "Invalid username, email, or password. Please double-check your information.",
            );
          }
          return;
        }

        setError(null);
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("An unexpected error occurred");
      }
    },
    validate: (values) => {
      const validation: SignInValidationResult = validateSignIn(values);
      return validation.errors;
    },
  });

  return { formik, error };
};

export default useSignInFormLogic;
