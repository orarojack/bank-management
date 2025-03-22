import type React from "react"
import type { Metadata } from "next"
import DashboardSidebar from "@/components/dashboard-sidebar"

export const metadata: Metadata = {
  title: "Admin Dashboard | Banks' Account Management System",
  description: "Admin dashboard for managing bank accounts and users",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

