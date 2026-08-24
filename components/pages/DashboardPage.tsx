// 'use server'
"use client"
import { useAuthStore } from "@/stores/authStore";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage =  () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  // console.log("token:",token);

  // async function clearCookie() {
  //   "use server";
  //   const cookieStore = await cookies();
  //   cookieStore.delete("token");
  //   redirect("/login");
  // }
  const {clearUser,user} = useAuthStore()

  // if( !token) redirect("/login","replace")
  console.log(user)
  
  return <div>
    Dash
    <form action={clearUser}>
      <button className="cursor-pointer" type="submit">Logout</button>
    </form>
  </div>;
};
export default DashboardPage;
