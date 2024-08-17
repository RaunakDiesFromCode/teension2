"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { getUserDataSelect } from "@/lib/types";
import {
  UpdateUserProfileValues,
  updateUserProfileSchema,
} from "@/lib/validation";
import { set } from "date-fns";

export async function updateUserProfile(values: UpdateUserProfileValues) {
  const { user } = await validateRequest();

  const validatedValues = updateUserProfileSchema.parse(values);

  if (!user) throw new Error("Unauthorized");

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: validatedValues,
      select: getUserDataSelect(user.id),
    });
    await streamServerClient.partialUpdateUser({
      id: user.id,
      set: {
        name: validatedValues.displayName,
      },
    });
    return updatedUser;
  });

  return updatedUser;
}
