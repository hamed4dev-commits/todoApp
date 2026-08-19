'use server';
import Dashboard from "@/components/pages/DashboardPage";


export default async function Home() {
  return (
    <div className="min-h-10/12">
      <Dashboard />
    </div>
  );
}
