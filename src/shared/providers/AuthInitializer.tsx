"use client"


import { useAuthStore } from "@/src/stores/authStore";


import { useEffect } from "react";

const AuthInitializer =  () => {
 const {checkAuth,user} = useAuthStore()
 useEffect(()=> {
  checkAuth()
 },[checkAuth])
 
  return null
};

export default AuthInitializer;
