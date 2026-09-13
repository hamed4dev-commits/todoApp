import NewTask from "@/src/features/tasks/components/pages/NewTask";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Create Task"
}
export default function Page() {
  return <NewTask />;
}
