import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, ArrowUpRight, ArrowDownRight, History, TrendingUp } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

type AccountProps = {
  account: {
    id: string
    accountNumber: string
    accountType: string
    balance: number
    currency: string
    isActive: boolean
  }
}

export default function AccountCard({ account }: AccountProps) {
  const maskedAccountNumber = `****${account.accountNumber.slice(-4)}`

  // Determine card class based on account type
  const getCardClass = () => {
    switch (account.accountType.toLowerCase()) {
      case "savings":
        return "savings-card"
      case "checking":
        return "checking-card"
      case "fixed deposit":
        return "fixed-deposit-card"
      case "money market":
        return "money-market-card"
      default:
        return ""
    }
  }

  return (
    <Card className={`account-card shadow-sm border-none ${getCardClass()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg">{account.accountType} Account</CardTitle>
          <CardDescription>{maskedAccountNumber}</CardDescription>
        </div>
        <div className="rounded-full bg-primary/10 p-2">
          <CreditCard className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(account.balance)}</p>
            {account.accountType === "Savings" && (
              <div className="flex items-center gap-1 text-xs text-[hsl(var(--success))]">
                <TrendingUp className="h-3 w-3" />
                <span>3.5% APY</span> {/* Updated APY for 2025 */}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {account.isActive ? (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
              >
                Active
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
              >
                Inactive
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Link href={`/dashboard/accounts/${account.id}`} className="flex-1">
          <Button variant="outline" className="w-full gap-2 shadow-sm">
            <History className="h-4 w-4" />
            Details
          </Button>
        </Link>
        <div className="flex gap-2 flex-1">
          <Link href={`/dashboard/deposit?accountId=${account.id}`} className="flex-1">
            <Button
              variant="outline"
              size="icon"
              className="w-full shadow-sm hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950 dark:hover:text-green-300"
            >
              <ArrowDownRight className="h-4 w-4" />
              <span className="sr-only">Deposit</span>
            </Button>
          </Link>
          <Link href={`/dashboard/withdraw?accountId=${account.id}`} className="flex-1">
            <Button
              variant="outline"
              size="icon"
              className="w-full shadow-sm hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300"
            >
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">Withdraw</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

