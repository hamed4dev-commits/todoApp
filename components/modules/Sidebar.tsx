import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <Link href={"/"}  > Dashboard</Link> 
      <Link href={"/task"}  > Tasks</Link> 
      <Link href={"/users"}  > Users</Link> 
      {/* <div className="h-full"></div> */}
    </div>
  )
}

export default Sidebar