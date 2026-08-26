
import { Todo } from "../../types/taskFilter.type";
import TaskFilter from "../modules/TaskFilter";



const TasksPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    cache: "no-store",
  });
  const data: Todo[] = await res.json();
  // console.log(data)

  return (
    <div>
      <TaskFilter data={data} />
    </div>
  );
};

export default TasksPage;
