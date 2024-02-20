import axios from "axios";
import { signIn, SignInResponse, signOut } from "next-auth/react";

import { signInApi } from "../../utils/api/signIn";
import { signOutApi } from "../../utils/api/signOut";
import { signUpApi } from "../../utils/api/signUp";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;

type SuccessSignInResponse = Pick<SignInResponse, "status" | "ok" | "url">;

describe("signUpApi", () => {
  it("should return success when signup is successful", async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 200, data: {} });

    const userData = {
      username: "testuser",
      fullName: "Test User",
      identifier: "test@example.com",
      password: "Password1!",
    };

    const result = await signUpApi(userData);

    expect(result).toEqual({ success: true });
  });

  it("should handle signup error correctly", async () => {
    mockAxios.post.mockRejectedValueOnce({ message: "Some signup error" });

    const userData = {
      username: "testuser",
      fullName: "Test User",
      identifier: "test@example.com",
      password: "InvalidPassword",
    };

    const result = await signUpApi(userData);

    expect(result).toEqual({ error: "Error signing up" });
  });
});

describe("signInApi", () => {
  it("should return success when sign-in is successful", async () => {
    const mockSuccessResponse: SuccessSignInResponse = {
      status: 200,
      ok: true,
      url: "/success-url",
    };

    mockSignIn.mockImplementationOnce(
      async () =>
        Promise.resolve(mockSuccessResponse) as unknown as SignInResponse,
    );

    const userData = {
      identifier: "testuser",
      password: "Password1!",
    };

    const result = await signInApi(userData);

    expect(result).toEqual({ success: true });
  });

  it("should handle 'user not found' error correctly", async () => {
    const mockUserNotFoundError: SignInResponse = {
      status: 404,
      ok: false,
      url: "/error-url",
      error: "user not found",
    };

    mockSignIn.mockImplementationOnce(async () =>
      Promise.resolve(mockUserNotFoundError),
    );

    const userData = {
      identifier: "nonexistentuser",
      password: "ValidPassword1!",
    };

    const result = await signInApi(userData);

    expect(result).toEqual({ error: "User not found" });
  });

  it("should handle generic error correctly", async () => {
    const mockUnexpectedError: SignInResponse = {
      status: 500,
      ok: false,
      url: "/error-url",
      error: "An unexpected error occurred",
    };

    mockSignIn.mockImplementationOnce(async () =>
      Promise.resolve(mockUnexpectedError),
    );

    const userData = {
      identifier: "testuser",
      password: "ValidPassword1!",
    };

    const result = await signInApi(userData);

    expect(result).toEqual({ error: "Invalid username, email, or password" });
  });
});

describe("signOutApi", () => {
  it("should return success when sign-out is successful", async () => {
    mockSignOut.mockResolvedValueOnce(undefined);

    const result = await signOutApi();

    expect(result).toEqual({ success: true });
  });

  it("should handle sign-out error correctly", async () => {
    const mockSignOutError = new Error("Some sign-out error");
    mockSignOut.mockRejectedValueOnce(mockSignOutError);

    const result = await signOutApi();

    expect(result).toEqual({ error: "An unexpected error occurred" });
  });
});
