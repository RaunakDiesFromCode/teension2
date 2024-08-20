import Icon from "@/components/Icon";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <a href="https://pagedone.io/" className="flex justify-center">
            <div className="flex items-center gap-2">
              <Icon className="md:size-8" />
              <div className="flex items-end">
                <h1 className="text-4xl font-bold">teension</h1>
                <h1 className="text-xl font-bold">.vercel.app</h1>
              </div>
            </div>
          </a>
          <ul className="mb-10 flex flex-col items-center justify-center gap-7 border-b border-gray-500 py-16 text-lg transition-all duration-500 md:flex-row md:gap-12">
            <li>
              <a
                href="#"
                className="text-gray-600 transition-all duration-500 hover:text-indigo-600"
              >
                Carrier
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 transition-all duration-500 hover:text-indigo-600"
              >
                Resources
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 transition-all duration-500 hover:text-indigo-600"
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 transition-all duration-500 hover:text-indigo-600"
              >
                Support
              </a>
            </li>
          </ul>
          <div className="mb-14 flex items-center justify-center space-x-10">
            <a
              href="#"
              className="block text-gray-600 transition-all duration-500 hover:text-indigo-600"
            >
              <Twitter />
            </a>
            <a
              href="#"
              className="block text-gray-600 transition-all duration-500 hover:text-indigo-600"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="block text-gray-600 transition-all duration-500 hover:text-indigo-600"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="block text-gray-600 transition-all duration-500 hover:text-indigo-600"
            >
              <Github />
            </a>
          </div>
          <span className="block text-center text-lg text-gray-500">
            ©{new Date().getFullYear()}, Raunak
            <br />
            All rights reserved.
            <h1 className="text-xs text-gray-300">This website is still in a beta build, so please be patient with the bugs and errors.<br/> Feel free to report them.

            </h1>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
