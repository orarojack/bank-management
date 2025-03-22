"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { useAuth } from "./auth-provider"
import { ModeToggle } from "./mode-toggle"
import { useState, useEffect } from "react"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className={cn("flex w-full items-center justify-between transition-all duration-200", isScrolled && "py-2")}>
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">Banking System</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 md:flex">
          <Link
            href="/"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/")
                ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/features")
                ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            Features
          </Link>
          <Link
            href="/about"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/about")
                ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']"
                : "text-muted-foreground",
            )}
          >
            About
          </Link>
        </nav>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <ModeToggle />

        {user ? (
          <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
            <Button variant="default" className="shadow-sm">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button className="shadow-sm">Register</Button>
            </Link>
          </>
        )}

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(isMobileMenuOpen ? "hidden" : "block")}
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(!isMobileMenuOpen ? "hidden" : "block")}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b z-50 md:hidden animate-in">
          <nav className="flex flex-col p-4">
            <Link
              href="/"
              className={cn(
                "py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={cn(
                "py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/features") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/about"
              className={cn(
                "py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive("/about") ? "text-primary" : "text-muted-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            {!user && (
              <Link
                href="/login"
                className={cn(
                  "py-2 text-sm font-medium transition-colors hover:text-primary",
                  isActive("/login") ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  )
}

