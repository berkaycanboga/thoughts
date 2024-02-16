import argon2 from "argon2";

import { SignUpUser } from "../models/User";
import prisma from "../utils/prisma";
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

  const existingUserEmail = await prisma.user.findFirst({
    where: {
      email: identifierType === "email" ? identifier : undefined,
    },
  });

  const existingUserUsername = await prisma.user.findFirst({
    where: {
      username: userData.username,
    },
  });

  if (existingUserEmail) {
    throw new Error("Email already exists.");
  }

  if (existingUserUsername) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
      email: identifierType === "email" ? identifier : undefined,
    },
  });

  return user;
};
