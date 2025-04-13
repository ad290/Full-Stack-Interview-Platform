import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import ProfileDropdown from "@/components/ProfileDropdown";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();

  // Handle authentication redirects
  if (!isUserAuthenticated || !user) {
    redirect("/sign-in");
  }

  return (
    <div className="root-layout bg-gray-950 min-h-screen">
      <nav className="flex justify-between items-center px-4 py-3 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.svg"
            alt="MockMate Logo"
            width={38}
            height={32}
            className="group-hover:scale-110 transition-transform duration-300"
            priority
          />
          <h2 className="text-primary-100 group-hover:text-white transition-colors duration-300">
            SharpPrep
          </h2>
        </Link>
        <ProfileDropdown user={user} />
      </nav>

      <main className="container mx-auto px-4 py-6 text-gray-100">
        {children}
      </main>
    </div>
  );
};

export default Layout;
