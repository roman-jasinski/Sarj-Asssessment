import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/SideBar";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>
    </SidebarProvider>
  );
}
