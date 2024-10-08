import { Button } from "@nextui-org/react"
import styles from "./header.module.scss"
import useTheme from "@/hooks/useTheme"

export default function Header() {
  const { mode, handleToggleTheme } = useTheme()
  return (
    <>
      <Button onClick={handleToggleTheme}>
        {mode === "light" ? "Dark" : "Light"}
      </Button>
      <div className={styles.test}>test</div>
      <w3m-button />
    </>
  )
}
