import { NextResponse } from "next/server"

// Mock user database - in a real app, this would be a database query
const users = [
  {
    id: "user1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin",
  },
]

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: `user${users.length + 1}`,
      name,
      email,
      password, // In a real app, this would be hashed
      role: "user", // Default role for new registrations
    }

    // Add to mock database (in a real app, this would be a database insert)
    users.push(newUser)

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

