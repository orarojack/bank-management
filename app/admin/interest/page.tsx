"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calculator, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { calculateInterest } from "@/lib/utils"

type InterestRate = {
  id: string
  accountType: string
  rate: number
  compoundingFrequency: string
  lastUpdated: string
}

export default function InterestRatesPage() {
  const [interestRates, setInterestRates] = useState<InterestRate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Example calculation values
  const [principal, setPrincipal] = useState("1000")
  const [rate, setRate] = useState("2.5")
  const [time, setTime] = useState("1")
  const [calculatedInterest, setCalculatedInterest] = useState<number | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchInterestRates = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockRates = [
          {
            id: "rate1",
            accountType: "Savings",
            rate: 2.5,
            compoundingFrequency: "Daily",
            lastUpdated: "2023-03-01T10:00:00Z",
          },
          {
            id: "rate2",
            accountType: "Checking",
            rate: 0.5,
            compoundingFrequency: "Monthly",
            lastUpdated: "2023-03-01T10:00:00Z",
          },
          {
            id: "rate3",
            accountType: "Fixed Deposit",
            rate: 5.0,
            compoundingFrequency: "Annually",
            lastUpdated: "2023-03-01T10:00:00Z",
          },
          {
            id: "rate4",
            accountType: "Money Market",
            rate: 3.2,
            compoundingFrequency: "Daily",
            lastUpdated: "2023-03-01T10:00:00Z",
          },
        ]

        setInterestRates(mockRates)
      } catch (error) {
        console.error("Error fetching interest rates:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterestRates()
  }, [])

  const handleRateChange = (id: string, newRate: number) => {
    setInterestRates((prevRates) =>
      prevRates.map((rate) =>
        rate.id === id ? { ...rate, rate: newRate, lastUpdated: new Date().toISOString() } : rate,
      ),
    )
  }

  const handleSaveRates = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Interest rates updated",
        description: "The interest rates have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the interest rates. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCalculateInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate)
    const t = Number.parseFloat(time)

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      toast({
        title: "Invalid input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive",
      })
      return
    }

    const interest = calculateInterest(p, r, t)
    setCalculatedInterest(interest)
  }

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading interest rates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interest Rate Management</h1>
        <p className="text-muted-foreground">Configure and manage interest rates for different account types</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interest Rates</CardTitle>
            <CardDescription>Adjust interest rates for different account types</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Rate (%)</TableHead>
                  <TableHead>Compounding</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interestRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.accountType}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={rate.rate}
                        onChange={(e) => handleRateChange(rate.id, Number.parseFloat(e.target.value))}
                        min="0"
                        step="0.1"
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell>{rate.compoundingFrequency}</TableCell>
                    <TableCell>{formatDate(rate.lastUpdated)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button className="gap-2 ml-auto" onClick={handleSaveRates} disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interest Calculator</CardTitle>
            <CardDescription>Calculate interest based on principal, rate, and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                min="0"
                step="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (years)</Label>
              <Input
                id="time"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min="0"
                step="0.5"
              />
            </div>
            <Button className="w-full gap-2" onClick={handleCalculateInterest}>
              <Calculator className="h-4 w-4" />
              Calculate Interest
            </Button>
            {calculatedInterest !== null && (
              <div className="mt-4 p-4 bg-primary/10 rounded-md">
                <p className="font-medium">Interest Amount:</p>
                <p className="text-2xl font-bold">${calculatedInterest.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total Amount: ${(Number.parseFloat(principal) + calculatedInterest).toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

