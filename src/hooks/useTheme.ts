import { useThemeContext } from "@/provider/ThemeProvider"
import { useCallback, useContext } from "react"
import { AppContext } from "@/App"
import { crop, toCanvas } from "@/utils/canvasUtils"

export default function useTheme() {
  const { mode, toggleTheme } = useThemeContext()
  const { parentRef, targetRef } = useContext(AppContext)

  const handleToggleTheme = useCallback(
    (e: any) => {
      toCanvas(targetRef.current).then(canvas => {
        parentRef.current.appendChild(canvas)
        crop(canvas, e, { reverse: mode === "dark" }).then(canvas => {
          parentRef?.current && parentRef?.current?.removeChild(canvas)
        })
        toggleTheme()
      })
    },
    [mode, parentRef, targetRef, toggleTheme],
  )
  return {
    handleToggleTheme,
    mode,
  }
}
