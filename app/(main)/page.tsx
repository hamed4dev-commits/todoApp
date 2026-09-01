'use server';

import DashboardPage from "@/src/features/dashboard/page/DashboardPage";



export default async function Home() {
  return (
    <div className="min-h-10/12">
      <DashboardPage />
    </div>
  );
}
