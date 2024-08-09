// src/app/(auth)/layout.tsx
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  // If the user is logged in, redirect them to the homepage or another protected page
  if (user) {
    redirect("/");
    // return null; // Ensure no further rendering happens after redirect
  }

  // If the user is not logged in, render the children (login page or other auth pages)
  return <>{children}</>;
}
