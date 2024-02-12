import React from "react";

import SharedFormInput from "./SharedFormInput";

interface SignFormInputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: boolean;
  error: string | undefined;
}

const SignInFormInput = (props: SignFormInputProps) => (
  <SharedFormInput {...props} />
);

export default SignInFormInput;
