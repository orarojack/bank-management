"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, UserCog, Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import type { User as UserType } from "@/app/admin/user-management/page"

type UserDetailViewProps = {
  user: UserType
  onEdit: () => void
  onClose: () => void
}

export default function UserDetailView({ user, onEdit, onClose }: UserDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-5 w-5 text-primary" />
      case "employee":
        return <UserCog className="h-5 w-5 text-blue-500" />
      default:
        return <User className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              {getRoleIcon(user.role)}
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className={
              user.status === "active"
                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                : user.status === "locked"
                  ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
            }
          >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium flex items-center gap-2">
                  {getRoleIcon(user.role)}
                  <span className="capitalize">{user.role}</span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{user.status}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {formatDate(user.lastLogin)}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "view_account",
                "transfer_funds",
                "deposit",
                "withdraw",
                "manage_customers",
                "manage_employees",
                "manage_system",
              ].map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  {user.permissions.includes(permission) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="capitalize">{permission.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>Activity log will be available in the full version.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={onEdit}>Edit User</Button>
      </CardFooter>
    </Card>
  )
}

