"use client"

import { User } from "lucide-react"

type UserSearchResultsProps = {
  results: Array<{
    id: string
    name: string
    email: string
    accountNumber?: string
  }>
  isSearching: boolean
  searchTerm: string
  onSelect: (user: any) => void
}

export default function UserSearchResults({ results, isSearching, searchTerm, onSelect }: UserSearchResultsProps) {
  if (isSearching) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
      </div>
    )
  }

  if (searchTerm.length < 3) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">No users found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Search Results</p>
      <div className="border rounded-lg divide-y">
        {results.map((user) => (
          <div
            key={user.id}
            className="p-3 hover:bg-muted transition-colors cursor-pointer"
            onClick={() => onSelect(user)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                {user.accountNumber && (
                  <p className="text-xs text-muted-foreground">Account: ****{user.accountNumber.slice(-4)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

