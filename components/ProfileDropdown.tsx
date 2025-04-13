"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import type { User } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ProfileDropdown = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-gray-800 transition-all duration-300 group p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:block text-gray-200 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">
          {user.name}
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 transform origin-top transition-all duration-300 scale-100 opacity-100">
          <div className="py-2" role="menu">
            <div className="px-4 py-3 border-b border-gray-700/50">
              <p className="font-medium text-white text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 flex items-center gap-2 group"
              role="menuitem"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
