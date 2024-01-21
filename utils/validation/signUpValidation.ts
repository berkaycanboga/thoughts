import { z, ZodError } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const SignUpSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or Phone is required")
    .email()
    .refine(
      (value) => {
        if (z.string().email().safeParse(value).success) {
          return true;
        }

        const phoneNumber = parsePhoneNumberFromString(value, "US");
        return phoneNumber?.isValid();
      },
      { message: "Invalid email or phone format" },
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid characters in username"),
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
});

type SignUpValidation = z.infer<typeof SignUpSchema>;

export interface SignUpValidationResult {
  errors: Record<string, string>;
  identifierType?: "email" | "phone";
}

export const validateSignUp = (
  data: SignUpValidation,
): SignUpValidationResult => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { identifier, username, fullName, password } =
      SignUpSchema.parse(data);

    let identifierType: "email" | "phone" | undefined;

    if (z.string().email().safeParse(identifier).success) {
      identifierType = "email";
    } else {
      const phoneNumber = parsePhoneNumberFromString(identifier, "US");
      if (phoneNumber?.isValid()) {
        identifierType = "phone";
      }
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
        signup: "Validation error",
      },
    };
  }
};
