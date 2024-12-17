import {
  Home,
  Image,
  FileText,
  Edit,
  Search,
  BarChart,
  Settings,
  Bell,
  Users,
  File,
} from "lucide-react";

export const menuItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Media", icon: Image, href: "/media" },
  // { name: "Posts", icon: FileText, href: "/posts" },
  { name: "Write", icon: Edit, href: "/dashboard/write" },
  { name: "Find Posts", icon: Search, href: "/find-posts" },
  // { name: "Analytics", icon: BarChart, href: "/analytics" },
  // { name: "Users", icon: Users, href: "/users" },
  // { name: "Reports", icon: File, href: "/reports" },
];
