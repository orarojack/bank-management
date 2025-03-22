"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

type Account = {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  isActive: boolean
}

export default function WithdrawPage() {
  const searchParams = useSearchParams()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if accountId is in URL params
    const accountId = searchParams.get("accountId")
    if (accountId) {
      setSelectedAccount(accountId)
    }

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
          {
            id: "acc3",
            accountNumber: "5678901234",
            accountType: "Fixed Deposit",
            balance: 10000.0,
            currency: "USD",
            isActive: true,
          },
        ])
      } catch (error) {
        console.error("Error fetching accounts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAccount) {
      toast({
        title: "No account selected",
        description: "Please select an account for the withdrawal.",
        variant: "destructive",
      })
      return
    }

    const withdrawalAmount = Number.parseFloat(amount)
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      })
      return
    }

    const account = accounts.find((acc) => acc.id === selectedAccount)
    if (!account || account.balance < withdrawalAmount) {
      toast({
        title: "Insufficient funds",
        description: "Your account does not have sufficient funds for this withdrawal.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Withdrawal successful",
        description: `${formatCurrency(withdrawalAmount)} has been withdrawn successfully.`,
      })

      // Reset form
      setAmount("")
      setDescription("")
    } catch (error) {
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Withdraw Funds</h1>
        <p className="text-muted-foreground">Withdraw money from your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-red-500" />
            New Withdrawal
          </CardTitle>
          <CardDescription>Fill in the details below to make a withdrawal</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account">Select Account</Label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger id="account">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.accountType} (****{account.accountNumber.slice(-4)}) - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-7"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Enter a description for this withdrawal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Withdraw Funds"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

