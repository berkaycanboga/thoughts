import React from "react";

import SharedFormInput from "../Shared/SharedFormInput";

import useSignUpFormLogic from "./useSignUpFormLogic";

const SignUpForm = () => {
  const { formik, error } = useSignUpFormLogic();

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <SharedFormInput
        label="Username"
        id="username"
        name="username"
        type="text"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.username!}
        error={formik.errors.username}
      />

      <SharedFormInput
        label="Full Name"
        id="fullName"
        name="fullName"
        type="text"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.fullName!}
        error={formik.errors.fullName}
      />

      <SharedFormInput
        label="Email"
        id="identifier"
        name="identifier"
        type="text"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.identifier!}
        error={formik.errors.identifier}
      />

      <SharedFormInput
        label="Password"
        id="password"
        name="password"
        type="password"
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
        {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
