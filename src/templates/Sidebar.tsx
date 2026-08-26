"use client";
import { useAuthStore } from "@/src/stores/authStore";
import Link from "next/link";

const Sidebar = () => {
  const {  user } = useAuthStore();

 
  return (
    <div className="w-full h-full flex flex-col gap-5 to-20% bg-linear-to-b from-gray-600 to-gray-800 p-4 text-white">
      {user ? <p>hi {user?.name}</p> : <Link href={"/login"}>Login</Link>}

      
      <Link href={"/"}> Dashboard</Link>
      <Link href={"/task"}> Tasks</Link>
      <Link href={"/users"}> Users</Link>
      {/* <div className="h-full"></div> */}
    </div>
  );
};

export default Sidebar;
