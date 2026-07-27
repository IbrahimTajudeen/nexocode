"use client"

import { useTheme, NeonColor } from "@/components/theme-provider"
import { Sun, Moon, Palette } from "lucide-react"
import { useState } from "react"

export default function ThemeToggle() {
  const { neonColor, mode, setNeonColor, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const colors: { id: NeonColor; label: string; bgClass: string; borderClass: string }[] = [
    {
      id: "blue",
      label: "Neon Blue",
      bgClass: "bg-cyan-500 shadow-[0_0_10px_#06b6d4]",
      borderClass: "border-cyan-400",
    },
    {
      id: "green",
      label: "Neon Green",
      bgClass: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
      borderClass: "border-emerald-400",
    },
    {
      id: "red",
      label: "Neon Red",
      bgClass: "bg-rose-500 shadow-[0_0_10px_#f43f5e]",
      borderClass: "border-rose-400",
    },
  ]

  return (
    <div className="flex items-center gap-2 bg-background/60 backdrop-blur-md border border-border/80 p-1.5 rounded-full shadow-lg">
      {/* Light / Dark Mode Toggle Button */}
      <button
        onClick={toggleMode}
        className="p-2 rounded-full text-foreground hover:bg-muted/80 transition-all duration-300 relative group"
        title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
        aria-label="Toggle Theme Mode"
      >
        {mode === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        )}
      </button>

      <div className="h-4 w-[1px] bg-border" />

      {/* Neon Color Palette Selector */}
      <div className="flex items-center gap-1.5">
        {colors.map((c) => {
          const isActive = neonColor === c.id
          return (
            <button
              key={c.id}
              onClick={() => setNeonColor(c.id)}
              className={`w-5 h-5 rounded-full transition-all duration-300 ${c.bgClass} ${
                isActive
                  ? `ring-2 ring-offset-2 ring-offset-background ${c.borderClass} scale-110`
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              title={c.label}
              aria-label={c.label}
            />
          )
        })}
      </div>
    </div>
  )
}
