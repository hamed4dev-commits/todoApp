"use client"

import { useAuthStore } from "@/stores/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const AuthProvider =  ({ children }: { children: React.ReactNode }) => {
 const {isLogged,user} = useAuthStore()
 useEffect(()=> {
  isLogged()
 },[isLogged])
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // if (!token) redirect("/login");
  // const getLoggedUser = async() => {

  //   const res = await fetch("/api/auth/me")
  //   const data = await res.json()
  //   console.log(data)
  // }
  
  // console.log(getLoggedUser)
  return <>{children}</>;
};

export default AuthProvider;
