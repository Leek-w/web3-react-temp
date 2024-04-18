import { Button } from "@nextui-org/react"
import { useThemeContext } from "@/provider/ThemeProvider"
import styles from "./header.module.scss"
import { useCallback, useContext } from "react"
import { crop, toCanvas } from "@/utils/canvasUtils"
import { AppContext } from "@/App"

export default function Header() {
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

  return (
    <>
      <Button onClick={handleToggleTheme}>
        {mode === "light" ? "Dark" : "Light"}
      </Button>
      <div className={styles.test}>test</div>
    </>
  )
}
