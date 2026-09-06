"use client";
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/src/shared/stores/authStore";
import { LayoutDashboard, ListClock, UserRound } from "lucide-react";
import Link from "next/link";

const SidebarTemplate = () => {
  const { user } = useAuthStore();
  const items = [
    { title: "dashboard", icon: <LayoutDashboard />, link: "/" },
    { title: "tasks", icon: <ListClock />, link: "/task" },
    { title: "users", icon: <UserRound />, link: "/users" },
    // {title:"dashboard", icon: <LayoutDashboard />, link: "/"},
  ];

  return (
    // <div className="w-full h-full flex flex-col gap-5 to-20% bg-linear-to-b from-gray-600 to-gray-800 p-4 text-white">
    //   {user ? <p>hi {user?.name}</p> : <Link href={"/login"}>Login</Link>}

    //   <Link href={"/"}> Dashboard</Link>
    //   <Link href={"/task"}> Tasks</Link>
    //   <Link href={"/users"}> Users</Link>
    //   {/* <div className="h-full"></div> */}
    // </div>
    // className="*:to-20% *:bg-linear-to-b *:from-gray-600 *:to-gray-800 relative! left-auto! border-r "
    <Sidebar collapsible="icon" variant="floating" side="center" className="*:to-20% *:bg-linear-to-b *:from-gray-600 *:to-gray-800 left-auto! border-r ">
      <SidebarHeader className=" flex flex-row items-center">
        <Avatar size="lg" className="block">
          <AvatarFallback>{user?.name.slice(0,2).toUpperCase()}</AvatarFallback>
          <AvatarBadge className="bg-lime-500" />
        </Avatar>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium text-lime-400">
            Hi, {user?.name}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
      <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    <Link href={item.link} className="flex gap-2 items-center">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarTemplate;
