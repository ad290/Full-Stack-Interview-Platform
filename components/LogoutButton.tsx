"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <Button
      variant="ghost"
      className="text-red-500 hover:text-red-600"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
