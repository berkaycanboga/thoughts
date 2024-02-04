import { SignUpUser, LoginUser } from "../models/User";
import prisma from "../utils/prisma";
import {
  SignInValidationResult,
  validateSignIn,
} from "../utils/validation/signInValidation";
import {
  SignUpValidationResult,
  validateSignUp,
} from "../utils/validation/signUpValidation";

export const createUser = async (userData: SignUpUser) => {
  const { password, identifier, ...rest } = userData;

  const validation: SignUpValidationResult = validateSignUp({
    identifier,
    password,
    ...rest,
  });

  if (validation.errors && Object.keys(validation.errors).length > 0) {
    const firstErrorKey = Object.keys(validation.errors)[0];
    throw new Error(validation.errors[firstErrorKey]);
  }

  const { identifierType } = validation;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifierType === "email" ? identifier : undefined },
        { phone: identifierType === "phone" ? identifier : undefined },
      ],
    },
  });

  if (existingUser) {
    throw new Error("Email or phone already in use");
  }

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: password,
      email: identifierType === "email" ? identifier : undefined,
      phone: identifierType === "phone" ? identifier : undefined,
    },
  });

  return user;
};

export const findUser = async (credentials: LoginUser) => {
  const { identifier, password } = credentials;

  const validation: SignInValidationResult = validateSignIn({
    identifier,
    password,
  });

  if (validation.errors && Object.keys(validation.errors).length > 0) {
    const firstErrorKey = Object.keys(validation.errors)[0];
    throw new Error(validation.errors[firstErrorKey]);
  }

  const { identifierType } = validation;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifierType === "username" ? identifier : undefined },
        { email: identifierType === "email" ? identifier : undefined },
        { phone: identifierType === "phone" ? identifier : undefined },
      ],
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
