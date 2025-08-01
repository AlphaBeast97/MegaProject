"use client";

import type { PropsWithChildren } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { useUserSync } from "@/hooks/useUserSync";

export function AppLayout({ children }: PropsWithChildren) {
  // This will automatically sync users to MongoDB when they sign in
  useUserSync();

  return (
    <div className="bg-background">
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
