import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/UserNav";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <UserNav />
    </header>
  );
}
