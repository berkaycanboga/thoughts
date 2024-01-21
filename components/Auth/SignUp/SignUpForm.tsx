import React from "react";
import useSignUpFormLogic from "./useSignUpFormLogic";
import SignUpFormInput from "./FormInput";

const SignUpForm = () => {
  const { formik } = useSignUpFormLogic();

  return (
    <form onSubmit={formik.handleSubmit} className="mt-8">
      <SignUpFormInput
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

      <SignUpFormInput
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

      <SignUpFormInput
        label="Email or Phone"
        id="identifier"
        name="identifier"
        type="text"
        value={formik.values.identifier}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.identifier!}
        error={formik.errors.identifier}
      />

      <SignUpFormInput
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
