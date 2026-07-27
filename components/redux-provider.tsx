"use client"

import React, { useEffect } from "react"
import { Provider } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/lib/redux/store"
import { setAuth } from "@/lib/redux/slices/authSlice"
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client"

function AuthListener({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        store.dispatch(setAuth({ user: session?.user ?? null, session }))
      })

      // Subscribe to auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        store.dispatch(setAuth({ user: session?.user ?? null, session }))
      })

      return () => {
        subscription.unsubscribe()
      }
    } else {
      const isLocalAuth = localStorage.getItem("admin_authenticated") === "true"
      store.dispatch(setAuth({ user: null, session: null }))
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
