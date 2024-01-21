import React from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

interface SignUpFormInputProps {
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

const SignUpFormInput = ({
  label,
  id,
  type,
  value,
  name,
  onChange,
  onBlur,
  touched,
  error,
}: SignUpFormInputProps) => (
  <div className="mb-4 relative">
    <label
      htmlFor={id}
      className="block text-sm font-semibold mb-1 text-gray-800"
    >
      {label} :
    </label>
    <div className="flex items-center relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-cyan-300 text-gray-800 ${
          touched && error
            ? "border-red-500"
            : touched && !error
              ? "border-green-500"
              : ""
        }`}
      />
      {touched && error && (
        <BsXCircle className="text-red-500 mr-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl" />
      )}
      {touched && !error && (
        <BsCheckCircle className="text-green-500 mr-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-2xl" />
      )}
    </div>
    {touched && error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  </div>
);

export default SignUpFormInput;
