"use client";
import { Avatar } from "@/components/ui/avatar";
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { useAuthStore } from "@/src/shared/stores/authStore";
import Link from "next/link";

const SidebarTemplate = () => {
  const {  user } = useAuthStore();

 
  return (
    // <div className="w-full h-full flex flex-col gap-5 to-20% bg-linear-to-b from-gray-600 to-gray-800 p-4 text-white">
    //   {user ? <p>hi {user?.name}</p> : <Link href={"/login"}>Login</Link>}

      
    //   <Link href={"/"}> Dashboard</Link>
    //   <Link href={"/task"}> Tasks</Link>
    //   <Link href={"/users"}> Users</Link>
    //   {/* <div className="h-full"></div> */}
    // </div>
    // className="*:to-20% *:bg-linear-to-b *:from-gray-600 *:to-gray-800 relative! left-auto! border-r "
     <Sidebar collapsible="icon" variant="floating" side="center">
      <SidebarHeader>
        <Avatar>H</Avatar>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <Link href={"/"}> Dashboard</Link>
        <SidebarGroup />
        <SidebarGroup />
        <Link href={"/task"}> Tasks</Link>
        <SidebarGroup />
        <SidebarGroup />
        <Link href={"/users"}> Users</Link>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default SidebarTemplate;
