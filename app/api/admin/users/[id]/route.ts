import { NextResponse } from "next/server"

// Mock user database - in a real app, this would be a database query
let users = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "customer",
    status: "active",
    permissions: ["view_account", "transfer_funds", "deposit", "withdraw"],
    createdAt: "2024-11-15T10:30:00Z",
    lastLogin: "2025-03-22T08:45:00Z",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "customer",
    status: "active",
    permissions: ["view_account", "transfer_funds", "deposit", "withdraw"],
    createdAt: "2024-12-05T14:20:00Z",
    lastLogin: "2025-03-21T16:30:00Z",
  },
  // ... other users
]

// GET - Retrieve a specific user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const user = users.find((u) => u.id === userId)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update a user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const userData = await request.json()

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if email is being changed and already exists
    if (userData.email !== users[userIndex].email && users.some((u) => u.email === userData.email)) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Update user
    const updatedUser = {
      ...users[userIndex],
      name: userData.name || users[userIndex].name,
      email: userData.email || users[userIndex].email,
      role: userData.role || users[userIndex].role,
      status: userData.status || users[userIndex].status,
      permissions: userData.permissions || users[userIndex].permissions,
    }

    users[userIndex] = updatedUser

    return NextResponse.json({ user: updatedUser }, { status: 200 })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove user
    const deletedUser = users[userIndex]
    users = users.filter((u) => u.id !== userId)

    return NextResponse.json(
      {
        message: "User deleted successfully",
        user: deletedUser,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PATCH - Update user status (lock/unlock)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const { status } = await request.json()

    // Find user index
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user status
    users[userIndex] = {
      ...users[userIndex],
      status,
    }

    return NextResponse.json(
      {
        message: `User ${status === "locked" ? "locked" : "unlocked"} successfully`,
        user: users[userIndex],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error updating user status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

