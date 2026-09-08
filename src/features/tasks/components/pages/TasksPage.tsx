
import { Todo } from "../../types/taskFilter.type";
import { basicColumns } from "../modules/task-table/columns";
import { DataTable } from "../modules/task-table/data-table";
import TaskFilter from "../modules/TaskFilter";




const TasksPage = async () => {
  const baseUrl = process.env.BASE_URL
  try {
    const res = await fetch(`${baseUrl}/todos`, {
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
      <div className="container mx-auto py-10">
        <TaskFilter data={data} />
        {/* <DataTable columns={basicColumns} data={data} /> */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return <h3>Failed to load tasks. Please try again later.</h3>;
  }
};

export default TasksPage;
