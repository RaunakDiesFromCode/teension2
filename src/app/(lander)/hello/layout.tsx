import { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import Navbar from "./navbar";
import Footer from "./Footer";

const mainFont = Fira_Sans({ weight: "700", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hello",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={`relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-700 via-violet-800 to-red-900`}
      >
        <div className="flex h-[80%] w-[90%] flex-col rounded-xl bg-background shadow-2xl">
          <Navbar />
          <div
            className={`flex flex-1 flex-col overflow-y-auto p-4 ${mainFont.className}`}
          >
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
