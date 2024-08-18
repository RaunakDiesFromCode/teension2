import { Metadata } from "next";
import LoginForm from "./LoginForm";
import Link from "next/link";
import GoogleSignInButton from "./google/GoogleSignInButton";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <div className="flex h-full max-h-[40rem] w-full max-w-[40rem] overflow-hidden rounded-xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-full">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold"> Welcome back!! </h1>
            <p className="text-muted-foreground">
              Can&apos;t spend a minute without us eh?? 😏
            </p>
          </div>
          <div className="space-y-5">
            <GoogleSignInButton />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>or</span>
              <div className="h-px flex-1 bg-muted"/>
            </div>
            <LoginForm />
            <div className="block text-center">
              {`New here? `}
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
