
import TaskFilter from "../modules/TaskFilter";
import TaskItem from "../modules/TaskItem";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TasksPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    cache: "no-store",
  });
  const data: Todo[] = await res.json();
  // console.log(data)

  return (
    <div>
      <TaskFilter data={data} />
      {/* {data.length > 0 &&
        data.map((item) => (
          <TaskItem item={item} key={item.id} />
        
        ))} */}
    </div>
  );
};

export default TasksPage;
