'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;
  // console.log("token:",token);

  async function clearCookie() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
  }
  

  // if( !token) redirect("/login","replace")
  
  return <div>
    Dash
    <form action={clearCookie}>
      <button className="cursor-pointer" type="submit">Logout</button>
    </form>
  </div>;
};
export default DashboardPage;
