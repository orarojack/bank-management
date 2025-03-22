"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeftRight, Loader2, CheckCircle, Search } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"
import UserSearchResults from "@/components/user-transfer/user-search-results"
import TransferConfirmation from "@/components/user-transfer/transfer-confirmation"

type User = {
  id: string
  name: string
  email: string
  accountNumber?: string
}

export default function UserTransferPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState<"search" | "amount" | "confirm" | "success">("search")
  const { toast } = useToast()

  // Mock user search
  useEffect(() => {
    if (searchTerm.length < 3) {
      setSearchResults([])
      return
    }

    const searchUsers = async () => {
      setIsSearching(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Mock data
        const mockUsers = [
          {
            id: "user1",
            name: "John Doe",
            email: "john.doe@example.com",
            accountNumber: "1234567890",
          },
          {
            id: "user2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            accountNumber: "0987654321",
          },
          {
            id: "user3",
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            accountNumber: "5678901234",
          },
          {
            id: "user4",
            name: "Sarah Williams",
            email: "sarah.williams@example.com",
            accountNumber: "4321098765",
          },
          {
            id: "user5",
            name: "Alex Rodriguez",
            email: "alex.rodriguez@example.com",
            accountNumber: "6543210987",
          },
        ]

        // Filter users based on search term
        const filtered = mockUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.accountNumber?.includes(searchTerm),
        )

        setSearchResults(filtered)
      } catch (error) {
        console.error("Error searching users:", error)
        toast({
          title: "Error",
          description: "Failed to search users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSearching(false)
      }
    }

    searchUsers()
  }, [searchTerm, toast])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setCurrentStep("amount")
  }

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const transferAmount = Number.parseFloat(amount)
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would check if the user has sufficient funds here

    setCurrentStep("confirm")
  }

  const handleTransferSubmit = async () => {
    if (!selectedUser) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would be an API call to process the transfer

      setIsSuccess(true)
      setCurrentStep("success")

      toast({
        title: "Transfer successful",
        description: `${formatCurrency(Number.parseFloat(amount))} has been transferred to ${selectedUser.name}.`,
      })
    } catch (error) {
      console.error("Error processing transfer:", error)
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
    setSearchTerm("")
    setSearchResults([])
    setSelectedUser(null)
    setAmount("")
    setDescription("")
    setIsSuccess(false)
    setCurrentStep("search")
  }

  const goBack = () => {
    if (currentStep === "amount") {
      setCurrentStep("search")
    } else if (currentStep === "confirm") {
      setCurrentStep("amount")
    }
  }

  return (
    <div className="space-y-6 animate-in relative">
      <div className="absolute top-0 right-0 w-1/3 h-64 -z-10 opacity-5 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="Transfer funds background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Transfer to Another User</h1>
        <p className="text-muted-foreground">Send money to other users in the system</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <ArrowLeftRight className="h-5 w-5 text-primary" />
              </div>
              User Transfer
            </CardTitle>
            <CardDescription>Transfer funds to another user in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === "search" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search for a user</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name, email, or account number"
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Enter at least 3 characters to search</p>
                </div>

                <UserSearchResults
                  results={searchResults}
                  isSearching={isSearching}
                  searchTerm={searchTerm}
                  onSelect={handleUserSelect}
                />
              </div>
            )}

            {currentStep === "amount" && selectedUser && (
              <form onSubmit={handleAmountSubmit} className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">Recipient</p>
                  <div className="flex flex-col">
                    <span className="text-sm">{selectedUser.name}</span>
                    <span className="text-xs text-muted-foreground">{selectedUser.email}</span>
                    {selectedUser.accountNumber && (
                      <span className="text-xs text-muted-foreground">
                        Account: ****{selectedUser.accountNumber.slice(-4)}
                      </span>
                    )}
                  </div>
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
              </form>
            )}

            {currentStep === "confirm" && selectedUser && (
              <TransferConfirmation
                recipient={selectedUser}
                amount={Number.parseFloat(amount)}
                description={description}
              />
            )}

            {currentStep === "success" && selectedUser && (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto rounded-full bg-[hsl(var(--success))]/10 p-3 w-16 h-16 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-[hsl(var(--success))]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Transfer Successful!</h3>
                  <p className="text-muted-foreground mt-1">
                    You have successfully transferred {formatCurrency(Number.parseFloat(amount))} to {selectedUser.name}
                    .
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    A confirmation has been sent to both you and the recipient.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            {currentStep === "search" && (
              <Button type="button" variant="outline" className="w-full" onClick={() => window.history.back()}>
                Cancel
              </Button>
            )}

            {(currentStep === "amount" || currentStep === "confirm") && (
              <>
                <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={goBack}>
                  Back
                </Button>
                {currentStep === "amount" && (
                  <Button
                    type="button"
                    className="w-full sm:flex-1"
                    onClick={handleAmountSubmit}
                    disabled={!amount || isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0}
                  >
                    Continue
                  </Button>
                )}
                {currentStep === "confirm" && (
                  <Button
                    type="button"
                    className="w-full sm:flex-1"
                    onClick={handleTransferSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Transfer"
                    )}
                  </Button>
                )}
              </>
            )}

            {currentStep === "success" && (
              <Button type="button" className="w-full" onClick={resetForm}>
                Make Another Transfer
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

