import {
  Home,
  Compass,
  Plus,
  LayoutDashboard,
  Coins,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  primary?: boolean;
};

export const appNav: NavItem[] = [
  { label: "Home", href: "/app", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Create", href: "/create", icon: Plus, primary: true },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Token", href: "/token", icon: Coins },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

// Subset shown in the mobile bottom bar.
export const mobileNav: NavItem[] = [
  { label: "Home", href: "/app", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Create", href: "/create", icon: Plus, primary: true },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/profile", icon: User },
];
