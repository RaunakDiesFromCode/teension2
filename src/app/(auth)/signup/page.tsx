import { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./signUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <div className="flex h-full max-h-[40rem] w-full max-w-[40rem] overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-full">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold"> Hello!! </h1>
            <p className="text-muted-foreground">
              Are you sure you wanna get in? 🤔 coz there&apos;s no going
              back!!
            </p>
          </div>
          <div className="space-y-5">
            <SignupForm />
            <div className="block text-center">
              {`Already been here? `}
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
