import type React from "react"
import type { Metadata } from "next"
import DashboardSidebar from "@/components/dashboard-sidebar"

export const metadata: Metadata = {
  title: "Dashboard | Banks' Account Management System",
  description: "Manage your bank accounts and transactions",
}

export default function DashboardLayout({
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

