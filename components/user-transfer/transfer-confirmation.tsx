"use client"

import { formatCurrency } from "@/lib/utils"
import { ArrowLeftRight, User } from "lucide-react"

type TransferConfirmationProps = {
  recipient: {
    id: string
    name: string
    email: string
    accountNumber?: string
  }
  amount: number
  description: string
}

export default function TransferConfirmation({ recipient, amount, description }: TransferConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Confirm Transfer</h3>
        <p className="text-sm text-muted-foreground">Please review the transfer details before confirming</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-medium">{recipient.name}</p>
          <p className="text-sm text-muted-foreground">{recipient.email}</p>
          {recipient.accountNumber && (
            <p className="text-xs text-muted-foreground">Account: ****{recipient.accountNumber.slice(-4)}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-border"></div>
        <div className="rounded-full bg-primary/10 p-2">
          <ArrowLeftRight className="h-5 w-5 text-primary" />
        </div>
        <div className="h-px flex-1 bg-border"></div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">Amount</span>
          <span className="font-medium">{formatCurrency(amount)}</span>
        </div>
        {description && (
          <div className="flex justify-between items-start">
            <span className="text-sm">Description</span>
            <span className="text-sm text-right max-w-[60%]">{description}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm">Fee</span>
          <span className="text-sm">$0.00</span>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="font-bold text-lg">{formatCurrency(amount)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-3 text-sm">
        <p className="font-medium">Important</p>
        <p className="text-muted-foreground text-xs mt-1">
          By confirming this transfer, you agree that the recipient information is correct and that the funds will be
          transferred immediately. This action cannot be undone.
        </p>
      </div>
    </div>
  )
}

