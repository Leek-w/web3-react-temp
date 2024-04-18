import "./App.css"
import { useAppDispatch } from "./store/hooks"
import { setIsPC } from "./store/slice/app"
import { createContext, useEffect, useRef } from "react"
import { ToastContainer } from "react-toastify"
import MyRoute from "@/route"
import "react-toastify/dist/ReactToastify.css"
import { useThemeContext } from "@/provider/ThemeProvider"

type AppContextValue = {
  parentRef: any
  targetRef: any
}
export const AppContext = createContext<AppContextValue>({
  parentRef: null,
  targetRef: null,
})
const App = () => {
  const { mode } = useThemeContext()
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
        <AppContext.Provider value={{ parentRef, targetRef }}>
          <MyRoute />
          <ToastContainer theme={"dark"} autoClose={3000}></ToastContainer>
        </AppContext.Provider>
      </div>
    </div>
  )
}

export default App
