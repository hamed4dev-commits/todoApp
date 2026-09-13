import TasksPage from "@/src/features/tasks/components/pages/TasksPage";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Tasks"
}
export default function Tasks() {
    return (
        <TasksPage />
    );
}