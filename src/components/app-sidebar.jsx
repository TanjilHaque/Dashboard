"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CLICON Inc.",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Banner",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Banner",
          url: "create-banner",
        },
        {
          title: "All Banner",
          url: "all-banner",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Category",
          url: "create-category",
        },
        {
          title: "All Category",
          url: "all-category",
        },
      ],
    },
    {
      title: "Sub-Category",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Create Sub-Category",
          url: "create-subCategory",
        },
        {
          title: "All Sub-Category",
          url: "all-subCategory",
        },
      ],
    },
    {
      title: "Brand",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Create Brand",
          url: "create-brand",
        },
        {
          title: "All Brand",
          url: "all-brand",
        },
      ],
    },
    {
      title: "Product",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Create Product",
          url: "create-product",
        },
        {
          title: "All Product",
          url: "all-product",
        },
      ],
    },
    {
      title: "Variant",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Create Variant",
          url: "create-variant",
        },
        {
          title: "All Variant",
          url: "all-variant",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
