import "./App.css"
import { useAppDispatch } from "./store/hooks"
import { setIsPC } from "./store/slice/app"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import MyRoute from "@/route"

const App = () => {
  const dispatch = useAppDispatch()
  function resize() {
    window.innerWidth > 500 ? dispatch(setIsPC(true)) : dispatch(setIsPC(false))
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
