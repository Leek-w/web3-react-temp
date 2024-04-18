import styles from "./layout.module.scss"
import { Outlet } from "react-router"
import Header from "@/components/Header"
export default function Layout() {
  return (
    <>
      <div className={styles.layout_container}>
        <Header></Header>
        <Outlet />
      </div>
    </>
  )
}
