"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, Loader2, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"

type Account = {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  isActive: boolean
}

export default function TransferPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fromAccount || !toAccount) {
      toast({
        title: "Missing accounts",
        description: "Please select both source and destination accounts.",
        variant: "destructive",
      })
      return
    }

    if (fromAccount === toAccount) {
      toast({
        title: "Invalid accounts",
        description: "Source and destination accounts cannot be the same.",
        variant: "destructive",
      })
      return
    }

    const transferAmount = Number.parseFloat(amount)
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      })
      return
    }

    const sourceAccount = accounts.find((acc) => acc.id === fromAccount)
    if (!sourceAccount || sourceAccount.balance < transferAmount) {
      toast({
        title: "Insufficient funds",
        description: "Your account does not have sufficient funds for this transfer.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)

      toast({
        title: "Transfer successful",
        description: `${formatCurrency(transferAmount)} has been transferred successfully.`,
      })

      // Reset form after a delay to show success state
      setTimeout(() => {
        setAmount("")
        setDescription("")
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: "There was an error processing your transfer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFromAccount("")
    setToAccount("")
    setAmount("")
    setDescription("")
    setIsSuccess(false)
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
    <div className="space-y-6 animate-in relative">
      {/* Background image */}
      <div className="absolute top-0 right-0 w-1/3 h-64 -z-10 opacity-5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Transfer funds background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Transfer Funds</h1>
        <p className="text-muted-foreground">Transfer money between your accounts or to other accounts</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="shadow-sm max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </div>
              New Transfer
            </CardTitle>
            <CardDescription>Fill in the details below to make a transfer</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {isSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto rounded-full bg-[hsl(var(--success))]/10 p-3 w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-[hsl(var(--success))]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Transfer Successful!</h3>
                    <p className="text-muted-foreground mt-1">
                      Your transfer of {formatCurrency(Number.parseFloat(amount))} has been processed.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">From Account</Label>
                    <Select value={fromAccount} onValueChange={setFromAccount}>
                      <SelectTrigger id="fromAccount" className="h-12">
                        <SelectValue placeholder="Select source account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            <div className="flex flex-col">
                              <span>
                                {account.accountType} (****{account.accountNumber.slice(-4)})
                              </span>
                              <span className="text-xs text-muted-foreground">{formatCurrency(account.balance)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toAccount">To Account</Label>
                    <Select value={toAccount} onValueChange={setToAccount}>
                      <SelectTrigger id="toAccount" className="h-12">
                        <SelectValue placeholder="Select destination account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            <div className="flex flex-col">
                              <span>
                                {account.accountType} (****{account.accountNumber.slice(-4)})
                              </span>
                              <span className="text-xs text-muted-foreground">{formatCurrency(account.balance)}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-7 h-12 text-lg"
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
                    <Textarea
                      id="description"
                      placeholder="Enter a description for this transfer"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              {isSuccess ? (
                <Button type="button" className="w-full" onClick={resetForm}>
                  New Transfer
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={resetForm}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Transfer Funds"
                    )}
                  </Button>
                </>
              )}
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

