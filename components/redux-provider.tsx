"use client"

import React, { useEffect } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/lib/redux/store"
import { setAuth, setDemoAuth } from "@/lib/redux/slices/authSlice"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"

function AuthListener({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Resolve the current session once on mount, then keep it in sync.
      // Nothing dispatches setAuth before this resolves, so consumers that
      // gate on `loading` never see a false "logged out" flash.
      supabase.auth.getSession().then(({ data: { session } }) => {
        store.dispatch(setAuth({ user: session?.user ?? null, session }))
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        store.dispatch(setAuth({ user: session?.user ?? null, session }))
      })

      return () => {
        subscription.unsubscribe()
      }
    } else {
      // Local demo mode fallback when no Supabase env is configured.
      const isLocalAuth = typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true"
      store.dispatch(setDemoAuth(isLocalAuth))
    }
  }, [])

  return <>{children}</>
}

export function AppReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <AuthListener>{children}</AuthListener>
    </ReduxProvider>
  )
}
