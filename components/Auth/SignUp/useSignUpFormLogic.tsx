import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signUpApi } from "../../../utils/api/signUp";
import {
  validateSignUp,
  SignUpValidationResult,
} from "../../../utils/validation/signUpValidation";

const useSignUpFormLogic = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      identifier: "",
      password: "",
    },
    onSubmit: async (values) => {
      const result = await signUpApi(values);
      if (result!.success) {
        router.push("/dashboard");
      } else if (result?.error) {
        setError(
          "Username or Email is already taken. Please choose another one.",
        );
        return;
      }

      setError(null);
    },
    validate: (values) => {
      const validation: SignUpValidationResult = validateSignUp(values);
      return validation.errors;
    },
  });

  return { formik, error };
};

export default useSignUpFormLogic;
