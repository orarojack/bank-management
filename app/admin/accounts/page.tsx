"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Edit, Trash, Ban, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"

type Account = {
  id: string
  accountNumber: string
  accountType: string
  balance: number
  currency: string
  isActive: boolean
  ownerName: string
  ownerEmail: string
  createdAt: string
}

export default function AdminAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchAccounts = async () => {
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
            ownerName: "John Doe",
            ownerEmail: "john.doe@example.com",
            createdAt: "2023-01-15T10:30:00Z",
          },
          {
            id: "acc2",
            accountNumber: "0987654321",
            accountType: "Checking",
            balance: 1250.0,
            currency: "USD",
            isActive: true,
            ownerName: "Jane Smith",
            ownerEmail: "jane.smith@example.com",
            createdAt: "2023-01-20T14:20:00Z",
          },
          {
            id: "acc3",
            accountNumber: "5678901234",
            accountType: "Fixed Deposit",
            balance: 10000.0,
            currency: "USD",
            isActive: true,
            ownerName: "Michael Johnson",
            ownerEmail: "michael.johnson@example.com",
            createdAt: "2023-02-05T09:15:00Z",
          },
          {
            id: "acc4",
            accountNumber: "4321098765",
            accountType: "Savings",
            balance: 7500.5,
            currency: "USD",
            isActive: false,
            ownerName: "Sarah Williams",
            ownerEmail: "sarah.williams@example.com",
            createdAt: "2023-02-10T16:45:00Z",
          },
          {
            id: "acc5",
            accountNumber: "9876543210",
            accountType: "Checking",
            balance: 3200.75,
            currency: "USD",
            isActive: true,
            ownerName: "David Brown",
            ownerEmail: "david.brown@example.com",
            createdAt: "2023-02-15T11:30:00Z",
          },
        ]

        setAccounts(mockAccounts)
        setFilteredAccounts(mockAccounts)
      } catch (error) {
        console.error("Error fetching accounts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  useEffect(() => {
    // Filter accounts based on search term
    if (searchTerm) {
      const filtered = accounts.filter(
        (account) =>
          account.accountNumber.includes(searchTerm) ||
          account.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredAccounts(filtered)
    } else {
      setFilteredAccounts(accounts)
    }
  }, [searchTerm, accounts])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handleToggleAccountStatus = (accountId: string) => {
    // In a real app, this would be an API call
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) => (account.id === accountId ? { ...account, isActive: !account.isActive } : account)),
    )

    const account = accounts.find((a) => a.id === accountId)
    const newStatus = account?.isActive ? "deactivated" : "activated"

    toast({
      title: `Account ${newStatus}`,
      description: `Account ${account?.accountNumber} has been ${newStatus} successfully.`,
    })
  }

  const handleDeleteAccount = (accountId: string) => {
    // In a real app, this would be an API call
    const account = accounts.find((a) => a.id === accountId)

    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== accountId))

    toast({
      title: "Account deleted",
      description: `Account ${account?.accountNumber} has been deleted successfully.`,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
          <p className="text-muted-foreground">Manage all customer bank accounts</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Account
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by account number, name, or email..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No accounts found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.accountNumber}</TableCell>
                    <TableCell>{account.accountType}</TableCell>
                    <TableCell>
                      <div>
                        <p>{account.ownerName}</p>
                        <p className="text-xs text-muted-foreground">{account.ownerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(account.balance)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          account.isActive
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                        }
                      >
                        {account.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(account.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleAccountStatus(account.id)}>
                            {account.isActive ? (
                              <>
                                <Ban className="h-4 w-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDeleteAccount(account.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

