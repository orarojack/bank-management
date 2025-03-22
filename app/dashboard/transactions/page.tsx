"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Search } from "lucide-react"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  accountId: string
  accountNumber: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

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
            date: "2023-03-21T14:30:00Z",
            description: "Salary Deposit",
            amount: 2500.0,
            type: "deposit" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
          },
          {
            id: "tx2",
            date: "2023-03-20T10:15:00Z",
            description: "Grocery Store",
            amount: -125.3,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
          },
          {
            id: "tx3",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer to Savings",
            amount: -500.0,
            type: "transfer" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
          },
          {
            id: "tx4",
            date: "2023-03-18T16:45:00Z",
            description: "Transfer from Checking",
            amount: 500.0,
            type: "transfer" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
          },
          {
            id: "tx5",
            date: "2023-03-15T09:20:00Z",
            description: "Online Purchase",
            amount: -89.99,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
          },
          {
            id: "tx6",
            date: "2023-03-10T11:30:00Z",
            description: "ATM Withdrawal",
            amount: -200.0,
            type: "withdrawal" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
          },
          {
            id: "tx7",
            date: "2023-03-05T15:45:00Z",
            description: "Interest Payment",
            amount: 12.5,
            type: "deposit" as const,
            accountId: "acc1",
            accountNumber: "1234567890",
          },
          {
            id: "tx8",
            date: "2023-03-01T09:00:00Z",
            description: "Rent Payment",
            amount: -1200.0,
            type: "withdrawal" as const,
            accountId: "acc2",
            accountNumber: "0987654321",
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
    // Filter transactions based on search term and type filter
    let filtered = [...transactions]

    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || tx.accountNumber.includes(searchTerm),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === typeFilter)
    }

    setFilteredTransactions(filtered)
  }, [searchTerm, typeFilter, transactions])

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

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
        <p className="text-muted-foreground">View and search your transaction history across all accounts</p>
      </div>

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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="deposit">Deposits</SelectItem>
            <SelectItem value="withdrawal">Withdrawals</SelectItem>
            <SelectItem value="transfer">Transfers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border">
                    {getTransactionIcon(transaction.type, transaction.amount)}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                      <p className="text-xs text-muted-foreground">
                        Account: ****{transaction.accountNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

