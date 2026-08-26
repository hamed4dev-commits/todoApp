export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type FilterType = "all" | "completed" | "not-completed" | "favorites";