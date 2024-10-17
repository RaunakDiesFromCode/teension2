import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/navbar";
import MenuBar from "./MenuBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  // if (!session.user) redirect("/login");
  if (!session.user) redirect("/hello");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl py-5 px-3 sm:px-0 flex w-full grow gap-5">
          <MenuBar className="sticky top-[30%] h-full hidden sm:block flex-none space-y-3 rounded-2xl px-3 z-50 py-5 lg:px-5 xl:w-80"/>
          {children}
        </div>
        <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 bg-card p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
}
