import styles from "./layout.module.scss"
import { Outlet } from "react-router"
import { Button } from "@nextui-org/react"
export default function Layout() {
  return (
    <>
      <div className={styles.layout_container}>
        <Outlet />
        <div className={styles.test}>test</div>
        <Button>test button</Button>
      </div>
    </>
  )
}
