import { ReactNode, useLayoutEffect } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"

import MyLayout from "@/layout/index"

import { AnimatePresence, motion } from "framer-motion"

const RouterWrapper = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
const AutoScrollTop = ({ children }: { children: any }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}
const AnimateDiv = ({
  children,
  targetKey,
}: {
  children: JSX.Element
  targetKey: string
}) => {
  return (
    <motion.div
      className={"animate_layout_wrap"}
      key={targetKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

const MyRoute = () => {
  return (
    <RouterWrapper>
      <AutoScrollTop>
        <AnimatePresence mode={"wait"}>
          <Routes>
            <Route path="/" element={<MyLayout />}></Route>
          </Routes>
        </AnimatePresence>
      </AutoScrollTop>
    </RouterWrapper>
  )
}

export default MyRoute
