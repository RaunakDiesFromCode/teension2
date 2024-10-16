// src/app/api/users/[userId]/tribe/route.ts
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        tribe: true,
      },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const data = {
      tribe: user.tribe,
      // isCurrentUser: loggedInUser.id === userId,
    };

    return Response.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (loggedInUser.id !== userId) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { tribe } = await req.json();

    if (!tribe) {
      return Response.json({ error: "Tribe is required" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { tribe },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
