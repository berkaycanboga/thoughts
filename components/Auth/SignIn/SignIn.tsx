"use client";

import React from "react";

import Sign from "../Shared/Sign";

import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <Sign
      title="Welcome back to"
      formComponent={<SignInForm />}
      conditionalText="New here?"
      linkText="Create an account"
      linkUrl="/signup"
    />
  );
};

export default SignIn;
