
import { Todo } from "../../types/taskFilter.type";
import TaskFilter from "../modules/TaskFilter";




const TasksPage = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
      cache: "no-store",
    });
    // console.log(res)
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status} ${res.statusText}`);
    }

    const data: Todo[] = await res.json();
    // console.log("Fetched data:", data);

    if (!data || data.length === 0) {
      return <h3>No tasks found</h3>;
    }

    return (
      <div>
        <TaskFilter data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return <h3>Failed to load tasks. Please try again later.</h3>;
  }
};

export default TasksPage;
