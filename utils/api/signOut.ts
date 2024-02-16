import { signOut } from "next-auth/react";

export const signOutApi = async () => {
  try {
    await signOut({ callbackUrl: "/signin" });
    return { success: true };
  } catch (error) {
    console.error("Error during sign-out:", error);
    return { error: "An unexpected error occurred" };
  }
};
