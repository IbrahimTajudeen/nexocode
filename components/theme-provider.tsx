"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type NeonColor = "red" | "green" | "blue"
export type ThemeMode = "light" | "dark"

interface ThemeContextType {
  neonColor: NeonColor
  mode: ThemeMode
  setNeonColor: (color: NeonColor) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [neonColor, setNeonColorState] = useState<NeonColor>("blue")
  const [mode, setModeState] = useState<ThemeMode>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedColor = (localStorage.getItem("neon-color") as NeonColor) || "blue"
    const savedMode = (localStorage.getItem("theme-mode") as ThemeMode) || "dark"
    setNeonColorState(savedColor)
    setModeState(savedMode)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement

    // Manage color themes
    root.classList.remove("theme-red", "theme-green", "theme-blue")
    root.classList.add(`theme-${neonColor}`)
    localStorage.setItem("neon-color", neonColor)

    // Manage light/dark mode
    if (mode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme-mode", mode)
  }, [neonColor, mode, mounted])

  const setNeonColor = (color: NeonColor) => {
    setNeonColorState(color)
  }

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode)
  }

  const toggleMode = () => {
    setModeState((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ neonColor, mode, setNeonColor, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
