"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { setAuth, setDemoAuth } from "@/lib/redux/slices/authSlice"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { ShieldCheck, Key, Mail, Lock, ArrowLeft, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

export default function AdminLoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const authLoading = useSelector((state: RootState) => state.auth.loading)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    // Wait for the initial session check to finish - otherwise this fires
    // on the default `isAuthenticated: false` state before Supabase has
    // had a chance to report a real (logged-in) session.
    if (!authLoading && isAuthenticated) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
        setLoading(false)
        return
      }
      dispatch(setAuth({ user: data.user, session: data.session }))
      router.push("/admin/dashboard")
    } else {
      // Local demo mode fallback (no Supabase env configured)
      if (email.trim() && password.trim()) {
        dispatch(setDemoAuth(true))
        router.push("/admin/dashboard")
      } else {
        setErrorMsg("Please enter an email and password to log in.")
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto z-10 my-auto">
        <div className="border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary/10 relative">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4 text-primary shadow-lg shadow-primary/20">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black tracking-tight mb-1">
              Admin <span className="gradient-text">Portal</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Sign in with your Supabase credentials to manage site content & settings
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="admin@nexocode.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/80 bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-muted-foreground mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/80 bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
            >
              <Key className="w-4 h-4" />
              {loading ? "Authenticating..." : "Sign In to Admin Dashboard"}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground font-mono z-10">
        NEXOCODE Admin System • Connected to Supabase
      </div>
    </div>
  )
}
