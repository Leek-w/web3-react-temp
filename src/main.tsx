import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { persistor, store } from "./store/store"
import "./index.css"
import "./styles/theme.css"
import WalletProvider from "./provider/WalletProvider"
import "virtual:svg-icons-register"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { PersistGate } from "redux-persist/integration/react"
import { ThemeProvider } from "@/provider/ThemeProvider"
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WalletProvider>
          <ThemeProvider>
            <NextUIProvider>
              <NextThemesProvider attribute="class" defaultTheme="dark">
                <App />
              </NextThemesProvider>
            </NextUIProvider>
          </ThemeProvider>
        </WalletProvider>
      </PersistGate>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
