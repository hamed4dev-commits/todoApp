"use client"

import { useAuthStore } from "@/stores/authStore";
import { redirect } from "next/navigation";

import { useEffect } from "react";

const AuthInitializer =  () => {
 const {checkAuth,user} = useAuthStore()
 useEffect(()=> {
  checkAuth()
 },[checkAuth])
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // if (!token) redirect("/login");
  // const getLoggedUser = async() => {

  //   const res = await fetch("/api/auth/me")
  //   const data = await res.json()
  //   console.log(data)
  // }
  
  // console.log(getLoggedUser)
  return null
};

export default AuthInitializer;
