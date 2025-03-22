"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "deposit" | "withdrawal" | "transfer"
  accountId: string
}

type RecentTransactionsProps = {
  transactions: Transaction[]
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getTransactionIcon = (type: string, amount: number) => {
    if (type === "transfer") {
      return <ArrowLeftRight className="h-4 w-4 text-blue-500" />
    } else if (amount > 0) {
      return <ArrowDownRight className="h-4 w-4 text-[hsl(var(--success))]" />
    } else {
      return <ArrowUpRight className="h-4 w-4 text-destructive" />
    }
  }

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Filter transactions based on search term
  const filteredTransactions = sortedTransactions.filter((tx) =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted-foreground py-8"
            >
              {searchTerm ? "No matching transactions found" : "No transactions found"}
            </motion.div>
          ) : (
            <div className="space-y-1">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="transaction-item flex items-center p-3 rounded-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {getTransactionIcon(transaction.type, transaction.amount)}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                  <div
                    className={`font-medium ${transaction.amount > 0 ? "text-[hsl(var(--success))]" : "text-destructive"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {formatCurrency(transaction.amount)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

