import "@rainbow-me/rainbowkit/styles.css"
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { merlin } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"
import {
  metaMaskWallet,
  okxWallet,
  bitgetWallet,
} from "@rainbow-me/rainbowkit/wallets"

export const SCAN_URL: Record<number, string> = {
  1: "",
}
export const WAGMI_CONFIG = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [merlin],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, okxWallet, bitgetWallet],
    },
  ],
})

export default function WalletProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({ accentColor: "#7522F2" })}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
