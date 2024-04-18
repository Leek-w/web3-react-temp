import { createContext, useContext, useEffect, useMemo, useState } from "react"

export enum THEMES {
  light = "light",
  dark = "dark",
}
export type ThemeContextValue = {
  theme: THEMES
  toggleTheme: () => void
  mode: string
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.light,
  toggleTheme: () => null,
  mode: "light",
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = (props: any) => {
  const [mode, setMode] = useState("light")

  const theme = useMemo(() => {
    return mode === "light" ? THEMES.light : THEMES.dark
  }, [mode])

  const toggleTheme = () => {
    setMode(mode === "light" ? "dark" : "light")
  }
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      mode === "dark" ? "dark" : "",
    )
  }, [mode])

  return (
    <ThemeContext.Provider {...props} value={{ theme, toggleTheme, mode }} />
  )
}
