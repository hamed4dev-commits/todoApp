import TaskDetails from "@/src/features/tasks/components/pages/TaskDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <TaskDetails id={id} />;
}
