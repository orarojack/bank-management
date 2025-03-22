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
    const { email, password } = await request.json()

    // Find user by email
    const user = users.find((u) => u.email === email)

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would generate a JWT token here
    // For simplicity, we'll just return the user object (minus the password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

