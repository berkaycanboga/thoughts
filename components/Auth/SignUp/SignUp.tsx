"use client";

import React from "react";

import Sign from "../Shared/Sign";

import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <Sign
      title="Sign Up for"
      formComponent={<SignUpForm />}
      conditionalText="Already have an account?"
      linkText="Sign in"
      linkUrl="/signin"
    />
  );
};

export default SignUp;
