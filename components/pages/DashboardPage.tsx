// 'use server'
"use client";
import { useAuthStore } from "@/stores/authStore";
import { redirect, useRouter } from "next/navigation";

const DashboardPage = () => {
  const { clearUser, user } = useAuthStore();

  const router = useRouter();
  const logoutHandler = () => {
    clearUser();
    router.replace("/login");
  };

  return (
    <div>
      {/* Dash */}

      <button className="cursor-pointer" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};
export default DashboardPage;
