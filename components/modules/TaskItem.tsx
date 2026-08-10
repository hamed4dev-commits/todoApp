type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
const TaskItem = ({ item }: { item: Todo }) => {
  return (
    <div>
      TSKItem{item?.id}: {item.title}
      <span className={item.completed ? "text-green-500" : "text-amber-400"}>
        {item.completed ? "Completed" : "pending"}
      </span>
    </div>
  );
};

export default TaskItem;
