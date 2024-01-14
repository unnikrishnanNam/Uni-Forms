"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/formSchema";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr("User not found");
  }
  const stats = prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });
  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;
  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid data received");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr("User not found");
  }
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });
  if (!form) {
    throw new Error("Failed to create form");
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr("User not found");
  }
  const forms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return forms;
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr("User not found");
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id: id,
    },
  });
}
