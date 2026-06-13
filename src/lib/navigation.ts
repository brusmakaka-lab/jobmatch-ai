import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  Radar,
  UserRound,
} from "lucide-react";

export const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/resumes", label: "Resumes", icon: FileText },
  { href: "/jobs/analyze", label: "Analyze", icon: Radar },
  { href: "/applications", label: "Tracker", icon: BriefcaseBusiness },
  { href: "/dashboard#insights", label: "Insights", icon: BarChart3 },
];

