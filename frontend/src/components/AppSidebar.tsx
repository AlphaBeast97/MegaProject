'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { ChefHat, Home, Lightbulb, Utensils, BookOpen, PlusCircle, Camera, Shuffle, Sparkles } from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/recipes', label: 'All Recipes', icon: BookOpen },
  { href: '/recipes/new', label: 'New Recipe', icon: PlusCircle },
];

const aiTools = [
  { href: '/image-to-recipe', label: 'Image to Recipe', icon: Camera },
  { href: '/random-recipe', label: 'Random Recipe', icon: Shuffle },
  { href: '/recipes/new', label: 'Create Recipe', icon: Sparkles },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-headline font-semibold">Culinary Canvas</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Features</span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {aiTools.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}
