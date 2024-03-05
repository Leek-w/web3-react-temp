import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import postcssPluginPx2rem from "postcss-plugin-px2rem"
import autoprefixer from "autoprefixer"
import { join } from "path"
const postcssConfig = {
  rootValue: 37.5,
  unitPrecwision: 5,
  propList: ["*"],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0,
  exclude: /node_modules/i,
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    open: true,
  },
  css: {
    postcss: {
      plugins: [postcssPluginPx2rem(postcssConfig), autoprefixer()],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
