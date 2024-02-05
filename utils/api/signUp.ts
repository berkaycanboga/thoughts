import axios from "axios";

import { SignUpUser } from "../../models/User";

import { signInApi } from "./signIn";

export const signUpApi = async (data: SignUpUser) => {
  try {
    const response = await axios.post("/api/auth/signup", data);

    if (response.status === 200) {
      await signInApi(data);
      return { success: true };
    } else {
      const errorData = response.data;
      return { error: errorData.message || "Error signing up" };
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return { error: "Error signing up" };
  }
};
