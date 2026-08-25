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

      <button className="cursor-pointer px-4 py-2 bg-taupe-700 rounded-2xl mt-4.5 hover:opacity-75 hover:scale-105 " onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};
export default DashboardPage;
