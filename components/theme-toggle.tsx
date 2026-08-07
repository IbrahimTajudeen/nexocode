"use client"

import { useTheme, NeonColor } from "@/components/theme-provider"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { neonColor, mode, setNeonColor, toggleMode } = useTheme()

  const colors: { id: NeonColor; label: string; bgClass: string; borderClass: string }[] = [
    {
      id: "blue",
      label: "Ocean Blue",
      bgClass: "bg-sky-500",
      borderClass: "border-sky-400",
    },
    {
      id: "green",
      label: "Emerald Teal",
      bgClass: "bg-emerald-500",
      borderClass: "border-emerald-400",
    },
    {
      id: "red",
      label: "Crimson Slate",
      bgClass: "bg-rose-500",
      borderClass: "border-rose-400",
    },
  ]

  return (
    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md border border-border/80 p-1.5 rounded-full shadow-sm">
      {/* Light / Dark Mode Toggle Button */}
      <button
        onClick={toggleMode}
        className="p-1.5 rounded-full text-foreground hover:bg-muted transition-all duration-200"
        title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
        aria-label="Toggle Theme Mode"
      >
        {mode === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </button>

      <div className="h-3.5 w-[1px] bg-border/80" />

      {/* Color Palette Selector */}
      <div className="flex items-center gap-1.5 px-0.5">
        {colors.map((c) => {
          const isActive = neonColor === c.id
          return (
            <button
              key={c.id}
              onClick={() => setNeonColor(c.id)}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${c.bgClass} ${
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
