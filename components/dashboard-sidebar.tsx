"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Home,
  CreditCard,
  History,
  ArrowLeftRight,
  LogOut,
  Menu,
  X,
  Users,
  UserCog,
  Settings,
  BarChart3,
  Calculator,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export default function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isAdmin = user?.role === "admin"

  const userNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/accounts", label: "My Accounts", icon: CreditCard },
    { href: "/dashboard/transactions", label: "Transaction History", icon: History },
    { href: "/dashboard/transfer", label: "Transfer Funds", icon: ArrowLeftRight },
    { href: "/dashboard/user-transfer", label: "User Transfer", icon: Users },
    { href: "/dashboard/deposit", label: "Deposit", icon: ArrowDownCircle },
    { href: "/dashboard/withdraw", label: "Withdraw", icon: ArrowUpCircle },
    { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
  ]

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Admin Dashboard", icon: Home },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/user-management", label: "User Management", icon: UserCog },
    { href: "/admin/accounts", label: "All Accounts", icon: CreditCard },
    { href: "/admin/transactions", label: "All Transactions", icon: History },
    { href: "/admin/interest", label: "Interest Rates", icon: Calculator },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin/settings", label: "System Settings", icon: Settings },
  ]

  const navItems = isAdmin ? adminNavItems : userNavItems

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleSidebar} className="shadow-sm">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "5rem" : "18rem",
          transition: { duration: 0.2 },
        }}
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 border-r bg-card transition-all md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-4">
            <Link href={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex items-center gap-2 font-bold">
              <Shield className="h-6 w-6 text-primary" />
              {!isCollapsed && <span>Banking System</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 hidden md:flex"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              <span className="sr-only">{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid gap-1 px-2">
              <TooltipProvider delayDuration={0}>
                {navItems.map((item) => (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                          pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                          isCollapsed && "justify-center px-0",
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                ))}
              </TooltipProvider>
            </nav>
          </div>
          <div className="border-t p-4">
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                      alt={user?.name || ""}
                    />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-2 w-full justify-start gap-2" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="w-full h-10" onClick={logout}>
                      <LogOut className="h-5 w-5" />
                      <span className="sr-only">Logout</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Logout</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}

