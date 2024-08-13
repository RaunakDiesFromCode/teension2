import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-11 h-full w-full space-y-3 text-center">
      <div className="text-center">
        <h1 className="mb-4 p-0 text-[20rem] font-semibold text-red-500 [text-shadow:_15px_15px_0px_#94e3fe]">
          404
        </h1>
        <p className="mb-4 text-lg text-foreground">
          Oops! Looks like you&apos;re lost.
        </p>
        <p className="mt-4 text-foreground">
          Let&apos;s get you back{" "}
          <Link href="/" className="text-blue-500">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
