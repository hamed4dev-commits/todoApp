import Link from "next/link";

type Todo = {
  id: number;
  title: string;
};

const TasksPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    cache: "no-store",
  });
  const data: Todo[] = await res.json();

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => (
          <p key={item.id}>
            <Link href={`/task/${item.id}`} >{item.title}</Link>
          </p>
        ))}
    </div>
  );
};

export default TasksPage;
