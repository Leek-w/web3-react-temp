import "./App.css"
import { useAppDispatch } from "./store/hooks"
import { setIsPC } from "./store/slice/app"
import { useEffect, useRef } from "react"
import { ToastContainer } from "react-toastify"
import MyRoute from "@/route"
import "react-toastify/dist/ReactToastify.css"
import { useThemeContext } from "@/provider/ThemeProvider"
import { Button } from "@nextui-org/react"
import { crop, toCanvas } from "@/utils/canvasUtils"
const App = () => {
  const { toggleTheme, mode } = useThemeContext()
  const parentRef = useRef<any>()
  const targetRef = useRef<any>()
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

  const handleToggleTheme = (e: any) => {
    toCanvas(targetRef.current).then(canvas => {
      parentRef.current.appendChild(canvas)
      crop(canvas, e, { reverse: mode === "dark" }).then(canvas => {
        //绘制结束后删除canvas
        parentRef?.current && parentRef?.current?.removeChild(canvas)
      })
      toggleTheme()
    })
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [window.innerWidth])

  const themeStyle =
    mode === "light"
      ? { backgroundColor: "#fff", color: "#333" }
      : { backgroundColor: "#333", color: "#fff" }

  return (
    <div ref={parentRef} className="App">
      <div ref={targetRef} style={{ height: "100vh", ...themeStyle }}>
        <Button onClick={handleToggleTheme}>
          {mode === "dark" ? "Light" : "Dark"}
        </Button>
      </div>

      <MyRoute />
      <ToastContainer theme={"dark"} autoClose={3000}></ToastContainer>
    </div>
  )
}

export default App
