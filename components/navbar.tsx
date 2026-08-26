"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Plus, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface NavbarProps {
  maxWidth?: string;
  className?: string;
  showHome?: boolean;
  showDashboard?: boolean;
  showCreate?: boolean;
  showLogout?: boolean;
  children?: React.ReactNode;
}

export default function Navbar({
  maxWidth = "max-w-6xl",
  className = "sticky top-4 z-50",
  showHome,
  showDashboard,
  showCreate,
  showLogout,
  children,
}: NavbarProps) {
  const pathname = usePathname();

  // Determine smart defaults based on current path if not explicitly provided
  const isDashboardPage = pathname === "/dashboard";
  const isCreatePage = pathname === "/create";

  const shouldShowDashboard =
    showDashboard !== undefined ? showDashboard : !isDashboardPage;
  const shouldShowCreate =
    showCreate !== undefined ? showCreate : !isCreatePage;
  const shouldShowHome = showHome !== undefined ? showHome : true;
  const shouldShowLogout = showLogout !== undefined ? showLogout : true;

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/signin";
          },
        },
      });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className={`${className} ${maxWidth} mx-auto w-full px-4 sm:px-6`}>
      <nav className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-4 py-2.5 nav-glow flex items-center justify-between">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-[8px] overflow-hidden border border-[#1a3300]/20 shadow-xs group-hover:scale-105 transition-transform bg-[#ffe95c] shrink-0">
              <img
                src="/logo.jpg"
                alt="SlideSpark Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-[#1a3300]">
                SlideSpark
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Navbar Action Buttons */}
        <div className="flex items-center gap-2.5">
          {shouldShowDashboard && (
            <Link
              href="/dashboard"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Dashboard</span>
            </Link>
          )}

          {shouldShowCreate && (
            <Link
              href="/create"
              className="min-h-[36px] px-4 py-1.5 rounded-[6px] bg-[#1a3300] hover:bg-[#1a3300]/90 text-[#fcfaf5] font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New</span>
            </Link>
          )}

          {shouldShowHome && (
            <Link
              href="/"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          )}

          {shouldShowLogout && (
            <button
              onClick={handleSignOut}
              className="min-h-[36px] px-3 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300]/70 hover:text-[#cb5521] hover:border-[#cb5521] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}

          {children}
        </div>
      </nav>
    </div>
  );
}
