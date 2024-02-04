import { SignUpUser } from "../../models/User";
import { signInApi } from "./signInApi";

export const signUpApi = async (data: SignUpUser) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await signInApi(data);
      return { success: true };
    } else {
      const errorData = await response.json();
      return { error: errorData.message || "Error signing up" };
    }
  } catch (error) {
    return { error: "Error signing up" };
  }
};
