"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Check } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userType, setUserType] = useState<"creator" | "sponsor" | null>(null)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      return
    }

    if (!agreeToTerms) {
      alert("Anda harus menyetujui syarat dan ketentuan!")
      return
    }

    setLoading(true)

    // Simulate registration
    setTimeout(() => {
      // Mock signup - redirect based on user type
      if (userType === "creator") {
        router.push("/creator")
      } else if (userType === "sponsor") {
        router.push("/sponsor")
      } else {
        router.push("/marketplace")
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white text-sm md:text-base group-hover:scale-110 transition-transform">
                B
              </div>
              <span className="font-bold text-lg md:text-xl text-foreground hidden sm:inline">Bersua</span>
            </Link>
            <Link href="/">
              <Button variant="outline">Kembali ke Home</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Daftar ke Bersua</h1>
              <p className="text-muted-foreground">Mulai perjalanan budaya digital Anda hari ini</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-2">
                <Label>Saya ingin bergabung sebagai:</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("creator")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      userType === "creator"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="font-semibold text-sm">Kreator</div>
                    <div className="text-xs mt-1 opacity-80">Unggah & jual aset</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("sponsor")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      userType === "sponsor"
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="text-2xl mb-1">💼</div>
                    <div className="font-semibold text-sm">Sponsor</div>
                    <div className="text-xs mt-1 opacity-80">Danai proyek</div>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-border rounded peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                    {agreeToTerms && <Check size={14} className="text-white" />}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  Saya menyetujui{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={loading || !userType}>
                {loading ? "Mendaftar..." : "Daftar Sekarang"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Atau daftar dengan</span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-3">
                <Button type="button" variant="outline" className="bg-transparent">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button type="button" variant="outline" className="bg-transparent">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Sudah punya akun? </span>
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Masuk di sini
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-center text-muted-foreground">Keuntungan bergabung:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Check size={18} className="text-primary flex-shrink-0" />
                <span className="text-xs font-medium">Gasless NFT Minting</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <Check size={18} className="text-secondary-foreground flex-shrink-0" />
                <span className="text-xs font-medium">Royalti Otomatis</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Check size={18} className="text-accent flex-shrink-0" />
                <span className="text-xs font-medium">Zero Copyright Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
