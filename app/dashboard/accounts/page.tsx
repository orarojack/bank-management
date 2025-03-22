"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import AccountCard from "@/components/account-card"

type Account = {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  isActive: boolean
  createdAt: string
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchAccounts = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setAccounts([
          {
            id: "acc1",
            accountNumber: "1234567890",
            accountType: "Savings",
            balance: 7580.42, // Updated balance for 2025
            currency: "USD",
            isActive: true,
            createdAt: "2024-11-15T10:30:00Z", // Account created in 2024
          },
          {
            id: "acc2",
            accountNumber: "0987654321",
            accountType: "Checking",
            balance: 3250.0, // Updated balance for 2025
            currency: "USD",
            isActive: true,
            createdAt: "2024-12-05T14:20:00Z", // Account created in 2024
          },
          {
            id: "acc3",
            accountNumber: "5678901234",
            accountType: "Fixed Deposit",
            balance: 15000.0, // Updated balance for 2025
            currency: "USD",
            isActive: true,
            createdAt: "2025-01-10T09:15:00Z", // Account created in 2025
          },
        ])
      } catch (error) {
        console.error("Error fetching accounts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Accounts</h1>
          <p className="text-muted-foreground">Manage your bank accounts and view balances</p>
        </div>
        <Link href="/dashboard/accounts/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Account
          </Button>
        </Link>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Accounts Found</CardTitle>
            <CardDescription>
              You don't have any bank accounts yet. Create your first account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/accounts/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  )
}

