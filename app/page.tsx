import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Shield,
  Users,
  CreditCard,
  BarChart3,
  ArrowLeftRight,
  Banknote,
  Calculator,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="Banking background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Modern Banking for the Digital Age
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  A complete solution for managing customer accounts, transactions, and banking operations with security
                  and ease.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/register">
                  <Button size="lg" className="text-base px-8 py-6">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="text-base px-8 py-6">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Banking Features</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Everything you need to manage your finances in one place
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Users className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Account Management</h3>
                  <p className="text-muted-foreground">
                    Create, update, and manage customer accounts with ease. Securely store customer information and
                    handle account lifecycle operations.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <CreditCard className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Transaction Processing</h3>
                  <p className="text-muted-foreground">
                    Handle deposits, withdrawals, and transfers securely. Process financial transactions with real-time
                    updates and comprehensive history.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <BarChart3 className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Financial Analytics</h3>
                  <p className="text-muted-foreground">
                    Track account balances and interest calculations. Monitor financial metrics and generate reports for
                    better decision making.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <ArrowLeftRight className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fund Transfers</h3>
                  <p className="text-muted-foreground">
                    Easily move funds between accounts with instant processing and transaction verification for seamless
                    money management.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Banknote className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deposits & Withdrawals</h3>
                  <p className="text-muted-foreground">
                    Process deposits and withdrawals with proper validation and real-time balance updates for accurate
                    account management.
                  </p>
                </CardContent>
              </Card>
              <Card className="card-hover border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Calculator className="feature-icon" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interest Calculation</h3>
                  <p className="text-muted-foreground">
                    Calculate and apply interest to accounts based on configurable rates and account types for optimal
                    returns.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Why Choose Our Banking System</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Secure & Reliable</h3>
                      <p className="text-muted-foreground">
                        Bank-grade security with advanced encryption and authentication protocols.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">User-Friendly Interface</h3>
                      <p className="text-muted-foreground">
                        Intuitive design that makes banking operations simple and efficient.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Comprehensive Reporting</h3>
                      <p className="text-muted-foreground">
                        Detailed insights into financial activities with customizable reports.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Scalable Solution</h3>
                      <p className="text-muted-foreground">
                        Grows with your needs, from individual accounts to enterprise-level banking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-primary/5 -z-10"></div>
                <div className="grid gap-4 grid-cols-2">
                  <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src="https://images.unsplash.com/photo-1551260627-fd1b6daa6224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        alt="Dashboard view"
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src="https://images.unsplash.com/photo-1565514020179-026b92b2d70b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        alt="Transaction view"
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        alt="Account management"
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                        alt="Reports view"
                        className="w-full h-auto object-cover aspect-video"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
              alt="Banking background"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to transform your banking experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our banking system today and experience secure, efficient account management.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/register">
                  <Button size="lg" className="text-base px-8 py-6 group">
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="text-base px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/personal" className="text-muted-foreground hover:text-foreground">
                    Personal Banking
                  </Link>
                </li>
                <li>
                  <Link href="/services/business" className="text-muted-foreground hover:text-foreground">
                    Business Banking
                  </Link>
                </li>
                <li>
                  <Link href="/services/loans" className="text-muted-foreground hover:text-foreground">
                    Loans
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/resources/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/resources/security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/resources/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">Banks' Account Management System</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Banks' Account Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

