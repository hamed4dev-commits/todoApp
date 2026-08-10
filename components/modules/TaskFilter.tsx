"use client"

import {  useState } from "react";
import TaskItem from "./TaskItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TaskFilter = ({ data }: { data: Todo[] }) => {
    const [completed, setCompleted] = useState<boolean | null>(null)
    // useEffect(()=>{
    //     switch(completed){
    //         case true:
    //             console.log(data.filter((item)=>item?.completed === true))
    //             break;
    //         case false:
    //             console.log(data.filter((item)=>item?.completed === false))
    //             break;
    //         default:
    //             console.log(data)
    //     }
    // },[completed])
  return (
    <div>
        <button className="px-4 py-2 border-b-emerald-500 border-1 rounded-2xl m-2 cursor-pointer" onClick={()=>setCompleted(null)}>All</button>
        <button className="px-4 py-2 border-b-emerald-500 border-1 rounded-2xl m-2 cursor-pointer" onClick={()=>setCompleted(true)}>Completed</button>
        <button className="px-4 py-2 border-b-emerald-500 border-1 rounded-2xl m-2 cursor-pointer" onClick={()=>setCompleted(false)}>Not Completed</button>
        {completed === null && data.map((item)=> <TaskItem item={item} key={item.id} /> )}
        {completed === true && data.filter((item)=>item?.completed === true).map((item)=> <TaskItem item={item} key={item.id} /> )}
        {completed === false && data.filter((item)=>item?.completed === false).map((item)=> <TaskItem item={item} key={item.id} /> )}
    </div>
  )
}

export default TaskFilter