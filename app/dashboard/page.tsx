"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ArrowUpRight, ArrowDownRight, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import AccountCard from "@/components/account-card"
import RecentTransactions from "@/components/recent-transactions"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

type Account = {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  isActive: boolean
}

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  accountId: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [savingsGoal, setSavingsGoal] = useState(10000)
  const [savingsProgress, setSavingsProgress] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockAccounts = [
          {
            id: "acc1",
            accountNumber: "1234567890",
            accountType: "Savings",
            balance: 5280.42,
            currency: "USD",
            isActive: true,
          },
          {
            id: "acc2",
            accountNumber: "0987654321",
            accountType: "Checking",
            balance: 1250.0,
            currency: "USD",
            isActive: true,
          },
        ]

        setAccounts(mockAccounts)

        const mockTransactions = [
          {
            id: "tx1",
            date: "2023-03-21T14:30:00Z",
            description: "Salary Deposit",
            amount: 2500.0,
            type: "deposit" as const,
            accountId: "acc1",
          },
          {
            id: "tx2",
            date: "2023-03-20T10:15:00Z",
            description: "Grocery Store",
            amount: -125.3,
            type: "withdrawal" as const,
            accountId: "acc2",
          },
          {
            id: "tx3",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer to Savings",
            amount: -500.0,
            type: "transfer" as const,
            accountId: "acc2",
          },
          {
            id: "tx4",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer from Checking",
            amount: 500.0,
            type: "transfer" as const,
            accountId: "acc1",
          },
          {
            id: "tx5",
            date: "2023-03-15T09:20:00Z",
            description: "Online Purchase",
            amount: -89.99,
            type: "withdrawal" as const,
            accountId: "acc2",
          },
        ]

        setTransactions(mockTransactions)

        // Calculate savings progress
        const savingsAccount = mockAccounts.find((acc) => acc.accountType === "Savings")
        if (savingsAccount) {
          setSavingsProgress((savingsAccount.balance / savingsGoal) * 100)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  // Calculate income (deposits) and expenses (withdrawals) for the current month
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date)
    return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
  })

  const monthlyIncome = monthlyTransactions.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0)

  const monthlyExpenses = monthlyTransactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="page-header">
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Here's an overview of your finances</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/transfer">
            <Button variant="outline" className="gap-2 shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
              Transfer
            </Button>
          </Link>
          <Link href="/dashboard/accounts/new">
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              New Account
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="stat-card info shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
              <p className="text-xs text-muted-foreground">
                Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="stat-card success shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-[hsl(var(--success))]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(monthlyIncome)}</div>
              <p className="text-xs text-muted-foreground">This month's deposits and credits</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="stat-card danger shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(monthlyExpenses)}</div>
              <p className="text-xs text-muted-foreground">This month's withdrawals and debits</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
              alt="Savings goal"
              className="h-full w-full object-cover opacity-10"
            />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Savings Goal
            </CardTitle>
            <CardDescription>Track your progress towards your savings goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  Current: {formatCurrency(accounts.find((acc) => acc.accountType === "Savings")?.balance || 0)}
                </span>
                <span className="text-sm font-medium">Goal: {formatCurrency(savingsGoal)}</span>
              </div>
              <Progress value={savingsProgress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                {savingsProgress.toFixed(0)}% of your savings goal
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">My Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <AccountCard account={account} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <RecentTransactions transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

