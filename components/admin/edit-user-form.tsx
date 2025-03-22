"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { User } from "@/app/admin/user-management/page"

type EditUserFormProps = {
  user: User
  onSubmit: (user: User) => void
  onCancel: () => void
}

export default function EditUserForm({ user, onSubmit, onCancel }: EditUserFormProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<"admin" | "employee" | "customer">(user.role)
  const [status, setStatus] = useState<"active" | "inactive" | "locked">(user.status)
  const [permissions, setPermissions] = useState<string[]>(user.permissions)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!name || !email) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Submit the form
    onSubmit({
      ...user,
      name,
      email,
      role,
      status,
      permissions,
    })

    setIsSubmitting(false)
  }

  const handleRoleChange = (value: string) => {
    const newRole = value as "admin" | "employee" | "customer"
    setRole(newRole)

    // Update permissions based on role
    if (newRole === "customer") {
      setPermissions(["view_account", "transfer_funds", "deposit", "withdraw"])
    } else if (newRole === "employee") {
      setPermissions(["view_account", "transfer_funds", "deposit", "withdraw", "manage_customers"])
    } else if (newRole === "admin") {
      setPermissions([
        "view_account",
        "transfer_funds",
        "deposit",
        "withdraw",
        "manage_customers",
        "manage_employees",
        "manage_system",
      ])
    }
  }

  const togglePermission = (permission: string) => {
    setPermissions((prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={(value) => setStatus(value as any)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Permissions</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 border rounded-md p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="view_account_edit"
              checked={permissions.includes("view_account")}
              onCheckedChange={() => togglePermission("view_account")}
            />
            <Label htmlFor="view_account_edit" className="cursor-pointer">
              View Account
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="transfer_funds_edit"
              checked={permissions.includes("transfer_funds")}
              onCheckedChange={() => togglePermission("transfer_funds")}
            />
            <Label htmlFor="transfer_funds_edit" className="cursor-pointer">
              Transfer Funds
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="deposit_edit"
              checked={permissions.includes("deposit")}
              onCheckedChange={() => togglePermission("deposit")}
            />
            <Label htmlFor="deposit_edit" className="cursor-pointer">
              Deposit
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withdraw_edit"
              checked={permissions.includes("withdraw")}
              onCheckedChange={() => togglePermission("withdraw")}
            />
            <Label htmlFor="withdraw_edit" className="cursor-pointer">
              Withdraw
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_customers_edit"
              checked={permissions.includes("manage_customers")}
              onCheckedChange={() => togglePermission("manage_customers")}
            />
            <Label htmlFor="manage_customers_edit" className="cursor-pointer">
              Manage Customers
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_employees_edit"
              checked={permissions.includes("manage_employees")}
              onCheckedChange={() => togglePermission("manage_employees")}
            />
            <Label htmlFor="manage_employees_edit" className="cursor-pointer">
              Manage Employees
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_system_edit"
              checked={permissions.includes("manage_system")}
              onCheckedChange={() => togglePermission("manage_system")}
            />
            <Label htmlFor="manage_system_edit" className="cursor-pointer">
              Manage System
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update User"}
        </Button>
      </div>
    </form>
  )
}

