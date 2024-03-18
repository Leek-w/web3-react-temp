import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import postcssPluginPx2rem from "postcss-plugin-px2rem"
import autoprefixer from "autoprefixer"
import { join } from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"
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
  plugins: [
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
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
