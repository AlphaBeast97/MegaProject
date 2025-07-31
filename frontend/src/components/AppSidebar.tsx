"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  ChefHat,
  Home,
  BookOpen,
  Camera,
  Shuffle,
  Sparkles,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/recipes", label: "All Recipes", icon: BookOpen },
  { href: "/about", label: "About", icon: ChefHat },
];

const aiTools = [
  { href: "/image-to-recipe", label: "Image to Recipe", icon: Camera },
  { href: "/random-recipe", label: "Random Recipe", icon: Shuffle },
  { href: "/recipes/new", label: "Create Recipe", icon: Sparkles },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full bg-white backdrop-blur-lg border-r border-white/50 shadow-xl">
      <SidebarHeader className="p-4 border-b border-white/20 bg-white/70 backdrop-blur-md">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
        >
          <ChefHat className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-headline font-semibold">
            Culinary Canvas
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto bg-transparent backdrop-blur-md">
        <SidebarGroup className="p-2">
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  className="hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 hover:shadow-sm data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700"
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  >
                    <item.icon className="transition-transform duration-200 hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="p-2">
          <SidebarGroupLabel className="flex items-center gap-2 px-3 py-2 text-orange-600 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>AI Features</span>
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            {aiTools.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50 hover:text-orange-700 transition-all duration-200 hover:shadow-sm group data-[active=true]:bg-gradient-to-r data-[active=true]:from-orange-100 data-[active=true]:to-purple-100 data-[active=true]:text-orange-700"
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  >
                    <item.icon className="transition-all duration-200 group-hover:scale-110 group-hover:text-orange-600" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
