import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, Session } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  // True until the very first auth check (Supabase session fetch, or the
  // localStorage demo-mode check) has completed. Consumers MUST wait for
  // this to become false before deciding to redirect - otherwise a valid
  // session can be missed on first paint and the user gets bounced to
  // /admin/login even though they're signed in.
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Used when Supabase is configured: session is the source of truth.
    setAuth: (state, action: PayloadAction<{ user: User | null; session: Session | null }>) => {
      state.user = action.payload.user
      state.session = action.payload.session
      state.isAuthenticated = Boolean(action.payload.session)
      state.loading = false
    },
    // Used only in local demo mode (no Supabase env configured).
    setDemoAuth: (state, action: PayloadAction<boolean>) => {
      state.user = null
      state.session = null
      state.isAuthenticated = action.payload
      state.loading = false
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("admin_authenticated", "true")
        } else {
          localStorage.removeItem("admin_authenticated")
        }
      }
    },
    clearAuth: (state) => {
      state.user = null
      state.session = null
      state.isAuthenticated = false
      state.loading = false
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_authenticated")
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setAuth, setDemoAuth, clearAuth, setLoading } = authSlice.actions
export default authSlice.reducer
