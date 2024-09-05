"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import clsx from "clsx";
import { FileIcon, HeartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="border-b py-3 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.png" width="80" height="80" alt="FilerFox Logo" />
          </Link>
        </div>

        <SignedIn>
          {/* Navigation Links - Centered on laptop and tablet */}
          <nav className="hidden md:flex flex-grow justify-center items-center gap-6">
            <Link href="/dashboard/files">
              <Button
                variant={"link"}
                className={clsx(
                  "flex gap-2 text-secondary-foreground",
                  pathname.includes("/dashboard/files") && "text-primary"
                )}
              >
                <FileIcon />
                Files
              </Button>
            </Link>

            <Link href="/dashboard/favorites">
              <Button
                variant={"link"}
                className={clsx(
                  "flex gap-2 text-secondary-foreground",
                  pathname.includes("/dashboard/favorites") && "text-primary"
                )}
              >
                <HeartIcon />
                Favorites
              </Button>
            </Link>

            <Link href="/dashboard/trash">
              <Button
                variant={"link"}
                className={clsx(
                  "flex gap-2 text-secondary-foreground",
                  pathname.includes("/dashboard/trash") && "text-primary"
                )}
              >
                <Trash2Icon />
                Trash
              </Button>
            </Link>
          </nav>
        </SignedIn>

        {/* User Actions Section */}
        <div className="flex items-center gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </SignedIn>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full z-20 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ width: "250px" }}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <nav className="mt-16 flex flex-col items-start px-4 space-y-4">
          <Link href="/dashboard/files" onClick={toggleSidebar}>
            <Button
              variant={"link"}
              className={clsx(
                "flex gap-2 text-secondary-foreground w-full justify-start",
                pathname.includes("/dashboard/files") && "text-primary"
              )}
            >
              <FileIcon />
              Files
            </Button>
          </Link>

          <Link href="/dashboard/favorites" onClick={toggleSidebar}>
            <Button
              variant={"link"}
              className={clsx(
                "flex gap-2 text-secondary-foreground w-full justify-start",
                pathname.includes("/dashboard/favorites") && "text-primary"
              )}
            >
              <HeartIcon />
              Favorites
            </Button>
          </Link>

          <Link href="/dashboard/trash" onClick={toggleSidebar}>
            <Button
              variant={"link"}
              className={clsx(
                "flex gap-2 text-secondary-foreground w-full justify-start",
                pathname.includes("/dashboard/trash") && "text-primary"
              )}
            >
              <Trash2Icon />
              Trash
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
