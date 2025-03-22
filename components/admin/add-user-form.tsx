"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { User } from "@/app/admin/user-management/page"

type AddUserFormProps = {
  onSubmit: (user: Omit<User, "id" | "createdAt" | "lastLogin">) => void
  onCancel: () => void
}

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "employee" | "customer">("customer")
  const [status, setStatus] = useState<"active" | "inactive" | "locked">("active")
  const [permissions, setPermissions] = useState<string[]>(["view_account"])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!name || !email || !password) {
      alert("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Set default permissions based on role
    let rolePermissions = [...permissions]
    if (role === "customer") {
      rolePermissions = ["view_account", "transfer_funds", "deposit", "withdraw"]
    } else if (role === "employee") {
      rolePermissions = ["view_account", "transfer_funds", "deposit", "withdraw", "manage_customers"]
    } else if (role === "admin") {
      rolePermissions = [
        "view_account",
        "transfer_funds",
        "deposit",
        "withdraw",
        "manage_customers",
        "manage_employees",
        "manage_system",
      ]
    }

    // Submit the form
    onSubmit({
      name,
      email,
      role,
      status,
      permissions: rolePermissions,
    })

    // Reset form
    setName("")
    setEmail("")
    setPassword("")
    setRole("customer")
    setStatus("active")
    setPermissions(["view_account"])
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
              id="view_account"
              checked={permissions.includes("view_account")}
              onCheckedChange={() => togglePermission("view_account")}
            />
            <Label htmlFor="view_account" className="cursor-pointer">
              View Account
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="transfer_funds"
              checked={permissions.includes("transfer_funds")}
              onCheckedChange={() => togglePermission("transfer_funds")}
            />
            <Label htmlFor="transfer_funds" className="cursor-pointer">
              Transfer Funds
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="deposit"
              checked={permissions.includes("deposit")}
              onCheckedChange={() => togglePermission("deposit")}
            />
            <Label htmlFor="deposit" className="cursor-pointer">
              Deposit
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="withdraw"
              checked={permissions.includes("withdraw")}
              onCheckedChange={() => togglePermission("withdraw")}
            />
            <Label htmlFor="withdraw" className="cursor-pointer">
              Withdraw
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_customers"
              checked={permissions.includes("manage_customers")}
              onCheckedChange={() => togglePermission("manage_customers")}
            />
            <Label htmlFor="manage_customers" className="cursor-pointer">
              Manage Customers
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_employees"
              checked={permissions.includes("manage_employees")}
              onCheckedChange={() => togglePermission("manage_employees")}
            />
            <Label htmlFor="manage_employees" className="cursor-pointer">
              Manage Employees
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="manage_system"
              checked={permissions.includes("manage_system")}
              onCheckedChange={() => togglePermission("manage_system")}
            />
            <Label htmlFor="manage_system" className="cursor-pointer">
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
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  )
}

