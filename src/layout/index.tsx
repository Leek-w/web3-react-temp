import styles from "./layout.module.scss"
import { Outlet } from "react-router"
export default function Layout() {
  return (
    <>
      <div className={styles.layout_container}>
        <Outlet />
        <div className={styles.test}>test</div>
      </div>
    </>
  )
}
