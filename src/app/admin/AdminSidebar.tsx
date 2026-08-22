"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  MapPin,
  Globe,
  Mail,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/regions", label: "Regions", icon: Globe },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-56 border-r border-[#CCCCCC] py-8 pr-6">
      <h2 className="font-[family-name:var(--font-moret)] text-xl font-bold mb-6 pl-4">
        Admin
      </h2>
      <nav className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-[#1A1A1A] text-white"
                  : "text-[#555555] hover:bg-[#F5F5F5] hover:text-[#1A1A1A]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
