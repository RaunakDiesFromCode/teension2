import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return { status: 401, body: { error: "Unauthorized" } };
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuesAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      user.id,
      expirationTime,
      issuesAt,
    );

    return Response.json({ token });
  } catch (error) {
    console.error(error);
    return { status: 500, body: { error: "Internal Server Error" } };
  }
}
