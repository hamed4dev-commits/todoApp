import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarTemplate from "@/src/templates/SidebarTemplate";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="mx-auto flex min-h-svh max-w-7xl w-full">
    //   <SidebarProvider className="flex w-full min-h-svh">
    //     <SidebarTemplate />
    //     <SidebarInset className="flex flex-col">

    //     {/* <main className="flex flex-1 flex-col min-w-0"> */}
    //       <div className="flex h-14 items-center gap-2 px-4 border-b">
    //         <SidebarTrigger />
    //       </div>
    //       <div className="flex-1 overflow-auto p-4">{children}</div>
    //     {/* </main> */}
    //     </SidebarInset>
    //   </SidebarProvider>
    // </div>
    <div className="mx-auto w-full max-w-7xl relative">
      <SidebarProvider className="min-h-svh w-full absolute">
        <SidebarTemplate />

        <SidebarInset className="min-w-0 flex-1">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>

          <main className="min-w-0 flex-1 overflow-auto p-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default SidebarWrapper;
