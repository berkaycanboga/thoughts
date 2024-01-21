import { z, ZodError } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const SignInSchema = z.object({
  identifier: z.string().min(1, "Email or Phone is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInValidation = z.infer<typeof SignInSchema>;

export interface SignInValidationResult {
  errors: Record<string, string>;
  identifierType?: "email" | "phone" | "username";
}

export const validateSignIn = (
  data: SignInValidation,
): SignInValidationResult => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { identifier, password } = SignInSchema.parse(data);

    let identifierType: "email" | "phone" | undefined;
    const phoneNumber = parsePhoneNumberFromString(identifier, "US");

    if (z.string().email().safeParse(identifier).success) {
      identifierType = "email";
    } else if (phoneNumber?.isValid()) {
      identifierType = "phone";
    }

    return {
      errors: {},
      identifierType,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};

      error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });

      return {
        errors,
      };
    }

    return {
      errors: {
        signin: "Validation error",
      },
    };
  }
};
