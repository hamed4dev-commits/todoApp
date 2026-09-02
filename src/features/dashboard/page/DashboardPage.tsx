// 'use server'
"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/src/shared/stores/authStore";
import { Ghost } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { clearUser, user } = useAuthStore();

  const router = useRouter();
  const logoutHandler = () => {
    clearUser();
    router.replace("/login");
  };

  return (
    <div>
      

      <button className="cursor-pointer px-4 py-2 bg-taupe-700 rounded-2xl mt-4.5 hover:opacity-80 hover:scale-102 " onClick={logoutHandler}>
        Logout
      </button>
      <Button variant={"outline"}>something</Button>
    </div>
  );
};
export default DashboardPage;
