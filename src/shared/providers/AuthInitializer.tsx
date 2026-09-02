"use client"


import { useAuthStore } from "@/src/shared/stores/authStore";


import { useEffect } from "react";

const AuthInitializer =  () => {
 const {checkAuth,user} = useAuthStore()
 useEffect(()=> {
  checkAuth()
 },[checkAuth])
 
  return null
};

export default AuthInitializer;
