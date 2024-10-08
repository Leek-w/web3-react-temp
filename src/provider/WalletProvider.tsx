import "@rainbow-me/rainbowkit/styles.css"
import { WagmiProvider } from "wagmi"
import { mainnet } from "@reown/appkit/networks"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { createAppKit } from "@reown/appkit"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"

export const SCAN_URL: Record<number, string> = {
  1: "",
}

const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
}

const projectId = "8de5a8f4d65f36d28b3e25fb7129fbda"

const networks = [mainnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    swaps: false,
  },
})

export const WAGMI_CONFIG = wagmiAdapter.wagmiConfig

export default function WalletProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
