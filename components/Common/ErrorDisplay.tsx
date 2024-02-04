import { useEffect, useState } from "react";

interface ErrorProps {
  message: string;
}

const useErrorHandling = () => {
  const [error, setError] = useState<ErrorProps | null>(null);

  const handleError = (
    err: Error | string | unknown,
    customMessage: string = "An error occurred",
  ) => {
    console.error("Error:", err);

    if (typeof err === "string") {
      setError({ message: err });
    } else if (err instanceof Error) {
      setError({ message: err.message });
    } else {
      console.error("Unexpected error type:", err);
      setError({ message: customMessage });
    }
  };

  const resetError = () => {
    setError(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      resetError();
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  return {
    error,
    handleError,
    resetError,
  };
};

export default useErrorHandling;
