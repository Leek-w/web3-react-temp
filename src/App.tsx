import "./App.css"
import { useAppDispatch } from "./store/hooks"
import { setIsPC } from "./store/slice/app"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import MyRoute from "@/route"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  const dispatch = useAppDispatch()
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  }
  function resize() {
    window.innerWidth > 500 && !isMobileDevice()
      ? dispatch(setIsPC(true))
      : dispatch(setIsPC(false))
  }
  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [window.innerWidth])

  return (
    <div className="App">
      <MyRoute />
      <ToastContainer theme={"dark"} autoClose={3000}></ToastContainer>
    </div>
  )
}

export default App
