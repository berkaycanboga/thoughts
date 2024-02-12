import React from "react";

import FormInput from "../Shared/FormInput";

import useSignInFormLogic from "./useSignInFormLogic";

const SignInForm = () => {
  const { formik, error } = useSignInFormLogic();

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <FormInput
        label="Username, Email, or Phone"
        id="identifier"
        type="text"
        name="identifier"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.identifier!}
        error={formik.errors.identifier}
      />

      <FormInput
        label="Password"
        id="password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.password!}
        error={formik.errors.password}
      />

      {error && (
        <p
          className={`text-red-500 text-sm mt-2 mb-4 transition-opacity duration-300 ${error ? "opacity-100" : "opacity-0"}`}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:from-cyan-700 active:to-cyan-800 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
