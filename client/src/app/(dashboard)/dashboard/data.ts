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
  { name: "Dashboard", icon: Home, href: "/dashboard", role: "USER" },
  { name: "Media", icon: Image, href: "/dashboard/media", role: "USER" },
  // { name: "Posts", icon: FileText, href: "/posts" },
  { name: "Write", icon: Edit, href: "/dashboard/write", role: "USER" },
  { name: "Find Posts", icon: Search, href: "/find-posts", role: "USER" },
  // { name: "Analytics", icon: BarChart, href: "/analytics" },
  { name: "Users", icon: Users, href: "/dashboard/users", role: "ADMIN" },
  // { name: "Reports", icon: File, href: "/reports" },
];
