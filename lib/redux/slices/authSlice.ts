import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, Session } from "@supabase/supabase-js"

interface AuthState {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: typeof window !== "undefined" ? localStorage.getItem("admin_authenticated") === "true" : false,
  loading: true,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User | null; session: Session | null }>) => {
      state.user = action.payload.user
      state.session = action.payload.session
      state.isAuthenticated = Boolean(action.payload.session || (typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true"))
      state.loading = false
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

export const { setAuth, clearAuth, setLoading } = authSlice.actions
export default authSlice.reducer
