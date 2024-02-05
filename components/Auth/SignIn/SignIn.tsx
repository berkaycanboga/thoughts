"use client";

import Image from "next/image";
import React from "react";

import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white text-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-cyan-600">
        Welcome back to{" "}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={60}
          priority={true}
          className="inline-block ml-2"
        />
      </h2>
      <SignInForm />
      <div className="mt-4 text-center text-gray-600">
        New here?{" "}
        <a href="/signup" className="text-cyan-600 hover:underline">
          Create an account
        </a>
      </div>
    </div>
  );
};

export default SignIn;
