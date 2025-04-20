"use client";

import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="px-12 h-16 flex items-center justify-between font-semibold fixed top-0 left-0 w-full">
      <div className="flex flex-row gap-12">
        <div className="flex flex-row justify-center items-center gap-3 font-bold">
          <Image src={logo} alt="logo" width={35} height={35} />
          LibraryManager-AI
        </div>

        <Link
          href="/"
          className={`hover:text-gray-300 ${
            pathname === "/" ? "border-b-2 border-[var(--foreground)]" : ""
          }`}
        >
          Chatbot
        </Link>
        <Link
          href="/dashboard"
          className={`hover:text-gray-300 ${
            pathname === "/dashboard"
              ? "border-b-2 border-[var(--foreground)]"
              : ""
          }`}
        >
          Dashboard
        </Link>
        {!user && (
          <Link
            href="/login"
            className={`hover:text-gray-300 ${
              pathname === "/login"
                ? "border-b-2 border-[var(--foreground)]"
                : ""
            }`}
          >
            Login
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            href="/add-books"
            className={`hover:text-gray-300 ${
              pathname === "/add-books"
                ? "border-b-2 border-[var(--foreground)]"
                : ""
            }`}
          >
            Add Books
          </Link>
        )}
        {user && (
          <Link
            href="/all-books"
            className={`hover:text-gray-300 ${
              pathname === "/all-books"
                ? "border-b-2 border-[var(--foreground)]"
                : ""
            }`}
          >
            All Books
          </Link>
        )}
      </div>
      {user && (
        <button onClick={handleLogout} className="hover:text-gray-300">
          Logout
        </button>
      )}
    </div>
  );
}
