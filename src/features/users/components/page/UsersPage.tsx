
import UserCard from "../modules/UserCard";

type UserT = [{
  id: string,
  name:string,
  email:string,

}]

export default async function UsersPage ()  {
  
  // try {
  //   const res = await fetch("/api/users")
  //   console.log(res.json())
  //   // const res = await fetch(`${baseUrl}users`)
  //   if(!res.ok) {
  //     throw new Error(`Failed to fetch Users: ${res.status} ${res.statusText}`)
  //   }
  //   const data: UserT = await res.json()
  //   if (!data ) {
  //     return <h3>No tasks found</h3>;
  //   }
  //   console.log(data)
    return (
      <div>UsersPage
        <UserCard />
        {/* <UserCard data={data} /> */}
      </div>
    )
  // } catch (error) {
  //   console.error("Error fetching users:", error);
  //   return <h3>Failed to load users. Please try again later.</h3>;
  // }
}

