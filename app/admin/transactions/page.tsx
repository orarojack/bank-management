"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import {
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Search,
  Download,
  Filter,
  Calendar,
  User,
  CreditCard,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  accountId: string
  accountNumber: string
  userId: string
  userName: string
  status: "completed" | "pending" | "failed"
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchTransactions = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockTransactions = [
          {
            id: "tx1",
            date: "2025-03-21T14:30:00Z",
            description: "Salary Deposit",
            amount: 3200.0,
            type: "deposit" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
            userId: "user1",
            userName: "John Doe",
            status: "completed" as const,
          },
          {
            id: "tx2",
            date: "2025-03-20T10:15:00Z",
            description: "Grocery Store",
            amount: -175.3,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
            userId: "user2",
            userName: "Jane Smith",
            status: "completed" as const,
          },
          {
            id: "tx3",
            date: "2025-03-18T16:45:00Z",
            description: "Transfer to Savings",
            amount: -800.0,
            type: "transfer" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
            userId: "user3",
            userName: "Michael Johnson",
            status: "completed" as const,
          },
          {
            id: "tx4",
            date: "2025-03-18T16:45:00Z",
            description: "Transfer from Checking",
            amount: 800.0,
            type: "transfer" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
            userId: "user3",
            userName: "Michael Johnson",
            status: "completed" as const,
          },
          {
            id: "tx5",
            date: "2025-03-15T09:20:00Z",
            description: "Online Purchase",
            amount: -129.99,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
            userId: "user4",
            userName: "Sarah Williams",
            status: "completed" as const,
          },
          {
            id: "tx6",
            date: "2025-03-10T11:30:00Z",
            description: "ATM Withdrawal",
            amount: -300.0,
            type: "withdrawal" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
            userId: "user1",
            userName: "John Doe",
            status: "completed" as const,
          },
          {
            id: "tx7",
            date: "2025-03-05T15:45:00Z",
            description: "Interest Payment",
            amount: 18.5,
            type: "deposit" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
            userId: "user1",
            userName: "John Doe",
            status: "completed" as const,
          },
          {
            id: "tx8",
            date: "2025-03-01T09:00:00Z",
            description: "Rent Payment",
            amount: -1500.0,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
            userId: "user2",
            userName: "Jane Smith",
            status: "completed" as const,
          },
          {
            id: "tx9",
            date: "2025-02-28T13:20:00Z",
            description: "Digital Subscription",
            amount: -15.99,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
            userId: "user2",
            userName: "Jane Smith",
            status: "completed" as const,
          },
          {
            id: "tx10",
            date: "2025-02-25T09:45:00Z",
            description: "Dividend Payment",
            amount: 75.25,
            type: "deposit" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
            userId: "user1",
            userName: "John Doe",
            status: "completed" as const,
          },
          {
            id: "tx11",
            date: "2025-03-22T08:30:00Z",
            description: "International Transfer",
            amount: -500.0,
            type: "transfer" as const,
            accountId: "acc3",
            accountNumber: "5678901234",
            userId: "user5",
            userName: "Alex Rodriguez",
            status: "pending" as const,
          },
          {
            id: "tx12",
            date: "2025-03-21T16:15:00Z",
            description: "Failed Payment Attempt",
            amount: -250.0,
            type: "withdrawal" as const,
            accountId: "acc4",
            accountNumber: "4321098765",
            userId: "user4",
            userName: "Sarah Williams",
            status: "failed" as const,
          },
        ]

        setTransactions(mockTransactions)
        setFilteredTransactions(mockTransactions)
      } catch (error) {
        console.error("Error fetching transactions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  useEffect(() => {
    // Filter transactions based on search term, type filter, status filter, and date range
    let filtered = [...transactions]

    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.accountNumber.includes(searchTerm) ||
          tx.userName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === typeFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((tx) => tx.status === statusFilter)
    }

    if (dateRange?.from) {
      const fromDate = new Date(dateRange.from)
      fromDate.setHours(0, 0, 0, 0)

      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate >= fromDate
      })
    }

    if (dateRange?.to) {
      const toDate = new Date(dateRange.to)
      toDate.setHours(23, 59, 59, 999)

      filtered = filtered.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate <= toDate
      })
    }

    setFilteredTransactions(filtered)
  }, [searchTerm, typeFilter, statusFilter, dateRange, transactions])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getTransactionIcon = (type: string, amount: number) => {
    if (type === "transfer") {
      return <ArrowLeftRight className="h-5 w-5 text-blue-500" />
    } else if (amount > 0) {
      return <ArrowDownRight className="h-5 w-5 text-green-500" />
    } else {
      return <ArrowUpRight className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
          >
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
          >
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
          >
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const exportTransactions = () => {
    // In a real app, this would generate a CSV file
    alert("Exporting transactions to CSV...")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Transactions</h1>
          <p className="text-muted-foreground">View and manage all transactions across the system</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={exportTransactions}>
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposits</SelectItem>
                  <SelectItem value="withdrawal">Withdrawals</SelectItem>
                  <SelectItem value="transfer">Transfers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(transaction.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{transaction.userName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span>****{transaction.accountNumber.slice(-4)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTransactionIcon(transaction.type, transaction.amount)}
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

