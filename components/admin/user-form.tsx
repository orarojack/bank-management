"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { User } from "@/app/admin/user-management/page"

type UserFormProps = {
  user?: User
  onSubmit: (userData: Partial<User>) => void
  onCancel: () => void
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"admin" | "employee" | "customer">(user?.role || "customer")
  const [status, setStatus] = useState<"active" | "inactive" | "locked">(user?.status || "active")
  const [permissions, setPermissions] = useState<string[]>(user?.permissions || ["view_account"])
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

    // If it's a new user, password is required
    if (!user && !password) {
      alert("Password is required for new users")
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
      password: password || undefined, // Only include password if it's set
      role,
      status,
      permissions: rolePermissions,
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
    <Card>
      <CardHeader>
        <CardTitle>{user ? "Edit User" : "Add New User"}</CardTitle>
        <CardDescription>
          {user
            ? "Update user information, role, and permissions"
            : "Create a new user account with specific role and permissions"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {!user && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!user}
                />
              </div>
            )}
            {user && (
              <div className="space-y-2">
                <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            )}
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
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : user ? "Update User" : "Create User"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

