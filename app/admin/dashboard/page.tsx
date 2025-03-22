"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  ArrowLeftRight,
  TrendingUp,
  Clock,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import RecentTransactions from "@/components/recent-transactions"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

type UserSummary = {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
}

type AccountSummary = {
  totalAccounts: number
  activeAccounts: number
  totalBalance: number
}

type TransactionSummary = {
  totalTransactions: number
  totalDeposits: number
  totalWithdrawals: number
  totalTransfers: number
}

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  accountId: string
}

export default function AdminDashboard() {
  const [userSummary, setUserSummary] = useState<UserSummary | null>(null)
  const [accountSummary, setAccountSummary] = useState<AccountSummary | null>(null)
  const [transactionSummary, setTransactionSummary] = useState<TransactionSummary | null>(null)
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [systemHealth, setSystemHealth] = useState(99.8)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        setUserSummary({
          totalUsers: 125,
          activeUsers: 98,
          newUsersThisMonth: 12,
        })

        setAccountSummary({
          totalAccounts: 187,
          activeAccounts: 175,
          totalBalance: 1250680.42,
        })

        setTransactionSummary({
          totalTransactions: 1456,
          totalDeposits: 567,
          totalWithdrawals: 689,
          totalTransfers: 200,
        })

        setRecentTransactions([
          {
            id: "tx1",
            date: "2023-03-21T14:30:00Z",
            description: "Salary Deposit - John Doe",
            amount: 2500.0,
            type: "deposit",
            accountId: "acc1",
          },
          {
            id: "tx2",
            date: "2023-03-20T10:15:00Z",
            description: "Grocery Store - Jane Smith",
            amount: -125.3,
            type: "withdrawal",
            accountId: "acc2",
          },
          {
            id: "tx3",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer - Michael Johnson",
            amount: -500.0,
            type: "transfer",
            accountId: "acc2",
          },
          {
            id: "tx4",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer - Michael Johnson",
            amount: 500.0,
            type: "transfer",
            accountId: "acc1",
          },
          {
            id: "tx5",
            date: "2023-03-15T09:20:00Z",
            description: "Online Purchase - Sarah Williams",
            amount: -89.99,
            type: "withdrawal",
            accountId: "acc2",
          },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in relative">
      {/* Background image with low opacity */}
      <div className="absolute top-0 right-0 w-1/3 h-64 -z-10 opacity-5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Admin dashboard background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of all bank accounts, users, and transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="stat-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userSummary?.totalUsers}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{userSummary?.activeUsers} active users</p>
                <div className="flex items-center text-xs text-[hsl(var(--success))]">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {userSummary?.newUsersThisMonth} new this month
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="stat-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accountSummary?.totalAccounts}</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{accountSummary?.activeAccounts} active accounts</p>
                <p className="text-xs text-muted-foreground">
                  {(((accountSummary?.activeAccounts || 0) / (accountSummary?.totalAccounts || 1)) * 100).toFixed(0)}%
                  active rate
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="stat-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(accountSummary?.totalBalance || 0)}</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactionSummary?.totalTransactions}</div>
              <p className="text-xs text-muted-foreground">All time transactions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deposits</CardTitle>
              <div className="rounded-full bg-[hsl(var(--success))]/10 p-2">
                <ArrowDownRight className="h-4 w-4 text-[hsl(var(--success))]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactionSummary?.totalDeposits}</div>
              <p className="text-xs text-muted-foreground">
                {(
                  ((transactionSummary?.totalDeposits || 0) / (transactionSummary?.totalTransactions || 1)) *
                  100
                ).toFixed(0)}
                % of all transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
              <div className="rounded-full bg-destructive/10 p-2">
                <ArrowUpRight className="h-4 w-4 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactionSummary?.totalWithdrawals}</div>
              <p className="text-xs text-muted-foreground">
                {(
                  ((transactionSummary?.totalWithdrawals || 0) / (transactionSummary?.totalTransactions || 1)) *
                  100
                ).toFixed(0)}
                % of all transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transfers</CardTitle>
              <div className="rounded-full bg-blue-500/10 p-2">
                <ArrowLeftRight className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactionSummary?.totalTransfers}</div>
              <p className="text-xs text-muted-foreground">
                {(
                  ((transactionSummary?.totalTransfers || 0) / (transactionSummary?.totalTransactions || 1)) *
                  100
                ).toFixed(0)}
                % of all transactions
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="stats">System Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <RecentTransactions transactions={recentTransactions} />
        </TabsContent>
        <TabsContent value="stats">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>System Statistics</CardTitle>
                <CardDescription>Overview of system performance and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <p className="text-sm font-medium">Interest Calculations</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Automated</span>
                      </div>
                      <p className="text-2xl font-bold">Last run: Today, 2:00 AM</p>
                      <p className="text-sm text-muted-foreground">Next run: Tomorrow, 2:00 AM</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-[hsl(var(--success))]" />
                          <p className="text-sm font-medium">System Uptime</p>
                        </div>
                        <span className="text-xs bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] px-2 py-1 rounded-full">
                          Healthy
                        </span>
                      </div>
                      <p className="text-2xl font-bold">{systemHealth}%</p>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Last 30 days</p>
                        <Progress value={systemHealth} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">API Requests</p>
                          <span className="text-xs text-[hsl(var(--success))]">+12%</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">24.5k</p>
                        <p className="text-xs text-muted-foreground">Today</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Response Time</p>
                          <span className="text-xs text-[hsl(var(--success))]">-5%</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">120ms</p>
                        <p className="text-xs text-muted-foreground">Average</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Error Rate</p>
                          <span className="text-xs text-[hsl(var(--success))]">-2%</span>
                        </div>
                        <p className="text-2xl font-bold mt-1">0.02%</p>
                        <p className="text-xs text-muted-foreground">Last 24 hours</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

