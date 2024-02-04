import { signIn } from "next-auth/react";
import { LoginUser } from "../../models/User";

export const signInApi = async (data: LoginUser) => {
  try {
    const result = await signIn("credentials", {
      callbackUrl: "/dashboard",
      ...data,
    });

    if (result?.error) {
      if (result.error.toLowerCase().includes("user not found")) {
        return { error: "User not found" };
      }

      return { error: "Invalid username, email, or password" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during sign-in:", error);

    return { error: "An unexpected error occurred" };
  }
};
