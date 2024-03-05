import "./App.css"
import { useAppDispatch } from "./store/hooks"
import { setIsPC } from "./store/slice/app"
import { useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@mui/material"

const App = () => {
  const dispatch = useAppDispatch()
  function resize() {
    document.getElementsByTagName("html")[0].style.fontSize =
      window.innerWidth > 500 ? "37.5px" : window.innerWidth / 10 + "px"
    window.innerWidth > 500 ? dispatch(setIsPC(true)) : dispatch(setIsPC(false))
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [window.innerWidth])

  return (
    <div className="App">
      <ConnectButton></ConnectButton>
      <Button variant="text">Text</Button>
    </div>
  )
}

export default App
