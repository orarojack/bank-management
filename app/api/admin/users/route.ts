import { NextResponse } from "next/server"

// Mock user database - in a real app, this would be a database query
const users = [
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

// GET - Retrieve all users
export async function GET(request: Request) {
  try {
    // In a real app, you would add pagination, filtering, etc.
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create a new user
export async function POST(request: Request) {
  try {
    const userData = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if email already exists
    if (users.some((user) => user.email === userData.email)) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `user${users.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status || "active",
      permissions: userData.permissions || [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    }

    // Add to mock database
    users.push(newUser)

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

