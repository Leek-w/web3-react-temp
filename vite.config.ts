import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import postcsspxtoviewport8plugin from "postcss-px-to-viewport-8-plugin"
import autoprefixer from "autoprefixer"
import { join } from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"

const postcssConfig = {
  unitToConvert: "px", // 要转化的单位
  viewportWidth: 375, // UI设计稿的宽度
  unitPrecision: 6, // 转换后的精度，即小数点位数
  propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
  fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
  selectorBlackList: [], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  exclude: [/node_modules/],
  landscape: false, // 是否处理横屏情况
}
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
      plugins: [
        postcsspxtoviewport8plugin(postcssConfig),
        autoprefixer(),
        tailwindcss,
      ],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
